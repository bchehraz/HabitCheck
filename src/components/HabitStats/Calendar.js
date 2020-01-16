import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"

import CalendarWeekLabel from "./CalendarWeekLabel"
import CalendarRow from "./CalendarRow"
import { daysInMonth } from "utils/HabitStats/CalendarData"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const CalendarHeader = styled.div`
  color: #66c7f4;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  h3 {
    color: #66c7f4;
  }
`

const Container = styled.div`
  padding: 25px 0;
  display: flex;
  flex-flow: column nowrap;
  user-select: none;
`

const DaysContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
`

const calendarDays = (
  daysData,
  offset,
  endOffset,
  date,
  page,
  onCheckListener,
  onUncheckListener
) => {
  let days = [...daysData]
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
      if (page === 0) {
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
      onClick,
    })

    dayCounter++
  }

  for (let k = 0; k < offset; k++) {
    data[week].unshift({ day: null })
  }
  data.reverse()

  return data.map((week, i) => (
    <div key={i}>
      <CalendarRow data={week} isLabel={false} />
    </div>
  ))
}

const Calendar = ({
  date,
  calendarData,
  page,
  onClickLeft,
  onClickRight,
  pageMax,
  onCheck,
  onUncheck,
}) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return (
    <Container>
      <CalendarHeader>
        {pageMax <= page && (
          <div>
            <FaCaretLeft size={32} style={{ opacity: 0 }} />
          </div>
        )}
        {pageMax > page && (
          <div onClick={onClickLeft}>
            <FaCaretLeft size={32} />
          </div>
        )}
        <h3 className="title">{`${month} ${year}`}</h3>
        {page === 0 && (
          <div>
            <FaCaretRight size={32} style={{ opacity: 0 }} />
          </div>
        )}
        {page !== 0 && (
          <div onClick={onClickRight}>
            <FaCaretRight size={32} />
          </div>
        )}
      </CalendarHeader>
      <DaysContainer>
        <div>
          <CalendarWeekLabel />
          {calendarDays(
            calendarData,
            firstDay,
            lastDay,
            date,
            page,
            onCheck,
            onUncheck
          )}
        </div>
      </DaysContainer>
    </Container>
  )
}

Calendar.propTypes = {
  calendarData: PropTypes.array,
  date: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired,
  pageMax: PropTypes.number.isRequired,
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
}

export default Calendar
