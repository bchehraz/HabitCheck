import React from "react"
import { render, fireEvent } from "@testing-library/react"
import renderer from "react-test-renderer"
import { advanceTo, clear } from "jest-date-mock"

import Today from "./Today.js"
import { AuthProvider } from "../../context/auth-context"
import { data } from "../../utils/static/data"

describe("Today.js Snapshot Test", () => {
  // Mock date prior to running snapshot test since the date is visible in the component
  beforeEach(() => advanceTo(new Date("7/4/2020")))

  test("Today: Snapshot test", () => {
    const tree = renderer
      .create(<Today path="/app/" handleAddHabit={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
    clear()
  })
})

test("Today: Render with empty habit data, fresh context", () => {
  const { queryAllByTestId } = render(
    <AuthProvider
      value={{
        data: {
          habits: {
            lastUpdate: null,
            checked: [],
            unchecked: [],
            map: [],
          },
        },
      }}
    >
      <Today path="/app/" handleAddHabit={() => {}} />
    </AuthProvider>
  )
  expect(queryAllByTestId("HabitListItem")).toHaveLength(0)
  expect(queryAllByTestId("HabitListItemMobile")).toHaveLength(0)
})

test("Today: Render with some habit data inside context", () => {
  const { queryAllByTestId } = render(
    <AuthProvider
      value={{
        data: {
          habits: {
            lastUpdate: null,
            checked: data.habits.checked,
            unchecked: data.habits.unchecked,
            map: [],
          },
        },
      }}
    >
      <Today path="/app/" handleAddHabit={() => {}} />
    </AuthProvider>
  )
  expect(queryAllByTestId("HabitListItem")).toHaveLength(9)
  expect(queryAllByTestId("HabitListItemMobile")).toHaveLength(9)
})
