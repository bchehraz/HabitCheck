import { getCalendarData } from "../../HabitStats/CalendarData"
import { data } from "../../static/updatedDataSet1"

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
    expect(
      getCalendarData(
        data.habits.unchecked[0].progress,
        false,
        new Date("12/5/2019")
      )
    ).toEqual(output.unchecked[0])
  })

  it("with the input unchecked[1]", () => {
    expect(
      getCalendarData(
        data.habits.unchecked[1].progress,
        false,
        new Date("12/5/2019")
      )
    ).toEqual(output.unchecked[1])
  })

  it("with the input unchecked[2]", () => {
    expect(
      getCalendarData(
        data.habits.unchecked[2].progress,
        false,
        new Date("12/5/2019")
      )
    ).toEqual(output.unchecked[2])
  })

  it("with the input unchecked[3]", () => {
    expect(
      getCalendarData(
        data.habits.unchecked[3].progress,
        false,
        new Date("12/5/2019")
      )
    ).toEqual(output.unchecked[3])
  })

  it("with the input checked[0]", () => {
    expect(
      getCalendarData(
        data.habits.checked[0].progress,
        true,
        new Date("12/5/2019")
      )
    ).toEqual(output.checked[0])
  })

  it("with the input checked[1]", () => {
    expect(
      getCalendarData(
        data.habits.checked[1].progress,
        true,
        new Date("12/5/2019")
      )
    ).toEqual(output.checked[1])
  })

  it("with the input checked[2]", () => {
    expect(
      getCalendarData(
        data.habits.checked[2].progress,
        true,
        new Date("12/5/2019")
      )
    ).toEqual(output.checked[2])
  })

  it("with the input checked[3]", () => {
    expect(
      getCalendarData(
        data.habits.checked[3].progress,
        true,
        new Date("12/5/2019")
      )
    ).toEqual(output.checked[3])
  })

  it("with the input checked[4]", () => {
    expect(
      getCalendarData(
        data.habits.checked[4].progress,
        true,
        new Date("12/5/2019")
      )
    ).toEqual(output.checked[4])
  })
})
