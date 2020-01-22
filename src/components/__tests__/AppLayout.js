import React from "react"
import renderer from "react-test-renderer"
import { advanceTo, clear } from "jest-date-mock"

import AppLayout from "../AppLayout"

describe("Header", () => {
  it("renders correctly with /app/ path", () => {
    advanceTo(new Date("12/25/2019"))
    const tree = renderer
      .create(
        <AppLayout path="/app/">
          <h1>Some Content</h1>
        </AppLayout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    clear()
  })

  it("renders correctly with /app/stats", () => {
    advanceTo(new Date("12/25/2019"))
    const tree = renderer
      .create(
        <AppLayout path="/app/stats">
          <h1>Some Content</h1>
        </AppLayout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    clear()
  })

  it("renders correctly with /app/journal", () => {
    advanceTo(new Date("12/25/2019"))
    const tree = renderer
      .create(
        <AppLayout path="/app/journal">
          <h1>Some Content</h1>
        </AppLayout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    clear()
  })
})
