import { getXEffectData } from "../XEffectData"
import { data } from "../../static/updatedDataSet1"

// Obviously getXEffectDAta doesn't care what day it is, but
// - this output assumes the data is updated up until 12/5/2019
const output = {
  unchecked: [
    // "Work on HabitCheck"
    [
      [
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ],
    // "Quit Smoking"
    [
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
        1,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
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
      ],
    ],
    // "Meditate"
    [
      [
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ],
    // "Sleep on Time"
    [
      [
        2,
        1,
        1,
        2,
        1,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ],
  ],
  checked: [
    // "90 min Yoga"
    [
      [
        2,
        2,
        2,
        2,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ],
    // "Push Ups"
    [
      [
        2,
        1,
        1,
        2,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ],
    // "30 min walk"
    [
      [
        2,
        2,
        2,
        1,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ],
    // "Keto Diet"
    [
      [
        2,
        2,
        1,
        2,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ],
    // Quit Sugar
    [
      [
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
        2,
        2,
        2,
        2,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
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
      ],
    ],
  ],
}

// getXEffectData takes 3 parameters.
// --- Currently, the site uses maxSize of 25 by default
const MAX_SIZE = 25
const checked = true

describe("getXEffectData should work", () => {
  // Unchecked habit progress
  it("with 'Work on HabitCheck' progress as input", () => {
    expect(
      getXEffectData(data.habits.unchecked[0].progress, !checked, MAX_SIZE)
    ).toStrictEqual(output.unchecked[0])
  })

  it("with 'Quit Smoking' progress as input", () => {
    expect(
      getXEffectData(data.habits.unchecked[1].progress, !checked, MAX_SIZE)
    ).toStrictEqual(output.unchecked[1])
  })

  it("with 'Meditate' progress as input", () => {
    expect(
      getXEffectData(data.habits.unchecked[2].progress, !checked, MAX_SIZE)
    ).toStrictEqual(output.unchecked[2])
  })

  it("with 'Sleep on time' progress as input", () => {
    expect(
      getXEffectData(data.habits.unchecked[3].progress, !checked, MAX_SIZE)
    ).toStrictEqual(output.unchecked[3])
  })

  // Checked habit progress
  it("with 'Push Ups' progress as input", () => {
    expect(
      getXEffectData(data.habits.checked[0].progress, checked, MAX_SIZE)
    ).toStrictEqual(output.checked[0])
  })

  it("with '30 min walk' progress as input", () => {
    expect(
      getXEffectData(data.habits.checked[1].progress, checked, MAX_SIZE)
    ).toStrictEqual(output.checked[1])
  })

  it("with 'Keto Diet' progress as input", () => {
    expect(
      getXEffectData(data.habits.checked[2].progress, checked, MAX_SIZE)
    ).toStrictEqual(output.checked[2])
  })

  it("with 'Quit Sugar' progress as input", () => {
    expect(
      getXEffectData(data.habits.checked[3].progress, checked, MAX_SIZE)
    ).toStrictEqual(output.checked[3])
  })
})
