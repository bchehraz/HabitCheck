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
  let output = []

  if (progress.length === 0) {
    //if the habit has not been checked yet...
    output.push([status.CURRENT, ...new Array(maxSize - 1).fill(status.VOID)])
    return output
  }

  let arr = []
  progress.forEach(obj => {
    const { streak } = obj
    for (let i = 0; i < Math.abs(streak); i++) {
      if (streak < 0) {
        arr.push(status.MISSED)
      } else {
        arr.push(status.CHECKED)
      }
      if (arr.length === maxSize) {
        output.unshift(arr.splice(0, maxSize))
      }
    }
  })
  if (!checked) {
    arr.push(status.CURRENT)
  }
  if (arr.length > 0) {
    let remainingLength = maxSize - arr.length
    output.unshift([...arr, ...new Array(remainingLength).fill(status.VOID)])
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
