export const navigate = page => {
  if (page === "habitStats") {
    cy.get(".footer")
      .get(".habitStats")
      .click()
  } else if (page === "today") {
    cy.get(".footer")
      .get(".today")
      .click()
  }
}

export const listItemIsNew = habitTitle => {
  cy.findByText(habitTitle)
    .parent()
    .children(".habitListItemStatus")
    .contains("NEW")

  cy.findByText(habitTitle)
    .parent()
    .children(".habitListItemStatus")
    .children()
    .should("have.length", 2)
}

export const listItemIsNotNew = habitTitle => {
  cy.findByText(habitTitle)
    .parent()
    .children(".habitListItemStatus")
    .contains("NEW")
    .should("not.be.visible")

  cy.findByText(habitTitle)
    .parent()
    .children(".habitListItemStatus")
    .children()
    .should("have.length", 1)
}

export const listItemHasStreak = (habitTitle, streak) => {
  cy.findByText(habitTitle)
    .parent()
    .children(".habitListItemStatus")
    .contains(streak)
    .should("be.visible")

  cy.findByText(habitTitle)
    .parent()
    .children(".habitListItemStatus")
    .children()
    .should("have.length", 2)
}

export const hasCurrentStreak = streak => {
  cy.findByText("Current Streak")
    .parent()
    .contains(new RegExp(`^${streak}$`))
}

export const hasBestStreak = streak => {
  cy.findByText("Best Streak")
    .parent()
    .contains(new RegExp(`^${streak}$`))
}

export const calendarItemDoAction = date => {
  cy.get(".calendarRow")
    .contains(date)
    .click({ force: true })
}

export const xEffectItemDoAction = () => {
  cy.get(".xEffectRow")
    .children()
    .children(".xEffectItem")
    .each(($item, index) => {
      if ($item.hasClass("status__3")) {
        cy.get(".xEffectRow")
          .children()
          .children(".xEffectItem")
          .eq(index)
          .click({ force: true })
      } else if ($item.hasClass("status__4")) {
        cy.get(".xEffectRow")
          .children()
          .children(".xEffectItem")
          .eq(index)
          .click({ force: true })
      }
    })
}

export const listItemDoAction = habitTitle => {
  cy.findByText(habitTitle)
    .parent()
    .children(".habitListItemAction")
    .click({ force: true })
}

export const calendarItemStatusShouldBe = (date = Number, status = Number) => {
  cy.get(".calendarRow")
    .contains(date)
    .parent()
    .should("have.class", `status__${status}`)
}

export const hasPageButtons = (left = Boolean, right = Boolean) => {
  if (left && right) {
    cy.get(".btnPageLeft").should("be.visible")
    cy.get(".btnPageRight").should("be.visible")
  } else if (left) {
    cy.get(".btnPageLeft").should("be.visible")
    cy.get(".btnPageRight").should("not.be.visible")
  } else if (right) {
    cy.get(".btnPageLeft").should("not.be.visible")
    cy.get(".btnPageRight").should("be.visible")
  } else {
    cy.get(".btnPageLeft").should("not.be.visible")
    cy.get(".btnPageRight").should("not.be.visible")
  }
}

export const calendarRowLengthIs = length => {
  cy.get(".calendarData")
    .children()
    .should("have.length", length)
}

export const calendarItemLengthIs = length => {
  cy.get(".calendarRow")
    .children()
    .should("have.length", length)
}

export const calendarHasDayValues = max => {
  //cy.wait(300);
  for (let i = 0; i < max; i++) {
    cy.get(".calendarRow").contains(i + 1)
    //cy.wait(50);
  }
  cy.wait(100)
}

export const addHabit = title => {
  cy.get(".addHabitButton").click({ force: true })

  cy.get(".habitTitleInput").type(title)

  cy.findByText(/start new habit/i).click()
}

const nextPageIfMonthChanged = (date, currentMonth) => {
  if (currentMonth !== date.getMonth()) {
    cy.get(".btnPageLeft").click({ force: true })
  }
}

export const calendarItemsReflectStreak = (
  habit = Object,
  isChecked = false,
  currentDate = Date
) => {
  // cy.visit('/app/stats')
  // cy.get("select[name=habits]").select(habit.title)

  const date = new Date(currentDate)
  let currentMonth = date.getMonth()
  let streakArray = [...habit.progress]

  if (!isChecked) {
    //if current day is not checked off, skip today
    date.setDate(date.getDate() - 1)

    //if the new date happens to be a new month, go to next page
    nextPageIfMonthChanged(date, currentMonth)

    //update currentMonth
    currentMonth = date.getMonth()
  }

  //Reverse the streak array to start from the most recent streaks
  streakArray.reverse()
  streakArray.forEach(streak => {
    for (let i = 0; i < Math.abs(streak); i++) {
      //Positive streak = 2, negative = 1
      let status = streak > 0 ? 2 : 1

      //Calendar Item should reflect current status
      calendarItemStatusShouldBe(date.getDate(), status)
      date.setDate(date.getDate() - 1)
      nextPageIfMonthChanged(date, currentMonth)
      currentMonth = date.getMonth()
    }
  })

  calendarItemStatusShouldBe(date.getDate(), 0)
}

export const toggleStatView = () => {
  cy.get(".switch").click({ force: true })
}

export const xEffectItemLengthIs = length => {
  cy.get(".xEffectRow")
    .children()
    .should("have.length", length)
}

const xEffectNextPage = () => {
  cy.get(".btnPageLeft").click({ force: true })
}

export const xEffectItemsReflectStreak = (
  habit = Object,
  isChecked = Boolean
) => {
  // cy.visit('/app/stats')
  // cy.get("select[name=habits]").select(habit.title)

  // Number of elements in XEffect
  let total = (!isChecked && 1) || 0
  let pageData = []
  let streakArray = [...habit.progress]
  streakArray.forEach(streak => {
    for (let i = 0; i < Math.abs(streak); i++) {
      pageData.push((streak > 0 && 2) || 1)
    }
    total += streak
  })

  let placeholderData = new Array(25 - (pageData.length % 25)).fill(0)
  if (!isChecked) {
    placeholderData[0] = 3
  } else {
    // Account for new xEffectItem Status 4 for uncheckable.
    // If it's checked off, set the last element to a 4
    pageData[pageData.length - 1] = 4
  }
  pageData = [...pageData, ...placeholderData]

  if (pageData.length % 25 !== 0) {
    cy.log("Error occured")
    return
  }

  let numPages
  const estimate = total / 25
  numPages = Math.floor(estimate)
  if (estimate % 1 > 0 || total === 0) {
    numPages++
  }

  for (let i = numPages - 1; i >= 0; i--) {
    cy.get(".xEffectRow")
      .children()
      .children(".xEffectItem")
      .each(($item, index) => {
        expect($item).to.have.class(`status__${pageData[index + 25 * i]}`)
      })

    if (i === 0) break
    xEffectNextPage()
  }
}

// const nextXEffectPage = (date, currentMonth) => {
//   if (currentMonth !== date.getMonth()) {
//     cy.get(".btnPageLeft")
//       .click({ force: true })
//   }
// }
