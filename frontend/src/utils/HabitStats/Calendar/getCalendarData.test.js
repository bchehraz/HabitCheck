import { advanceTo, clear } from "jest-date-mock"
import { getCalendarData, daysInMonth } from "./"
import { data } from "../../static/updatedDataSet1"

// Testing funtions getCalendarData and daysInMonth

// assuming "today" is 12/5/2019 and the data is updated!
const output = {
  unchecked: [
    // "Work on HabitCheck"
    [[undefined, undefined, undefined, undefined, 3]],
    // "Quit Smoking"
    [
      [2, 2, 2, 1, 3],
      [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
      ],
      [2, 2, 2, 2, 2, 2, 2],
    ],
    // "Meditate"
    [
      [1, 1, 1, 1, 3],
      [2, 1, 1],
    ],
    // "Sleep on time"
    [[1, 1, 2, 1, 3], [2]],
  ],
  checked: [
    // "90 min Yoga"
    [[2, 2, 2, 2, 2]],
    // "Push Ups"
    [[2, 1, 1, 2, 2]],
    // "30 min walk"
    [[2, 2, 2, 1, 2]],
    // "Keto Diet"
    [[2, 2, 1, 2, 2]],
    // Quit Sugar
    [
      [2, 2, 2, 2, 2],
      [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
      ],
      [2, 2, 2, 2, 2, 2, 2],
    ],
  ],
}

// Note: This function takes updated data and is prone to breaking if given out-of-date data.
// Out-of-date data is just data that has not been processed by the updateHabits function which is run upon rendering the site

// Test getCalendarData with all the pre-made data with the date 12/5/2019 as the mock date for today

describe("getCalendarData should correctly generate calendar data using static data", () => {
  it("with the input unchecked[0]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.unchecked[0].progress, false)).toEqual(
      output.unchecked[0]
    )
    clear()
  })

  it("with the input unchecked[1]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.unchecked[1].progress, false)).toEqual(
      output.unchecked[1]
    )
    clear()
  })

  it("with the input unchecked[2]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.unchecked[2].progress, false)).toEqual(
      output.unchecked[2]
    )
    clear()
  })

  it("with the input unchecked[3]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.unchecked[3].progress, false)).toEqual(
      output.unchecked[3]
    )
    clear()
  })

  it("with the input checked[0]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.checked[0].progress, true)).toEqual(
      output.checked[0]
    )
    clear()
  })

  it("with the input checked[1]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.checked[1].progress, true)).toEqual(
      output.checked[1]
    )
    clear()
  })

  it("with the input checked[2]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.checked[2].progress, true)).toEqual(
      output.checked[2]
    )
    clear()
  })

  it("with the input checked[3]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.checked[3].progress, true)).toEqual(
      output.checked[3]
    )
    clear()
  })

  it("with the input checked[4]", () => {
    advanceTo(new Date("12/5/2019"))
    expect(getCalendarData(data.habits.checked[4].progress, true)).toEqual(
      output.checked[4]
    )
    clear()
  })
})

describe("Ensure helper method daysInMonth works correctly", () => {
  it("returns the correct value for any of the given months and years", () => {
    expect(daysInMonth(1, 2019)).toBe(31)
    expect(daysInMonth(2, 2019)).toBe(28)
    expect(daysInMonth(3, 2019)).toBe(31)
    expect(daysInMonth(4, 2019)).toBe(30)
    expect(daysInMonth(5, 2019)).toBe(31)
    expect(daysInMonth(6, 2019)).toBe(30)
    expect(daysInMonth(7, 2019)).toBe(31)
    expect(daysInMonth(8, 2015)).toBe(31)
    expect(daysInMonth(9, 2016)).toBe(30)
    expect(daysInMonth(10, 2017)).toBe(31)
    expect(daysInMonth(11, 2018)).toBe(30)
    expect(daysInMonth(12, 2019)).toBe(31)
    expect(daysInMonth(2, 2020)).toBe(29)
  })
})
