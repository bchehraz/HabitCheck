import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { AppLayout } from "../Layout"
import { HabitList } from "./HabitList"
import HabitStats from "../HabitStats/HabitStats"
import Backdrop from "../Backdrop"
import { AuthConsumer } from "../../context/auth-context"

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  background-color: rgba(0, 0, 0, 0);
  margin: 0 auto;

  transition: all 300ms ease-out;
  z-index: 2000;

  width: 100vw;
  height: auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;

  top: 50%;
  bottom: 50%;

  @media only screen and (min-width: 600px) {
    margin-left: -200px;
    max-width: 400px;
    left: 50%;
  }
`

const Today = ({ path }) => {
  const [showStats, setShowStats] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState("")

  const selectHabit = title => {
    setShowStats(true)
    setSelectedTitle(title)
  }

  return (
    <AuthConsumer>
      {context => (
        <AppLayout path={path}>
          <HabitList
            habits={context.data.habits}
            checkHabit={title => context.checkHabit(title)}
            uncheckHabit={title => context.uncheckHabit(title)}
            handleAddHabit={habitTitle => {
              context.newHabit(habitTitle)
            }}
            onViewStats={selectHabit}
          />
          <Modal show={showStats}>
            {showStats && <HabitStats title={selectedTitle} show={showStats} />}
          </Modal>
          <Backdrop
            enabled={showStats}
            onClick={() => setShowStats(false)}
            zIndex={1999}
          />
        </AppLayout>
      )}
    </AuthConsumer>
  )
}

Today.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Today
