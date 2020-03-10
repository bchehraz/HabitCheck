import {
  navigate,
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
  xEffectItemLengthIs,
  xEffectItemDoAction,
} from "./helperFunctions"

describe("app works", () => {
  let currentDate = new Date("12/21/2019")
  let today
  const testHabit1 = "Test Habit 1"
  const testHabit2 = "Test Habit 2"
  const testHabit3 = "Test Habit 3"
  const habits = {
    test1: { title: testHabit1, progress: [] },
    test2: { title: testHabit2, progress: [] },
    test3: { title: testHabit3, progress: [] },
  }

  const updateStreak = (habit, value) => {
    let currentStreak = habit.progress[habit.progress.length - 1]
    habit.progress[habit.progress.length - 1] = currentStreak + value
  }

  const addNewStreak = (habit = Object, positive = Boolean) => {
    habit.progress = [...habit.progress, (positive && 1) || -1]
  }

  const getCurrentStreak = habit => {
    let currentStreak = habit.progress[habit.progress.length - 1]
    if (currentStreak < 0) currentStreak = 0
    return currentStreak
  }

  const getBestStreak = habit => {
    return Math.max.apply(null, habit.progress)
  }

  beforeEach(() => {
    today = currentDate.getDate()
    cy.clock(
      Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), today + 1),
      ["Date"]
    )
    cy.restoreLocalStorage()
  })

  //Test 1
  it("Setting Up Exhaustive Test", () => {
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

    // Check for the "new" status
    listItemIsNew(testHabit1)
    listItemIsNew(testHabit2)
    listItemIsNew(testHabit3)

    listItemDoAction(testHabit1)
    listItemDoAction(testHabit1)
    listItemDoAction(testHabit1)

    listItemDoAction(testHabit2)

    // Check for "new" status to be gone
    listItemIsNotNew(testHabit1)
    listItemIsNotNew(testHabit2)

    // Navigate to HabitStats page via footer nav
    navigate("habitStats")

    //Select the new habit from the dropdown menu
    cy.get("select[name=habits]").select(testHabit1)

    // Check the number of calendarRows
    calendarRowLengthIs(6)

    // Check the number of elements inside the calendarRows
    calendarItemLengthIs(35)

    // Check to verify there is day values from 1-31 for current month
    calendarHasDayValues(31)

    // Verify there's no previous or next pages since it's a newly added habit
    hasPageButtons(false, false)

    // Check current streak and best streak value to be matching at 1 and if you uncheck on the calendar view, it should go back down to 0
    hasCurrentStreak(1)
    hasBestStreak(1)

    // Calendar item status should be 2 (checked state)
    calendarItemStatusShouldBe(today, 2)

    // Now uncheck the habit
    calendarItemDoAction(today)

    // check for best streak: 0, current streak: 0
    hasCurrentStreak(0)
    hasBestStreak(0)

    // Calendar item class should be 3 (unchecked but still checkable)
    calendarItemStatusShouldBe(today, 3)

    // Check off the habit again on the current calendar day
    calendarItemDoAction(today)

    // check for best streak: 1, current streak: 1
    hasCurrentStreak(1)
    hasBestStreak(1)

    // Again, check calendar item status to be 2 (checked state)
    calendarItemStatusShouldBe(today, 2)

    //to XEffect View
    toggleStatView()

    // Basic test, see single habit to reflect streak
    xEffectItemsReflectStreak(testHabit1, [1], true)

    // Use XEffect Action to check and uncheck
    xEffectItemDoAction()
    xEffectItemDoAction()

    //Not a test, update habits data for easier testing
    addNewStreak(habits.test1, true)
    addNewStreak(habits.test2, true)

    currentDate.setDate(today + 1)
  })

  //Test 2
  it("Should check off testHabit1 to streak 2", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)

    //toggle back to Calendar View
    toggleStatView()

    // Again the calendar page buttons should not exist at this point
    //calendar.checkPageButtons(false, false);
    hasPageButtons(false, false)

    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)

    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    calendarItemDoAction(today)
    updateStreak(habits.test1, -1)

    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    navigate("today")

    listItemIsNotNew(testHabit1)

    listItemDoAction(testHabit1)
    updateStreak(habits.test1, 1)

    // Check list item to have a streak of 2
    listItemHasStreak(testHabit1, getCurrentStreak(habits.test1))

    addNewStreak(habits.test2, false)

    currentDate.setDate(today + 1)
  })

  //Test 3
  //(Prior) TestHabit1 Streak: 1
  it("Should check off testHabit1 to streak 3", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)

    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)

    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    calendarItemDoAction(today)
    updateStreak(habits.test1, -1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //Test 4
  //(Prior) TestHabit1 Streak: 3
  it("Should check off testHabit1 to streak 4", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 4
  it("Should check off testHabit1 to streak 5", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 5
  it("Should check off testHabit1 to streak 6", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 6
  it("Should check off testHabit1 to streak 7", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)

    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    calendarItemDoAction(today)
    updateStreak(habits.test1, -1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 7
  it("Should check off testHabit1 to streak 8", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 8
  it("Should check off testHabit1 to streak 9", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 9
  it("Should check off testHabit1 to streak 10", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 10
  it("Should check off testHabit1 to streak 11", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 11
  it("Should check off testHabit1 to streak 12", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 12
  it("Should check off testHabit1 to streak 13", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak: 13
  it("Should check off testHabit1 to streak 14", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)
    calendarItemDoAction(today)
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    updateStreak(habits.test2, -1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak Progress: [14], Streak: 14
  // TestHabit2 Streak Progress: [1, -13], Streak: 0
  it("should check off on this day", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)

    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    cy.get("select[name=habits]").select(testHabit2)
    hasCurrentStreak(getCurrentStreak(habits.test2))
    hasBestStreak(getBestStreak(habits.test2))
    calendarItemDoAction(today)
    // go from negative to positive streak on testHabit2
    addNewStreak(habits.test2, true)
    hasCurrentStreak(getCurrentStreak(habits.test2))
    hasBestStreak(getBestStreak(habits.test2))

    calendarItemsReflectStreak(
      testHabit2,
      currentDate,
      habits.test2.progress,
      true
    )
    calendarItemsReflectStreak(
      testHabit1,
      currentDate,
      habits.test1.progress,
      false
    )

    toggleStatView() //to x effect view

    xEffectItemLengthIs(25)
    hasPageButtons(false, false)
    xEffectItemsReflectStreak(testHabit1, habits.test1.progress, false)
    xEffectItemDoAction()
    updateStreak(habits.test1, 1)

    currentDate.setDate(today + 1)
  })

  //(Prior) TestHabit1 Streak Progress: [15], Streak: 15
  // TestHabit2 Streak Progress: [1, -13], Streak: 0
  it("should check off on this day", () => {
    cy.visit("/app/stats")
    cy.get("select[name=habits]").select(testHabit1)

    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))
    xEffectItemDoAction()
    updateStreak(habits.test1, 1)
    hasCurrentStreak(getCurrentStreak(habits.test1))
    hasBestStreak(getBestStreak(habits.test1))

    toggleStatView() // back to calendar view
    cy.get("select[name=habits]").select(testHabit2)
    hasCurrentStreak(getCurrentStreak(habits.test2))
    hasBestStreak(getBestStreak(habits.test2))

    calendarItemDoAction(today)
    updateStreak(habits.test2, 1)
    hasCurrentStreak(getCurrentStreak(habits.test2))
    hasBestStreak(getBestStreak(habits.test2))
    /*

    // go from negative to positive streak on testHabit2
    addNewStreak(habits.test2, true)
    hasCurrentStreak(getCurrentStreak(habits.test2))
    hasBestStreak(getBestStreak(habits.test2))

    calendarItemsReflectStreak(testHabit2, currentDate, habits.test2.progress, true)
    calendarItemsReflectStreak(testHabit1, currentDate, habits.test1.progress, false)

    toggleStatView();

    xEffectItemLengthIs(25);
    hasPageButtons(false, false);
    xEffectItemsReflectStreak(testHabit1, [14], false)
    xEffectItemDoAction()
    updateStreak(testHabit1, 1);*/

    currentDate.setDate(today + 1)
  })

  afterEach(() => {
    //set new date for next test, run custom cy command to save local storage
    cy.saveLocalStorage()
  })
})

// Next thing maybe make a day go by and check streak if on the previous day it was checked
// then check again for best/current streak for the changing values
// then maybe miss a couple of days and see what happens, then actually check it off for like 7 days straight. This is to simulate real world scenario

// TODO- Calendar
// - Check current day when checked,
// - - When unchecked
// - Try to check and uncheck from CalendarView itself
// - - Verify it actually is changing upon clicking
// - Check for streak after a day
// - Check for negative streak when missing days
// Potentially check with other months, not just December
// Check for prev and next page buttons on longer streaks

// TODO- XEFfect
// Same thing, except check for longer streaks that go into multiple XEffect Cards
// Check for next or prev page with longer streaks
