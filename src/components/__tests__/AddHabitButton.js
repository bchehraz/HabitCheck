import React from "react"
import { render, fireEvent } from "@testing-library/react"
// import renderer from "react-test-renderer"

import AddHabitButton from "../AddHabitButton"

test("temp", () => {
  expect(true).toBe(true)
})

test("AddHabitButton: handleAddHabit callback with input", () => {
  // pass in a function which increments variable i
  let i = 0
  const { getByText, debug, container, getByPlaceholderText } = render(
    <AddHabitButton
      handleAddHabit={() => {
        i = i + 1
      }}
    />
  )

  fireEvent.click(container)
  expect(getByText(/start new habit/i))

  fireEvent.change(getByPlaceholderText(/habit title/i), {
    target: { value: "test title" },
  })
  fireEvent.click(getByText(/start new habit/i))

  expect(i).toBe(1)
})

test("AddHabitButton: handleAddHabit callback without input", () => {
  let i = 0
  const { getByText, debug, container, getByPlaceholderText } = render(
    <AddHabitButton
      handleAddHabit={() => {
        i = i + 1
      }}
    />
  )

  fireEvent.click(container)
  expect(getByText(/start new habit/i))

  fireEvent.click(getByText(/start new habit/i))

  expect(i).toBe(0)
  //debug();
})

test("AddHabitButton: closing the window works", () => {
  let i = 0
  const { getByTestId, debug, getByText, container } = render(
    <AddHabitButton
      handleAddHabit={() => {
        i = i + 1
      }}
    />
  )

  fireEvent.click(container)
  expect(getByText(/start new habit/i))

  fireEvent.click(getByTestId(/AddHabitButtonClose/i))

  expect(i).toBe(0)
})
