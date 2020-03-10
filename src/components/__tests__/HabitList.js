import React from "react"
import renderer from "react-test-renderer"

import HabitList from "../HabitList"
import { data_1, data } from "../../utils/data"

describe("HabitList Component Snapshot", () => {
  it("renders with empty data", () => {
    const tree = renderer
      .create(
        <HabitList
          habits={data_1.habits}
          handleAddHabit={() => {}}
          checkHabit={() => {}}
          uncheckHabit={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders with data", () => {
    const tree = renderer
      .create(
        <HabitList
          habits={data.habits}
          handleAddHabit={() => {}}
          checkHabit={() => {}}
          uncheckHabit={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
