import React from 'react';
import PropTypes from 'prop-types';

import AppLayout from './AppLayout';
import HabitList from './HabitList';
import { AuthConsumer } from '../context/auth-context';

const Today = ({ path }) => (
  <AuthConsumer>
    {context => (
      <AppLayout path={path}>
        <HabitList
          habits={context.data.habits}
          handleAddHabit={(habitTitle) => {
            const newHabit = {
              title: habitTitle,
              streak: 0,
              isNew: true,
              isChecked: false,
              startDate: new Date(),
            }
            context.newHabit(newHabit);
          }}
        />
      </AppLayout>
    )}

  </AuthConsumer>
);

Today.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Today;
