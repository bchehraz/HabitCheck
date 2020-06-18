import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { FaCheck, FaSquare } from "react-icons/fa"

import { Tag } from "./"

const ItemContainer = styled.div`
  margin-bottom: 14px;
  padding: 20px;
  width: 327px;
  height: 53px;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  border: 2px solid #2D3142;
  ${({ loseStreak }) => loseStreak && "border-color: #AA4465;"}
  ${({ checked }) => checked && "border-color: #8ACB88;"}
  ${({ checked }) => checked && "background-color: #8ACB88;"}
  ${({ checked }) => checked && "color: #FFFFFF;"}
  border-radius: 17px;

  h4 {
    ${({ checked }) => checked && "color: #FFFFFF;"}
  }

  position: relative;
`

const LeftClickable = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0%;
  cursor: pointer;
`

const RightClickable = styled.div`
  position: absolute;
  width: 25%;
  height: 100%;
  left: 75%;
  cursor: pointer;
`

const Status = styled.div`
  display: flex;
  flex-direction: row nowrap;
  justify-content: flex-end;
  align-items: center;
`

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`

const HabitListItem = ({
  title,
  streak,
  isNew,
  isChecked,
  onClick,
  viewStats,
}) => {
  return (
    <ItemContainer
      data-testid="HabitListItem"
      checked={isChecked}
      loseStreak={streak < 0}
    >
      <LeftClickable onClick={viewStats} className="toHabitStats" />
      <RightClickable onClick={onClick} className="habitListItemAction" />

      <h4 style={{ margin: 0 }}>{title}</h4>

      <Status className="habitListItemStatus">
        <Tag streak={streak} isNew={isNew} />
        <CheckBox className="habitListItemCheckbox">
          {(isChecked && <FaCheck size={23} />) || (
            <FaSquare
              size={23}
              style={{
                color: "white",
                border: "1px solid #2D3142",
                borderRadius: "4px",
              }}
            />
          )}
        </CheckBox>
      </Status>
    </ItemContainer>
  )
}

HabitListItem.propTypes = {
  title: PropTypes.string,
  streak: PropTypes.number,
  isNew: PropTypes.bool,
  isChecked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  viewStats: PropTypes.func.isRequired,
}

export default HabitListItem
