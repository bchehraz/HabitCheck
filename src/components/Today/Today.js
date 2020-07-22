import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { AppLayout } from "../Layout"
import { HabitList } from "./HabitList"
import HabitStats from "../HabitStats/HabitStats"
import Backdrop from "../Backdrop"
import { AuthConsumer } from "../../context/auth-context"

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ show }) => +show};
  background-color: white;
  margin: 0 auto;
  z-index: ${props => (props.show ? 56 : -1)};
  transition: all 300ms ease-in-out;
  border-radius: 17px;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);

  width: 100vw;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

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
          {showStats && (
            <Modal show={showStats}>
              <HabitStats
                viewPref2={context.preferences.xEffectView}
                title={selectedTitle}
              />
            </Modal>
          )}
          <Backdrop
            enabled={showStats}
            onClick={() => setShowStats(false)}
            zIndex={50}
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
