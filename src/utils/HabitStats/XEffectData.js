import _ from "lodash"

// Description:
/*
    The purpose of this function is to calculate exactly how the current habit would be laid out in an X-Effect style view

    For example, if the habit has 6 months worth of input data, it will return a data set in array format for each page of an X-effect
*/

/*

  Input:
  - The progress of the given habit
  - Checked (whether or not it is checked today)
*/

//An item can only be one of the following status values
const status = {
  CURRENT: 3,
  CHECKED: 2,
  MISSED: 1,
  VOID: 0,
}

/*
getXEffectData() args ->
  1. Data input is from progress array
  2. checked is a boolean value for if the habit is currently checked off for the day
  3. maxSize indicates the total number of elements allowed in a single XEffect Page
*/
export const getXEffectData = (progressArray, checked, maxSize) => {
  let progress = _.cloneDeep(progressArray)

  //Output of this should contain an array of arrays of length maxSize
  let output = [[]]

  let page = 0
  let streakCount = 0
  let index = 0

  if (progress.length === 0) {
    //if the habit has not been checked yet...
    output[0][0] = status.CURRENT
    let arr = new Array(maxSize - 1)
    arr.fill(status.VOID, 0, maxSize - 1)
    output[0] = [...output[0], ...arr]
    return output
  }

  let remainingLength = 0

  while (progress.length !== 0) {
    const { streak } = progress[0]
    // let status = 0;
    let positiveStreak = streak >= 0
    if (streakCount === 0) {
      streakCount = Math.abs(streak)
    }

    remainingLength = maxSize - index
    if (streakCount >= remainingLength) {
      streakCount -= remainingLength
      let arr = new Array(remainingLength)
      arr.fill(
        (positiveStreak && status.CHECKED) || status.MISSED,
        0,
        remainingLength
      )
      output[0] = [...output[0], ...arr]
      output.unshift([])
      index = 0
    } else {
      let arr = new Array(streakCount)
      arr.fill(
        (positiveStreak && status.CHECKED) || status.MISSED,
        0,
        streakCount
      )
      output[0] = [...output[0], ...arr]
      index += streakCount
      streakCount = 0
      progress.shift()
    }
  }
  if (!checked) {
    output[0][index] = status.CURRENT
    index++
  }
  remainingLength = maxSize - index
  if (remainingLength > 0) {
    let arr = new Array(remainingLength)
    arr.fill(status.VOID, 0, remainingLength)
    output[0] = [...output[0], ...arr]
  }
  return output
}

/*
  Example Output =>
  Array of X Effect Data, so
  ---
  Array[0] is the X Effect Board,
  Array[1] is the next X Effect Board and so on,
  ---

*/
