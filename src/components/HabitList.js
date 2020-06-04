import React from "react"
import { navigate } from "@reach/router"
import PropTypes from "prop-types"
import styled from "styled-components"

import HabitListItem from "./HabitListItem"
import AddHabitButton from "./AddHabitButton"

const HabitListContainer = styled.div`
  width: 100%;
`

const HabitList = ({
  habits,
  handleAddHabit,
  checkHabit,
  uncheckHabit,
  onViewStats,
}) => {
  const viewStats = title => {
    onViewStats(title)
  }

  return (
    <HabitListContainer className="habitList">
      <AddHabitButton handleAddHabit={handleAddHabit} />
      {habits.unchecked.map((habit, index) => {
        const { title } = habit
        let streak = 0
        if (habit.progress.length !== 0) {
          const { length } = habit.progress
          streak = habit.progress[length - 1].streak
        }
        const onClick = () => checkHabit(index)
        return (
          <HabitListItem
            key={index}
            title={title}
            streak={streak}
            isNew={streak === 0}
            isChecked={false}
            onClick={onClick}
            viewStats={() => viewStats(title)}
          />
        )
      })}
      {habits.checked.map((habit, index) => {
        const { length } = habit.progress
        const { title, progress } = habit
        const { streak } = progress[length - 1]
        const onClick = () => uncheckHabit(index)
        return (
          <HabitListItem
            key={index}
            title={title}
            streak={streak}
            isNew={streak === 0}
            isChecked={true}
            onClick={onClick}
            viewStats={() => viewStats(title)}
          />
        )
      })}
    </HabitListContainer>
  )
}

HabitList.propTypes = {
  habits: PropTypes.object.isRequired,
  handleAddHabit: PropTypes.func.isRequired,
  checkHabit: PropTypes.func,
  uncheckHabit: PropTypes.func,
  onViewStats: PropTypes.func,
}

export default HabitList
