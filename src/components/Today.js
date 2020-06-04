import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import AppLayout from "./AppLayout"
import HabitList from "./HabitList"
import HabitStats from "./HabitStats"
import { AuthConsumer } from "../context/auth-context"

const HiddenPage = styled.div`
  position: relative;
  top: 0;
  left: 0;
  opacity: ${({ show }) => +show};
  background-color: white;
  width: 100vw;
  height: 100vh;
  max-width: 400px;
  margin: 0 auto;
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
          {showStats && (
            <HiddenPage show={showStats}>
              <button onClick={() => setShowStats(false)} className="backBtn">
                Back
              </button>
              <HabitStats title={selectedTitle} />
            </HiddenPage>
          )}
          {!showStats && (
            <HabitList
              habits={context.data.habits}
              checkHabit={index => context.checkHabit(index)}
              uncheckHabit={index => context.uncheckHabit(index)}
              handleAddHabit={habitTitle => {
                context.newHabit(habitTitle)
              }}
              onViewStats={selectHabit}
            />
          )}
        </AppLayout>
      )}
    </AuthConsumer>
  )
}

Today.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Today
