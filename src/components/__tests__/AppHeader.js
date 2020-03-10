import React from "react"
import renderer from "react-test-renderer"
import { advanceTo, clear } from "jest-date-mock"

import AppHeader from "../AppHeader"

describe("Header", () => {
  it("renders correctly", () => {
    advanceTo(new Date("12/25/2019"))
    const tree = renderer.create(<AppHeader title="HabitCheck" />).toJSON()
    expect(tree).toMatchSnapshot()
    clear()
  })
})
