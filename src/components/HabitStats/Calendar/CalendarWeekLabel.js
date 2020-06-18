import React from "react"
import styled from "styled-components"

import { CalendarItem } from "./"

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
`

const labels = ["S", "M", "T", "W", "T", "F", "S"]

const CalendarWeekLabel = () => (
  <Row>
    {labels.map((label, index) => (
      <CalendarItem isLabel key={index}>
        <p className="label">{label}</p>
      </CalendarItem>
    ))}
  </Row>
)

export default CalendarWeekLabel
