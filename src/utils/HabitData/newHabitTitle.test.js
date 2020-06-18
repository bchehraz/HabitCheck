import _ from "lodash"
import newHabitTitle from "./newHabitTitle"
import { getUserData } from "../auth"

// Mock the following files
jest.mock("../auth")
jest.mock("../helpers")

describe("newHabitTitle Test", () => {
  it("Should correctly manipulate cache data using mocked functions", () => {
    let habits = _.cloneDeep(getUserData().habits)
    let oldTitle = "TEST_DATA_1"
    let newTitle = "Test Habit 1"

    expect(habits.map[oldTitle].index).toEqual(1)
    expect(habits.map[oldTitle].isChecked).toBe(false)
    expect(habits.map[newTitle]).toBe(undefined)

    habits.unchecked[1].title = newTitle
    habits.map[newTitle] = { index: 1, isChecked: false }
    delete habits.map[oldTitle]
    expect(newHabitTitle(oldTitle, newTitle)).toEqual(habits)

    const updatedHabits = getUserData().habits
    expect(updatedHabits.map[newTitle].index).toEqual(1)
    expect(updatedHabits.map[newTitle].isChecked).toBe(false)
    expect(updatedHabits.map[oldTitle]).toBe(undefined)

    expect(updatedHabits.unchecked[habits.map[newTitle].index].title).toEqual(
      newTitle
    )
  })
})
