import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  border-radius: 7px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  ${({ status }) =>
    status === 2 && "background-color: rgba(138, 203, 136, 0.75);"}
  ${({ status }) =>
    status === 1 && "background-color: rgba(170, 68, 101, 0.75);"}
  ${({ status }) => status === 3 && "border: 3px solid #66C7F4;"}
  color: rgba(0, 0, 0, 0.35);
  ${({ status }) =>
    (status === 1 || status === 2 || status === 3) && "color: #2D3142;"}
  ${({ label }) => label && "color: #66C7F4;"}
  p.number {
    font-weight: 300 !important;
  }
`

const CalendarItem = ({ children, status, isLabel, onClick }) => (
  <Container label={isLabel && "true"} status={status} onClick={onClick}>
    {children}
  </Container>
)

CalendarItem.propTypes = {
  children: PropTypes.object.isRequired,
  status: PropTypes.number,
  isLabel: PropTypes.bool,
  onClick: PropTypes.func,
}

export default CalendarItem
