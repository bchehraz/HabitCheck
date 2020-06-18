import { formatCalendarData } from "./"

// formatCalendarData Function Test

// Input is the progress of a habit in array format
// Output is the array of arrays of data (pages of calendar data)
// whose data values are status [0-3]

// Testing for...
// 1 first page with full input
// 1 on a non-first page (has to be full)

let expectedOutput

describe("formatCalendarData should correctly output for the given inputs", () => {
  beforeEach(() => {
    expectedOutput = [
      [
        [
          { day: 1, status: 0 },
          { day: 2, status: 0 },
          { day: 3, status: 0 },
          { day: 4, status: 0 },
          { day: 5, status: 0 },
          { day: 6, status: 0 },
          { day: 7, status: 0 },
        ],
        [
          { day: 8, status: 0 },
          { day: 9, status: 0 },
          { day: 10, status: 0 },
          { day: 11, status: 0 },
          { day: 12, status: 0 },
          { day: 13, status: 0 },
          { day: 14, status: 0 },
        ],
        [
          { day: 15, status: 0 },
          { day: 16, status: 0 },
          { day: 17, status: 0 },
          { day: 18, status: 0 },
          { day: 19, status: 0 },
          { day: 20, status: 2 },
          { day: 21, status: 1 },
        ],
        [
          { day: 22, status: 1 },
          { day: 23, status: 1 },
          { day: 24, status: 2 },
          { day: 25, status: 3, onClick: () => {} },
          { day: 26, status: 0 },
          { day: 27, status: 0 },
          { day: 28, status: 0 },
        ],
        [
          { day: 29, status: 0 },
          { day: 30, status: 0 },
          { day: 31, status: 0 },
          { day: null },
          { day: null },
          { day: null },
          { day: null },
        ],
      ],
      [
        [
          { day: 1, status: 2 },
          { day: 2, status: 1 },
          { day: 3, status: 1 },
          { day: 4, status: 1 },
          { day: 5, status: 2 },
          { day: 6, status: 2 },
          { day: 7, status: 2 },
        ],
        [
          { day: 8, status: 2 },
          { day: 9, status: 2 },
          { day: 10, status: 2 },
          { day: 11, status: 2 },
          { day: 12, status: 2 },
          { day: 13, status: 2 },
          { day: 14, status: 2 },
        ],
        [
          { day: 15, status: 2 },
          { day: 16, status: 2 },
          { day: 17, status: 1 },
          { day: 18, status: 1 },
          { day: 19, status: 2 },
          { day: 20, status: 1 },
          { day: 21, status: 1 },
        ],
        [
          { day: 22, status: 2 },
          { day: 23, status: 2 },
          { day: 24, status: 2 },
          { day: 25, status: 2 },
          { day: 26, status: 2 },
          { day: 27, status: 2 },
          { day: 28, status: 2 },
        ],
        [
          { day: 29, status: 2 },
          { day: 30, status: 2 },
          { day: 31, status: 2 },
          { day: null },
          { day: null },
          { day: null },
          { day: null },
        ],
      ],
    ]
  })

  it("Should output correctly for the given input", () => {
    let onClick = () => {}
    const input = [2, 1, 1, 1, 2, 3]
    expect(
      JSON.stringify(
        formatCalendarData(
          input,
          new Date("12/25/2019"),
          true,
          onClick,
          onClick
        )
      )
    ).toEqual(JSON.stringify(expectedOutput[0]))
  })

  it("Should output correctly for the given input", () => {
    let onClick = () => {}
    const input = [
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
      1,
      1,
      2,
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
    ]
    expect(
      JSON.stringify(
        formatCalendarData(
          input,
          new Date("12/31/2019"),
          false,
          onClick,
          onClick
        )
      )
    ).toEqual(JSON.stringify(expectedOutput[1]))
  })
})
