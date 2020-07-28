import React from "react"
import renderer from "react-test-renderer"

import StatHighlight from "./StatHighlight"

describe("StatHighlight component", () => {
  it("snapshot test with props", () => {
    const tree = renderer
      .create(
        <StatHighlight
          title="Best Streak"
          statValue={30}
          primaryColor="#333"
          secondaryColor="ddd"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
