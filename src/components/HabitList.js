import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HabitListItem from './HabitListItem';
import AddHabitButton from './AddHabitButton';

const HabitListContainer = styled.div`
  width: 100%;
`;

const HabitList = ({ habits, handleAddHabit }) => (
  <HabitListContainer>
    <AddHabitButton handleAddHabit={handleAddHabit} />
    {habits.map((habit, index) => {
      return (
        <HabitListItem
          key={index}
          title={habit.title}
          streak={habit.streak}
          isNew={habit.isNew}
          isChecked={habit.isChecked}
          onClick={() => {
            console.log(`Clicked on Habit: <${habit.title}>`)
          }}
        />
      );
    })}
  </HabitListContainer>
);

HabitList.propTypes = {
  habits: PropTypes.array.isRequired,
  handleAddHabit: PropTypes.func.isRequired,
}

export default HabitList;
