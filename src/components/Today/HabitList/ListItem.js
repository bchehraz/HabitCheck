import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FaSquare } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"

import { Tag } from "./"

const Container = styled.div`
  margin-bottom: 14px;
  display: flex;
  flex-flow: column nowrap;
  align-items: space-between;
  justify-content: center;

  width: 314px;
  width: 100%;
  height: 119px;
  border: none;
  justify-content: flex-start;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
  margin: 0 auto;
  transform: rotateX(-90deg) translateX(-100px);
  opacity: 0;
  user-select: none;

  ${({ streak }) => streak < 0 && "border-color: #AA4465;"}
  ${({ checked }) => checked && "border-color: #8ACB88;"}
  border-radius: 17px;

  ${({ checked }) => checked && "background-color: #8ACB88;"}
  ${({ checked }) => checked && "color: #FFFFFF;"}

  h4 {
    ${({ checked }) => checked && "color: #FFFFFF;"}
    font-weight: 600;
    font-size: 1.2em;
  }

  /* Animation */
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

  @media only screen and (min-width: 1024px) {
    height: 135px;
  }

  @media only screen and (min-width: 1440px) {
    height: 150px;
  }
`

const Head = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  ${({ checked }) => !checked && "justify-content: flex-end;"}
  align-items: center;
  width: 100%;
  ${({ streak }) => streak >= 0 && "background-color: #2D3142;"}
  ${({ streak }) => streak < 0 && "background-color: #AA4465;"}
  ${({ checked }) => checked && "background-color: #5AAF58;"}
  ${({ isNew }) => isNew && "background-color: #66C7F4;"}
  border-radius: 17px 17px 0 0;
  padding: 0 1em;
  height: 42px;

  h4 {
    color: #B6ECB4;
    margin: 0;
  }
`

const Body = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: calc(100% - 30px);
  padding: 2em 1em;
  border-radius: 0 0 17px 17px;
  border: 2px solid #2D3142;
  ${({ streak }) => streak < 0 && "border-color: #AA4465;"}
  ${({ checked }) => checked && "border-color: #8ACB88;"}
  ${({ isNew }) => isNew && "border-color: #66C7F4;"}
  border-radius: 0 0 17px 17px;
  transition: all 300ms ease-out;
`

const Status = styled.div`
  display: flex;
  flex-direction: row nowrap;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;

  padding: 20px 10px;
`

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .checkbox,
  .check {
    width: 40px;
    height: 40px;
  }
`

const Clickable = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 73%;
  height: 100%;
  cursor: pointer;
`

const ListItem = ({
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
      data-testid="HabitListItem"
      checked={isChecked}
      streak={streak}
      isNew={isNew}
    >
      <Head checked={isChecked} streak={streak} isNew={isNew}>
        {isChecked && <h4>Completed</h4>}
        <Tag streak={streak} isNew={isNew} tablet />
      </Head>
      <Body streak={streak} checked={isChecked} isNew={isNew}>
        <Clickable onClick={viewStats} />

        <h4 style={{ margin: 0 }}>{title}</h4>

        <Status className="habitListItemStatus" onClick={onClick}>
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
      </Body>
    </Container>
  )
}

ListItem.propTypes = {
  title: PropTypes.string,
  streak: PropTypes.number,
  isNew: PropTypes.bool,
  isChecked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  viewStats: PropTypes.func.isRequired,
  justAdded: PropTypes.bool,
  toggleAnimate: PropTypes.func,
}

ListItem.defaultProps = {
  justAdded: false,
}

export default ListItem
