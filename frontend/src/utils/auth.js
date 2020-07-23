import { isBrowser } from "./helpers"
import { data as _DATA } from "./static/data"
import { updateHabits } from "./HabitData"

/****
  Testing? Set testing to true. If you want to access saved values, set to false!
  However, if testing is set to false, do NOT log out otherwise you will lose your data.
****/

const testing = true

const getUser = () => {
  if (testing) {
    return window.localStorage.user ? JSON.parse(window.localStorage.user) : {}
  } else {
    return window.localStorage.savedUser
      ? JSON.parse(window.localStorage.savedUser)
      : {}
  }
}

const setUser = user => {
  if (!isBrowser) return
  if (testing) {
    window.localStorage.user = JSON.stringify(user)
  } else {
    window.localStorage.savedUser = JSON.stringify(user)
  }
}

const getUserData = () => {
  return getCurrentUser().data
}

export const setUserData = data => {
  setUser({ ...getCurrentUser(), data })
}

const wipeTestUserOnly = user => {
  if (!isBrowser) return
  window.localStorage.user = JSON.stringify(user)
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const { token, userId, email, data, preferences } = getUser()
  if (!token) {
    return false
  }
  //data.habits = updateHabits(data.habits)

  return {
    token,
    userId,
    email,
    data,
    preferences,
  }
}

export const onLoginSuccess = (
  token,
  userId,
  tokenExpiration,
  email,
  data,
  preferences
) => {
  return setUser({
    token,
    userId,
    tokenExpiration,
    email,
    data,
    preferences,
  })
}

export const getCurrentUser = () => isBrowser && getUser()

export const getCurrentUserData = () => isBrowser && getUserData()

export const logout = callback => {
  if (!isBrowser) return

  wipeTestUserOnly({
    token: null,
    data: {
      habits: {
        checked: [],
        unchecked: [],
      },
    },
    userId: null,
    tokenExpiration: null,
    email: null,
    preferences: {
      darkMode: false,
      xEffectView: false,
    },
  })
  callback()
}

export const login = () => {
  if (!isBrowser) return false

  const habits = updateHabits(_DATA.habits)

  return {
    token: "12345",
    userId: "12345",
    tokenExpiration: "1h",
    email: "email@test.com",
    data: {
      ..._DATA,
      habits,
    },
    preferences: {
      darkMode: false,
      xEffectView: false,
    },
  }
}

export const getUserPreferences = () => isBrowser && getUser().preferences

export const setUserPreferences = preferences => {
  if (!isBrowser) return
  setUser({ ...getCurrentUser(), preferences })
}
