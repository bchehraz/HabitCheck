import { isBrowser, isResponseOk } from "./helpers"

const getUser = () => {
  if (window.localStorage.loginState) {
    const loginState = JSON.parse(window.localStorage.loginState)
    if (loginState.userId) {
      return JSON.parse(window.localStorage.getItem(loginState.userId))
    }
  }
  return {}
}

const setUser = user => {
  if (!isBrowser) return
  // Temporarily for the purpose of submitting this project on time for Chingu,
  // instead of fetching habit data based on userId from server upon login,
  // we will store user data into localStorage based on userId
  // separated from the token so that logging out doesn't affect the user data
  if (!user.userId) {
    window.localStorage.setItem("loginState", JSON.stringify({}))
    return;
  }
  window.localStorage.setItem("loginState", JSON.stringify({ userId: user.userId, token: user.token, email: user.email }))
  window.localStorage.setItem(user.userId, JSON.stringify(user))
}

export const getUserData = () => {
  return getCurrentUser().data
}

//for testing, wipe local storage completely for given userId
// eslint-disable-next-line
const wipeUserData = (userId) => {
  window.localStorage.setItem(userId, JSON.stringify({}))
  window.localStorage.setItem("loginState", JSON.stringify({}))
} 

const getHabitData = (userId) => {
  const user = JSON.parse(window.localStorage.getItem(userId))
  if (!user) {
    return { checked: [], unchecked: [] };
  }
  return user.data.habits
}

export const setUserData = data => {
  setUser({ ...getCurrentUser(), data })
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const { token, userId, email, data, preferences } = getUser()

  if (!token) {
    return false
  }

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
  email,
  data,
  preferences
) => {
  return setUser({
    token,
    userId,
    email,
    data,
    preferences,
  })
}

export const getCurrentUser = () => isBrowser && getUser()

export const getCurrentUserData = () => isBrowser && getUserData()

export const logout = callback => {
  if (!isBrowser) return

  setUser({})
  callback()
}

const callAuthAPI = async (requestBody) => {
  return await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export const login = async (email, password) => {
  if (!isBrowser) return false

  const requestBody = {
    query: `
      query Login($email: String!, $password: String!) {
        login(
          email: $email,
          password: $password
        ) {
          userId
          token
        }
      }
    `,
    variables: {
      email, password
    }
  }

  try {
    const response = await callAuthAPI(requestBody)

    if (!isResponseOk(response)) {
      throw new Error("Login failed!")
    }

    const { data } = await response.json()

    if (!data.login) {
      return false
    }

    /* Wipe given user's data for testing */
    // wipeUserData(data.login.userId)
    // return;

    /* temporary fix to fetch data from client until backend is fully completed */
    const habits = getHabitData(data.login.userId)

    data.login = {
      ...data.login,
      email,
      data: {
        habits
      },
      preferences: {
        darkMode: false,
        xEffectView: false
      },
    }

    return data.login
  } catch (err) {
    console.log(err)
    return false;
  }
}

export const createUser = async (email, password) => {
  const requestBody = {
    query: `
      mutation CreateAccount($email: String!, $password: String!) {
        createUser(userInput: {
          email: $email,
          password: $password
        }) {
          userId
          token
        }
      }
    `,
    variables: {
      email, password
    }
  };

  try {
    const response = await callAuthAPI(requestBody);

    if (!isResponseOk(response)) {
      throw new Error("Sign up failed!");
    }

    const { data } = await response.json();

    if (!data.createUser) {
      return false;
    }

    data.createUser = {
      ...data.createUser,
      data: {
        habits: {
          checked: [],
          unchecked: [],
        },
      },
      preferences: {
        darkMode: false,
        xEffectView: false,
      }
    }

    return data.createUser;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const getUserPreferences = () => isBrowser && getUser().preferences

export const setUserPreferences = preferences => {
  if (!isBrowser) return
  setUser({ ...getCurrentUser(), preferences })
}
