import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Select = styled.select`
  background-color: white;
  min-width: 300px;
  max-width: 300px;
  flex: 1;
`

const DropDown = ({ list, selected, onSelect }) => {
  return (
    <Select name="habits" value={selected} onChange={onSelect}>
      {list.map((habit, index) => {
        return (
          <option key={index} value={index}>
            {habit.title}
          </option>
        )
      })}
    </Select>
  )
}

DropDown.propTypes = {
  list: PropTypes.array.isRequired,
}

export default DropDown
