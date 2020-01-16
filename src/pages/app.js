import React, { useState, useEffect } from "react"
import { Router, Redirect } from "@reach/router"

// import LayoutController from '../components/LayoutController';
import Login from "components/Login"
import PrivateRoute from "components/PrivateRoute"
import Status from "components/Status"

// import App from '../components/App';
import Today from "components/Today"
import HabitStats from "components/HabitStats"
import Journal from "components/Journal"
import { AuthProvider } from "context/auth-context"
import { isLoggedIn, onLoginSuccess } from "utils/auth"
import { handleCheckHabit, handleUncheckHabit, addHabit } from "utils/habitdata"
import {
  handleToggleDarkMode,
  handleToggleXEffectView,
} from "utils/preferences"

const initState = {
  token: null,
  userId: null,
  email: null,
  data: {
    habits: {
      lastUpdate: null,
      checked: [],
      unchecked: [],
      map: [],
    },
  },
  preferences: {
    darkMode: false,
    xEffectView: false,
    selected: 0,
  },
}

const AppHome = () => {
  const [loginData, setLoginData] = useState(initState)

  useEffect(() => {
    const { token, userId, email, data, preferences } = isLoggedIn()

    return setLoginData({ token, userId, email, data, preferences })
  }, [])

  const { token, userId, email, data, preferences } = loginData

  return (
    <AuthProvider
      value={{
        token,
        userId,
        email,
        data,
        preferences,
        login: (token, userId, tokenExpiration, email, data, preferences) => {
          setLoginData({ token, userId, email, data, preferences })
          onLoginSuccess(
            token,
            userId,
            tokenExpiration,
            email,
            data,
            preferences
          )
        },
        logout: () => {
          setLoginData(initState)
        },
        newHabit: title => {
          const updatedHabits = addHabit(title)
          setLoginData({
            ...loginData,
            data: {
              ...loginData.data,
              habits: { ...updatedHabits },
            },
          })
        },
        checkHabit: habitIndex => {
          const updatedHabits = handleCheckHabit(habitIndex)
          if (!updatedHabits) {
            return
          }

          setLoginData({
            ...loginData,
            data: {
              ...loginData.data,
              habits: { ...updatedHabits },
            },
          })
        },
        uncheckHabit: habitIndex => {
          const updatedHabits = handleUncheckHabit(habitIndex)

          if (!updatedHabits) {
            return
          }

          setLoginData({
            ...loginData,
            data: {
              ...loginData.data,
              habits: { ...updatedHabits },
            },
          })
        },
        toggleDarkMode: () => {
          const preferences = handleToggleDarkMode()

          setLoginData({
            ...loginData,
            preferences,
          })
        },
        toggleXEffectView: () => {
          const preferences = handleToggleXEffectView()
          setLoginData({
            ...loginData,
            preferences,
          })
        },
        setSelectedHabit: selected => {
          setLoginData({
            ...loginData,
            preferences: { ...loginData.preferences, selected: selected },
          })
        },
      }}
    >
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

export default AppHome
