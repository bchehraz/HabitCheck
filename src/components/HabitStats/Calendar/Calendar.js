import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"

import { CalendarWeekLabel, CalendarRow } from "./"
import { formatCalendarData } from "../../../utils/HabitStats/Calendar"

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

  .btnPageLeft,
  .btnPageRight {
    opacity: 1;
  }

  .btnDisabled {
    opacity: 0;
  }
`

const Container = styled.div`
  padding: 25px 0;
  display: flex;
  flex-flow: column nowrap;
  user-select: none;
  max-width: 340px;
  margin: 0 auto;
`

const DaysContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
`

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
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  const hasPrevPage = pageMax > page
  const hasNextPage = page !== 0

  const calendarDays = () => {
    const data = formatCalendarData(
      calendarData,
      date,
      page === 0,
      onCheck,
      onUncheck
    )

    return data.map((week, i) => (
      <div key={i}>
        <CalendarRow data={week} isLabel={false} />
      </div>
    ))
  }

  return (
    <Container>
      <CalendarHeader>
        <div
          className={(hasPrevPage && "btnPageLeft") || "btnDisabled"}
          onClick={() => {
            return hasPrevPage && onClickLeft()
          }}
        >
          <FaCaretLeft size={32} />
        </div>
        <h3 className="title">{`${month} ${year}`}</h3>
        <div
          className={(hasNextPage && "btnPageRight") || "btnDisabled"}
          onClick={() => {
            return hasNextPage && onClickRight()
          }}
        >
          <FaCaretRight size={32} />
        </div>
      </CalendarHeader>
      <DaysContainer className="calendarData">
        <CalendarWeekLabel />
        {calendarDays()}
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
