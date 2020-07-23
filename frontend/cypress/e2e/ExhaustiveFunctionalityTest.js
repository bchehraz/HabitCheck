import {
  listItemIsNotNew,
  listItemIsNew,
  hasBestStreak,
  hasCurrentStreak,
  listItemHasStreak,
  listItemDoAction,
  calendarItemStatusShouldBe,
  calendarItemDoAction,
  hasPageButtons,
  calendarRowLengthIs,
  calendarItemLengthIs,
  calendarHasDayValues,
  addHabit,
  calendarItemsReflectStreak,
  toggleStatView,
  xEffectItemsReflectStreak,
  xEffectItemDoAction,
  gotoStats,
  goBackFromStats,
} from "./helperFunctions"

describe.only("Comprehensive e2e App Functionality Test", () => {
  let currentDate = new Date("12/21/2019")
  let today
  let xEffectToggled = false
  const testHabit1 = "Test Habit 1"
  const testHabit2 = "Test Habit 2"
  const testHabit3 = "Test Habit 3"
  const testHabit4 = "Test Habit 4"
  const testHabit5 = "Test Habit 5"
  const habits = {
    test1: { title: testHabit1, progress: [] },
    test2: { title: testHabit2, progress: [] },
    test3: { title: testHabit3, progress: [] },
    test4: { title: testHabit4, progress: [] },
    test5: { title: testHabit5, progress: [] },
  }

  const habitCheck = habit => {
    if (habit.progress.length === 0) {
      habit.progress.push(1)
    } else {
      const streak = habit.progress[habit.progress.length - 1]
      if (streak > 0) {
        habit.progress[habit.progress.length - 1] += 1
      } else {
        habit.progress.push(1)
      }
    }
  }

  const habitUncheck = habit => {
    if (habit.progress.length === 0) {
      // do nothing
    } else {
      const streak = habit.progress[habit.progress.length - 1]
      // if (streak === 1 || streak === -1) {
      if (streak === 1) {
        habit.progress.pop()
      } else {
        //let newStreak = (streak > 0) && (streak - 1) || (streak + 1)
        let newStreak = streak - 1
        habit.progress[habit.progress.length - 1] = newStreak
      }
    }
  }

  const habitMiss = habit => {
    const streak = habit.progress[habit.progress.length - 1]
    if (streak > 0) {
      habit.progress.push(-1)
    } else {
      habit.progress[habit.progress.length - 1] += -1
    }
  }

  const getCurrentStreak = (habit, negative = false) => {
    if (habit.progress.length === 0) return 0
    const currentStreak = habit.progress[habit.progress.length - 1]
    if (negative) return currentStreak
    else if (currentStreak < 0) return 0
    return currentStreak
  }

  const getBestStreak = habit => {
    if (habit.progress.length === 0) return 0
    return Math.max.apply(null, habit.progress)
  }

  const getRandomDayStatus = () => {
    return Math.floor(Math.random() * 2) === 1
  }

  const checkListItemStatus = (title, streak) => {
    if (streak === 0) {
      listItemIsNew(title)
    } else if (streak === 1) {
      listItemIsNotNew(title)
    } else {
      listItemHasStreak(title, streak)
    }
  }

  const habitAction = (habit, isChecked = false, miss = false) => {
    if (miss) {
      return habitMiss(habit)
    } else if (isChecked) {
      return habitUncheck(habit)
    } else {
      return habitCheck(habit)
    }
  }

  const runTests = (habit = Object, check = false, delay = false) => {
    if (delay) check = false

    let isChecked = false

    // random number to determine where the item will be checked off,
    // -- x effect, calendar, or list view
    const rand = Math.floor(Math.random() * 3) + 1
    //const rand = 1;
    cy.visit("/app")

    //check status on list item to match
    checkListItemStatus(habit.title, getCurrentStreak(habit, true))

    listItemDoAction(habit.title)
    habitAction(habit, isChecked)
    checkListItemStatus(habit.title, getCurrentStreak(habit, true))
    isChecked = true

    listItemDoAction(habit.title)
    habitAction(habit, isChecked)
    checkListItemStatus(habit.title, getCurrentStreak(habit, true))
    isChecked = false

    if (check && rand === 1) {
      listItemDoAction(habit.title)
      habitAction(habit, isChecked)
      checkListItemStatus(habit.title, getCurrentStreak(habit, true))
      isChecked = true
    }
    // *** Habit Stats Tests *** //
    gotoStats(habit.title)

    if (xEffectToggled) {
      toggleStatView()
      xEffectToggled = !xEffectToggled
    }

    // ( Calendar View Tests )
    // do actions like what i just did up there except with checking the current/best streak for the streak check
    hasCurrentStreak(getCurrentStreak(habit))
    hasBestStreak(getBestStreak(habit))

    calendarItemDoAction(today)
    habitAction(habit, isChecked)
    isChecked = !isChecked

    hasCurrentStreak(getCurrentStreak(habit))
    hasBestStreak(getBestStreak(habit))

    calendarItemDoAction(today)
    habitAction(habit, isChecked)
    isChecked = !isChecked

    hasCurrentStreak(getCurrentStreak(habit))
    hasBestStreak(getBestStreak(habit))

    if (check && rand === 2) {
      calendarItemDoAction(today)
      habitAction(habit, isChecked)
      isChecked = !isChecked

      hasCurrentStreak(getCurrentStreak(habit))
      hasBestStreak(getBestStreak(habit))
    }

    calendarItemsReflectStreak(habit, isChecked, currentDate)

    //to XEffectView
    if (!xEffectToggled) {
      toggleStatView()
      xEffectToggled = !xEffectToggled
    }

    xEffectItemDoAction()
    habitAction(habit, isChecked)
    isChecked = !isChecked
    hasCurrentStreak(getCurrentStreak(habit))
    hasBestStreak(getBestStreak(habit))

    xEffectItemDoAction()
    habitAction(habit, isChecked)
    isChecked = !isChecked
    hasCurrentStreak(getCurrentStreak(habit))
    hasBestStreak(getBestStreak(habit))

    if (check && rand === 3) {
      xEffectItemDoAction()
      habitAction(habit, isChecked)
      isChecked = !isChecked
      hasCurrentStreak(getCurrentStreak(habit))
      hasBestStreak(getBestStreak(habit))
    }

    xEffectItemsReflectStreak(
      { ...habit, progress: [...habit.progress] },
      isChecked
    )

    if (xEffectToggled) {
      toggleStatView()
      xEffectToggled = !xEffectToggled
    }

    // meant to be a missed day? Negative streak!
    if (!check) {
      habitAction(habit, false, true)
    }
  }

  before(() => {
    today = currentDate.getDate()
    cy.clock(
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        today,
        currentDate.getUTCHours()
      ),
      ["Date"]
    )

    cy.visit("/app")
      .findByText(/just click here/i)
      .click()
      .wait(300)

    // Check adding habit with no title and exit out of the form
    cy.get(".addHabitButton").click({ force: true })

    cy.findByPlaceholderText(/habit title/i)

    cy.findByText(/start new habit/i).click({ force: true })

    cy.get(".iconContainerClose").click()

    addHabit(testHabit1)
    addHabit(testHabit2)
    addHabit(testHabit3)
    addHabit(testHabit4)
    addHabit(testHabit5)

    // Check for the "new" status
    listItemIsNew(testHabit1)
    listItemIsNew(testHabit2)
    listItemIsNew(testHabit3)
    listItemIsNew(testHabit4)
    listItemIsNew(testHabit5)

    listItemDoAction(testHabit1)
    listItemDoAction(testHabit1)
    listItemDoAction(testHabit1)

    listItemDoAction(testHabit2)
    listItemDoAction(testHabit3)
    listItemDoAction(testHabit4)
    listItemDoAction(testHabit5)

    // Check for "new" status to be gone
    listItemIsNotNew(testHabit1)
    listItemIsNotNew(testHabit2)
    listItemIsNotNew(testHabit3)
    listItemIsNotNew(testHabit4)
    listItemIsNotNew(testHabit5)

    listItemDoAction(testHabit1)
    listItemDoAction(testHabit2)
    listItemDoAction(testHabit3)
    listItemDoAction(testHabit4)
    listItemDoAction(testHabit5)
    listItemIsNew(testHabit1)
    listItemIsNew(testHabit2)
    listItemIsNew(testHabit3)
    listItemIsNew(testHabit4)
    listItemIsNew(testHabit5)

    // Go to Habit's Stats
    gotoStats(testHabit1)

    // Check the number of calendarRows
    calendarRowLengthIs(6)

    // Check the number of elements inside the calendarRows
    calendarItemLengthIs(35)

    // Check to verify there is day values from 1-31 for current month
    calendarHasDayValues(31)

    // Verify there's no previous or next pages since it's a newly added habit
    hasPageButtons(false, false)

    // Check current streak and best streak value to be matching at 1 and if you uncheck on the calendar view, it should go back down to 0
    hasCurrentStreak(0)
    hasBestStreak(0)

    // Calendar item status should be 3 (today, checkable state)
    calendarItemStatusShouldBe(today, 3)

    // Now uncheck the habit
    calendarItemDoAction(today)

    // check for best streak: 1, current streak: 1
    hasCurrentStreak(1)
    hasBestStreak(1)

    // Calendar item class should be 2 (checked)
    calendarItemStatusShouldBe(today, 2)

    // Check off the habit again on the current calendar day
    calendarItemDoAction(today)

    // check for best streak: 0, current streak: 0
    hasCurrentStreak(0)
    hasBestStreak(0)

    // Again, check calendar item status to be 3 (today, checkable state)
    calendarItemStatusShouldBe(today, 3)

    //to XEffect View
    toggleStatView()
    xEffectToggled = !xEffectToggled

    // Basic test, see single habit to reflect streak
    xEffectItemsReflectStreak(habits.test1, false)

    // Use XEffect Action to check and uncheck
    xEffectItemDoAction()
    hasCurrentStreak(1)
    hasBestStreak(1)
    xEffectItemDoAction()
    hasCurrentStreak(0)
    hasBestStreak(0)

    cy.saveLocalStorage()
  })

  it("Test 0, Day 1 (Setup)", () => {
    goBackFromStats()
    listItemDoAction(testHabit1)
    habitAction(habits.test1, false)
    listItemDoAction(testHabit2)
    habitAction(habits.test2, false)
    listItemDoAction(testHabit4)
    habitAction(habits.test4, false)
    listItemDoAction(testHabit5)
    habitAction(habits.test5, false)

    currentDate.setDate(today + 1)
    cy.saveLocalStorage()
  })

  describe("Live Tests, Exhaustive", () => {
    beforeEach(() => {
      today = currentDate.getDate()
      cy.clock(
        Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          today,
          currentDate.getUTCHours()
        ),
        ["Date"]
      )
      cy.restoreLocalStorage()
    })

    for (let i = 0; i < 30; i++) {
      it(`Test ${i + 1}, Day ${i + 2}`, () => {
        cy.visit("/app")

        // Test A: Run tests with random input
        cy.log("#testA", {
          ...habits.test1,
          progress: [...habits.test1.progress],
        })

        // Test B: Run tests with random input
        runTests(habits.test1, getRandomDayStatus())
        cy.log("#testB", {
          ...habits.test2,
          progress: [...habits.test2.progress],
        })

        // Test C: Run tests for habit that NEVER gets checked off
        runTests(habits.test2, getRandomDayStatus())
        cy.log("#testC", {
          ...habits.test3,
          progress: [...habits.test3.progress],
        })
        runTests(habits.test3, false, true)

        // Test D: Run tests while *checking off every day*
        cy.log("#testD", {
          ...habits.test4,
          progress: [...habits.test4.progress],
        })
        runTests(habits.test4, true)

        // Test A: Run tests after *only checking off the first day*
        cy.log("#testE : ", {
          ...habits.test5,
          progress: [...habits.test5.progress],
        })
        runTests(habits.test5, false)
      })
    }

    afterEach(() => {
      currentDate.setDate(today + 1)
      cy.saveLocalStorage()
    })
  })
})
