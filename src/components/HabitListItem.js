import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Emoji from "./Emoji"
import { FaCheck, FaSquare } from "react-icons/fa"
import { FiTrendingDown } from "react-icons/fi"

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

const TagContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 27px;
  ${({ isNew }) => isNew && "background: #66C7F4;"}
  ${({ streak }) => streak < 0 && "background: #AA4465;"}
  ${({ streak }) => streak > 1 && "background: #2D3142;"}
  border-radius: 5px;
  color: white;
  padding: 1px;
  margin: 0 auto;
`

const TagContent = styled.div`
  display: inline-grid;
  grid-template-columns: 50% 50%;
  justify-items: stretch;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  height: 100%;
  line-height: 21px;
  margin: 0;
  width: 100%;
  text-align: right;
  white-space: nowrap;
`

const IconContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Clickable = styled.div`
  position: absolute;
  width: 25%;
  height: 100%;
  left: 75%;
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

const Tag = ({ streak, isNew }) => {
  //4 different tags
  // New Tag, No Tag, Up Streak, Down Streak
  let tagContent
  if (streak > 1 || streak < 0) {
    tagContent = (
      <TagContent>
        <p className="number" style={{ fontSize: 18 }}>
          {streak}
        </p>
        {streak > 1 && (
          <Emoji symbol="🔥" label="fire" style={{ fontSize: 19 }} />
        )}
        {streak < 0 && (
          <IconContainer>
            <FiTrendingDown size={21} />
          </IconContainer>
        )}
      </TagContent>
    )
  } else if (isNew) {
    tagContent = <p style={{ margin: 0 }}>NEW</p>
  } else {
    return null
  }

  return (
    <TagContainer isNew={isNew} streak={streak}>
      {tagContent}
    </TagContainer>
  )
}

const HabitListItem = ({ title, streak, isNew, isChecked, onClick }) => {
  return (
    <ItemContainer checked={isChecked} loseStreak={streak < 0}>
      <Clickable onClick={onClick} className="habitListItemAction" />

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
}

export default HabitListItem
