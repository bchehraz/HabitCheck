import React from "react"
import PropTypes from "prop-types"

import Calendar from "./Calendar"

const CalendarView = ({
  date,
  data,
  page,
  onPrevPage,
  onNextPage,
  pageMax,
  onCheck,
  onUncheck,
}) => {
  return (
    <Calendar
      calendarData={data}
      date={date}
      onClickLeft={onPrevPage}
      onClickRight={onNextPage}
      page={page}
      pageMax={pageMax}
      onCheck={onCheck}
      onUncheck={onUncheck}
    />
  )
}

CalendarView.propTypes = {
  data: PropTypes.array.isRequired,
  date: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  pageMax: PropTypes.number.isRequired,
  onCheck: PropTypes.func.isRequired,
  onUncheck: PropTypes.func.isRequired,
}

export default CalendarView
