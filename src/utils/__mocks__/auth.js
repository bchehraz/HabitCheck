import { isBrowser } from "../helpers"
import { data } from "../static/data"

export const setUserPreferences = () => {
  return "test_1"
}

export const getUserPreferences = () => {
  return "test_2"
}

let _DATA = {
  token: "12345",
  userId: "12345",
  tokenExpiration: "1h",
  email: "email@test.com",
  data: {
    habits: {
      ...data.habits,
      map: {
        TEST_DATA_1: { index: 1, isChecked: false },
      },
    },
  },
  preferences: {
    darkMode: false,
    xEffectView: false,
  },
}

const getUser = () => {
  return _DATA
}

const setUser = user => {
  let _DATA = { ...user }
}

export const getCurrentUser = () => isBrowser && getUser()

export const getUserData = () => {
  return getCurrentUser().data
}

export const setUserData = data => {
  setUser({ ...getCurrentUser(), data })
}
