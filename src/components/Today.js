import React from "react"
import PropTypes from "prop-types"

import AppLayout from "./AppLayout"
import HabitList from "./HabitList"
import { AuthConsumer } from "../context/auth-context"

const Today = ({ path }) => (
  <AuthConsumer>
    {context => (
      <AppLayout path={path}>
        <HabitList
          habits={context.data.habits}
          checkHabit={index => context.checkHabit(index)}
          uncheckHabit={index => context.uncheckHabit(index)}
          handleAddHabit={habitTitle => {
            context.newHabit(habitTitle)
          }}
        />
      </AppLayout>
    )}
  </AuthConsumer>
)

Today.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Today
