import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { FaSquare } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"

import { Tag } from "./"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  /* max-width: 327px; */
  width: 100%;
  height: 100%;
  border: 2px solid #2d3142;
  border-radius: 17px;
  user-select: none;

  ${({ streak }) => streak < 0 && "border-color: #AA4465;"}

  ${props =>
    props.checked &&
    css`
      border-color: #8acb88;
      background-color: #8acb88;
      color: #ffffff;
    `}

  /* Animation */
  opacity: 0;
  transform: rotateX(-90deg) translateY(-100px);

  &.show {
    opacity: 1;
    transform: none;
    transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
  }

  &.animate {
    opacity: 1;
    transform: none;
    transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
  }

  h4 {
    ${({ checked }) => checked && "color: #FFFFFF;"}
    font-weight: 600;
    margin: 0;
  }
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

  .checkbox,
  .check {
    width: 28px;
    height: 28px;
    transition: all 300ms ease-out;
  }
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

const ListItemMobile = ({
  title,
  streak,
  isNew,
  isChecked,
  onClick,
  viewStats,
  justAdded,
  toggleAnimate,
}) => {
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    if (justAdded) {
      setAnimated(true)
      toggleAnimate()
    } else {
      setAnimated(false)
    }
  }, [justAdded])
  return (
    <Container
      className={(!justAdded && "show") || (animated && "animate")}
      checked={isChecked}
      data-testid="HabitListItemMobile"
      streak={streak}
      isNew={isNew}
    >
      <LeftClickable onClick={viewStats} className="toHabitStats" />
      <RightClickable onClick={onClick} className="habitListItemAction" />

      <h4>{title}</h4>

      <Status className="habitListItemStatus">
        <Tag streak={streak} isNew={isNew} mobile />
        <CheckBox className="habitListItemCheckbox">
          {(isChecked && <BsCheck className="check" />) || (
            <FaSquare
              className="checkbox"
              style={{
                color: "white",
                border: "1px solid #2D3142",
                borderRadius: "4px",
              }}
            />
          )}
        </CheckBox>
      </Status>
    </Container>
  )
}

ListItemMobile.propTypes = {
  title: PropTypes.string,
  streak: PropTypes.number,
  isNew: PropTypes.bool,
  isChecked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  viewStats: PropTypes.func.isRequired,
  justAdded: PropTypes.bool,
  toggleAnimate: PropTypes.func,
}

export default ListItemMobile
