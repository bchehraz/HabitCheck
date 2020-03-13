import { daysInMonth } from "./"

const formatCalendarData = (
  calendarData,
  date,
  isFirstPage,
  onCheckListener,
  onUncheckListener
) => {
  console.log("Formatting Calendar Data")
  console.log(`Input Data >>`)
  console.log("Calendar Data: ", calendarData)
  console.log("Date: ", date)
  console.log("Is it first page? ", isFirstPage)
  console.log(onCheckListener)
  console.log(onUncheckListener)
  console.log(`Starting Function >>`)

  const offset = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const endOffset = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay()
  let days = [...calendarData]
  let data = []
  let week = -1
  let dayValue = date.getDate(),
    dayCounter = 0

  const currentMonth = date.getMonth() + 1
  const currentYear = date.getFullYear()
  let totalDays = daysInMonth(currentMonth, currentYear)
  for (let i = 0; i < 6 - endOffset; i++) {
    if (dayCounter % 7 === 0) {
      week++
      data.push([])
    }
    data[week].unshift({ day: null })
    dayCounter++
  }

  //let daysIndex = days.length - 1;
  for (let j = totalDays - 1; j >= 0; j--) {
    if (dayCounter % 7 === 0) {
      week++
      data.push([])
    }

    let status = 0
    let onClick = null
    if (!days || j >= dayValue || days.length === 0) {
      status = 0
    } else {
      if (isFirstPage) {
        status = days[days.length - 1]
        if (status === 3) {
          onClick = onCheckListener
        } else {
          if (j === dayValue - 1) {
            onClick = onUncheckListener
          }
        }
        days.pop()
      } else {
        status = days[days.length - 1]
        days.pop()
      }
    }

    data[week].unshift({
      day: j + 1,
      status,
    })

    if (onClick) {
      data[week][0].onClick = onClick
    }

    dayCounter++
  }

  for (let k = 0; k < offset; k++) {
    data[week].unshift({ day: null })
  }
  data.reverse()

  console.log(`Output Data >>`)
  console.log(data)

  return data
}

export default formatCalendarData
