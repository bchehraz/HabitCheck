import React, { useState } from "react"
import PropTypes from "prop-types"

import Calendar from "./Calendar"

const CalendarView = ({ data, onCheck, onUncheck }) => {
  const today = new Date()
  const [date, setDate] = useState(today)
  const [page, setPage] = useState(0)

  const onNextPage = () => {
    const newPage = page - 1
    setPage(newPage)

    if (newPage === 0) {
      setDate(today)
    } else {
      date.setDate(32)
      date.setDate(32)
      date.setDate(0)
      setDate(date)
    }
  }

  const onPrevPage = () => {
    const newPage = page + 1
    setPage(newPage)

    if (newPage === 0) {
      setDate(today)
    } else {
      date.setDate(0)
      setDate(date)
    }
  }

  return (
    <Calendar
      calendarData={data[page] || []}
      date={date}
      onClickLeft={onPrevPage}
      onClickRight={onNextPage}
      page={page}
      pageMax={data.length - 1}
      onCheck={onCheck}
      onUncheck={onUncheck}
    />
  )
}

CalendarView.propTypes = {
  data: PropTypes.array.isRequired,
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
}

export default CalendarView
