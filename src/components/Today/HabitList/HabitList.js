import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { AddHabitButton, ListItemController } from "./"

const HabitListContainer = styled.div`
  width: 100%;
  transition: all 300ms ease-out;
  display: grid;
  grid-template-columns: calc(100vw - 30px);
  row-gap: 15px;

  @media only screen and (min-width: 768px) {
    display: grid;

    grid-template-columns: repeat(2, calc(50vw - 40px));

    gap: 30px;

    justify-items: stretch;
    align-items: center;
    justify-content: center;

    grid-template-columns: repeat(auto-fit, 1fr);
    width: 100%;
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, calc(33vw - 40px));

    grid-template-columns: repeat(auto-fit, 1fr);
    width: 100%;
  }

  @media only screen and (min-width: 1440px) {
    grid-template-columns: repeat(4, calc(25vw - 40px));

    grid-template-columns: repeat(auto-fit, 1fr);
    width: 100%;
  }

  @media only screen and (min-width: 1920px) {
    grid-template-columns: repeat(5, calc(20vw - 40px));
    grid-template-columns: repeat(auto-fit, 1fr);
  }
`

const HabitList = ({
  habits,
  handleAddHabit,
  checkHabit,
  uncheckHabit,
  onViewStats,
}) => {
  const [hasNew, setHasNew] = useState(false)

  const viewStats = title => {
    onViewStats(title)
  }

  const toggleAnimate = () => {
    setHasNew(!hasNew)
  }

  return (
    <HabitListContainer className="habitList">
      <AddHabitButton
        handleAddHabit={handleAddHabit}
        onNewHabitAdded={() => toggleAnimate()}
      />
      {habits.unchecked.map((habit, index) => {
        const { title } = habit
        let streak = 0
        if (habit.progress.length !== 0) {
          const { length } = habit.progress
          streak = habit.progress[length - 1].streak
        }
        return (
          <ListItemController
            key={index}
            title={title}
            streak={streak}
            isNew={streak === 0}
            isChecked={false}
            onClick={() => checkHabit(title)}
            viewStats={() => viewStats(title)}
            justAdded={index === 0 && hasNew}
            toggleAnimate={() => toggleAnimate()}
          />
        )
      })}
      {habits.checked.map((habit, index) => {
        const { length } = habit.progress
        const { title, progress } = habit
        const { streak } = progress[length - 1]
        return (
          <ListItemController
            key={index}
            title={title}
            streak={streak}
            isNew={streak === 0}
            isChecked={true}
            onClick={() => uncheckHabit(title)}
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
