import React, { useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router';

// import LayoutController from '../components/LayoutController';
import Login from '../components/Login';
import PrivateRoute from '../components/PrivateRoute';
import Status from '../components/Status';

// import App from '../components/App';
import Today from '../components/Today';
import HabitStats from '../components/HabitStats';
import Journal from '../components/Journal';
import { AuthProvider } from '../context/auth-context';
import { isLoggedIn, onLoginSuccess, addHabit } from '../utils/auth.js';

const initState = {
  token: null,
  userId: null,
  email: null,
  data: {
    habits: []
  },
}

const AppHome = () => {
  const [loginData, setLoginData] = useState(initState);

  useEffect(() => {
    const { token, userId, email, data } = isLoggedIn();
    return setLoginData({ token, userId, email, data });
  }, []);

  const { token, userId, email, data } = loginData;

  return (
      <AuthProvider value={{
        token,
        userId,
        email,
        data,
        login: (token, userId, tokenExpiration, email, data) => {
          setLoginData({ token, userId, email, data });
          onLoginSuccess(token, userId, tokenExpiration, email, data);
        },
        logout: () => {
          setLoginData(initState);
        },
        newHabit: (habit) => {
          setLoginData({ ...loginData, data: { ...data, habits: [ habit, ...data.habits ]}});
          addHabit(habit);
        }
      }}>
        <Status />
        <Router>
          {token && <Redirect from="/app/login" to="/app" exact noThrow />}
          <PrivateRoute path="/app" component={Today} />
          <PrivateRoute path="/app/stats" component={HabitStats} />
          <PrivateRoute path="/app/journal" component={Journal} />
          <Login path="/app/login" />
        </Router>
      </AuthProvider>
    )
}

export default AppHome;
