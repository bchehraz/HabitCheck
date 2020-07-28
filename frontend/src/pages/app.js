import React, { useState, useEffect } from "react"
import { Router, Redirect } from "@reach/router"

import PrivateRoute from "components/PrivateRoute"
import TodayPage from "./TodayPage"
import SettingsPage from "./SettingsPage"
import JournalPage from "./JournalPage"
import LoginPage from "./LoginPage"
import { AuthProvider } from "context/auth-context"
import { isLoggedIn, onLoginSuccess } from "utils/auth"
import { handleHabitAction, addHabit } from "utils/HabitData"
import {
  handleToggleDarkMode,
  handleToggleXEffectView,
} from "utils/preferences"
import newHabitTitle from "utils/HabitData/newHabitTitle"
import { updateHabits } from "../utils/HabitData"

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

    if (token) {
      data.habits = updateHabits(data.habits)
    }

    return setLoginData({ token, userId, email, data, preferences })
  }, [token, userId, email, data, preferences])

  const { token, userId, email, data, preferences } = loginData

  return (
    <AuthProvider
      value={{
        token,
        userId,
        email,
        data,
        preferences,
        login: (token, userId, email, data, preferences) => {
          setLoginData({ token, userId, email, data, preferences })
          onLoginSuccess(
            token,
            userId,
            email,
            data,
            preferences
          )
        },
        logout: () => {
          setLoginData(initState)
        },
        addHabit: title => {
          const updatedHabits = addHabit(title)
          setLoginData({
            ...loginData,
            data: {
              ...loginData.data,
              habits: { ...updatedHabits },
            },
          })
        },
        checkHabit: habitTitle => {
          const updatedHabits = handleHabitAction(habitTitle)

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
        uncheckHabit: habitTitle => {
          const updatedHabits = handleHabitAction(habitTitle)

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
        changeHabitTitle: (title, newTitle) => {
          const update = newHabitTitle(title, newTitle)
          setLoginData({
            ...loginData,
            data: {
              ...loginData.data,
              habits: {
                ...update,
              },
            },
          })
        },
      }}
    >
      <Router>
        {token && <Redirect from="/app/login" to="/app" exact noThrow />}
        {token && <Redirect from="/app/sign-up" to="/app" exact noThrow />}
        <PrivateRoute path="/app" component={TodayPage} />
        <PrivateRoute path="/app/journal" component={JournalPage} />
        <PrivateRoute path="/app/settings" component={SettingsPage} />
        <LoginPage path="/app/login" />
        <LoginPage signUp path="/app/sign-up" />
      </Router>
    </AuthProvider>
  )
}

export default AppHome
