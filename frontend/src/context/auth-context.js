import React from "react"

/* eslint-disable */

const AuthContext = React.createContext({
  token: null,
  userId: null,
  email: null,
  tokenExpiration: null,
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
  login: (token, userId, tokenExpiration, email, data, preferences) => {},
  logout: () => {},
  newHabit: habit => {},
  checkHabit: (habitIndex, callback) => {},
  uncheckHabit: (habitIndex, callback) => {},
  toggleDarkMode: () => {},
  toggleXEffectView: () => {},
  changeHabitTitle: (title, newTitle) => {},
})

export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer
export default AuthContext
