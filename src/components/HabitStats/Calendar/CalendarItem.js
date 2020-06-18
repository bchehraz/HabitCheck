import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  .calendarItem {
    border-radius: 7px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: rgba(0, 0, 0, 0.35);
    ${({ label }) => label && "color: #66C7F4;"}
    p.number {
      font-weight: 300 !important;
    }
    margin: 2px 5px;
  }

  .status__1,
  .status__2,
  .status__3 {
    color: #2d3142;
  }

  .status__1 {
    background-color: rgba(170, 68, 101, 0.75);
  }

  .status__2 {
    background-color: rgba(138, 203, 136, 0.75);
  }

  .status__3 {
    border: 3px solid #66c7f4;
  }
`

const CalendarItem = ({ children, status, isLabel, onClick }) => (
  <Container label={isLabel && 1} onClick={onClick}>
    <div className={`calendarItem status__${status}`}>{children}</div>
  </Container>
)

CalendarItem.propTypes = {
  children: PropTypes.object.isRequired,
  status: PropTypes.number,
  isLabel: PropTypes.bool,
  onClick: PropTypes.func,
}

export default CalendarItem
