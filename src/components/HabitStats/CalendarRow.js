import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import CalendarItem from "./CalendarItem"

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
`

const CalendarRow = ({ data }) => (
  <Row>
    {data.map(({ day, status, onClick }, j) => (
      <CalendarItem key={j} status={status ? status : 0} onClick={onClick}>
        <p className="number">{day}</p>
      </CalendarItem>
    ))}
  </Row>
)

CalendarRow.propTypes = {
  key: PropTypes.number,
  data: PropTypes.array,
}

export default CalendarRow
