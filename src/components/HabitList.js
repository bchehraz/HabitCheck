import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import HabitListItem from "./HabitListItem"
import AddHabitButton from "./AddHabitButton"

const HabitListContainer = styled.div`
  width: 100%;
`

const HabitList = ({ habits, handleAddHabit, checkHabit, uncheckHabit }) => (
  <HabitListContainer>
    <AddHabitButton handleAddHabit={handleAddHabit} />
    {habits.unchecked.map((habit, index) => {
      const { title } = habit
      let streak = 0
      if (habit.progress.length !== 0) {
        const { length } = habit.progress
        streak = habit.progress[length - 1].streak
      }
      return (
        <HabitListItem
          key={index}
          title={title}
          streak={streak}
          isNew={streak === 0}
          isChecked={false}
          onClick={() => {
            checkHabit(index)
          }}
        />
      )
    })}
    {habits.checked.map((habit, index) => {
      const { length } = habit.progress
      const { title, progress } = habit
      const { streak } = progress[length - 1]

      return (
        <HabitListItem
          key={index}
          title={title}
          streak={streak}
          isNew={streak === 0}
          isChecked={true}
          onClick={() => {
            uncheckHabit(index)
          }}
        />
      )
    })}
  </HabitListContainer>
)

HabitList.propTypes = {
  habits: PropTypes.object.isRequired,
  handleAddHabit: PropTypes.func.isRequired,
}

export default HabitList
