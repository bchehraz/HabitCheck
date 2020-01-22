import React from "react"
import renderer from "react-test-renderer"

import AppHeader from "../AppHeader"

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<AppHeader title="HabitCheck" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
