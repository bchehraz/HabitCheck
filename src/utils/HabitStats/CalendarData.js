import _ from "lodash"

// Description:
/*
    The purpose of this function is to calculate exactly how the current habit would be laid out over all of the months necessary to display all of the data.

    For example, if the habit has 6 months worth of input data, it will return an array containing 6 months worth of data, or an array of length 6.
    - Each array value will contain another array of the exact structure of that month data
*/

/*

  Input:
  - Today's date
  - The progress of the given habit
  - Checked (whether or not it is checked today)
*/

export const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate()
}

export const getCalendarData = (
  progressArray,
  checked,
  todaysDate = new Date()
) => {
  let progress = _.cloneDeep(progressArray)

  //const todaysDate = new Date("12/23/2019");
  let date = new Date(todaysDate)

  let day = date.getDate() - 1

  let data = []
  data[0] = []

  let month = 0
  let streakCount = 0

  if (progress.length === 0) {
    data = [[]]
    data[0][day] = 3
  } else if (checked) {
    day += 1
  }

  while (progress.length !== 0) {
    const { streak } = progress[progress.length - 1]
    let status = 0
    let positiveStreak = streak >= 0
    if (streakCount === 0) {
      streakCount = Math.abs(streak)
    }

    if (!checked && month === 0 && day === todaysDate.getDate() - 1) {
      data[month].push(3)
    }
    if (streakCount > day) {
      streakCount -= day
      let newData = new Array(day)
      if (positiveStreak) {
        status = 2
      } else {
        status = 1
      }
      newData.fill(status, 0, day)
      data[month] = [...newData, ...data[month]]

      date.setDate(0)
      day = date.getDate()
      month++
      data[month] = []
    } else if (streakCount <= day) {
      day -= streakCount
      let newData = new Array(streakCount)
      if (positiveStreak) {
        status = 2
      } else {
        status = 1
      }
      newData.fill(status, 0, streakCount)
      data[month] = [...newData, ...data[month]]

      streakCount = 0
      progress.pop()

      if (progress.length !== 0 && streakCount === day) {
        date.setDate(0)
        day = date.getDate()
        month++
        data[month] = []
      }
    }
  }

  return data
}

/*
  Example Output =>
  Array of Monthly Data, so
  ---
  Array[0] is the current month data,
  Array[1] is the previous month data,
  ---

*/
