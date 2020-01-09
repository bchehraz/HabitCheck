import { isBrowser } from './helpers';
import { data as data } from './data';
import { updateHabits } from './updateHabits';

/****
  Testing? Set testing to true. If you want to access saved values, set to false!
  However, if testing is set to false, do NOT log out otherwise you will lose your data.
****/

const testing = true;

const getUser = () => {
  if (testing) {
    return window.localStorage.user ? JSON.parse(window.localStorage.user) : {};
  } else {
    return window.localStorage.savedUser ? JSON.parse(window.localStorage.savedUser) : {};
  }
}

const setUser = user => {
  if (!isBrowser) return;
  if (testing) {
    window.localStorage.user = JSON.stringify(user);
  } else {
    window.localStorage.savedUser = JSON.stringify(user);
  }
}

const wipeTestUserOnly = user => {
  if (!isBrowser) return;
  window.localStorage.user = JSON.stringify(user);
}

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const { token, userId, email, data, preferences } = getUser();
  if (!token) {
    return false;
  }
  const habits = updateHabits(data);

  let map = {};
  habits.checked.forEach((habit, index) => {
    map[habit.title] = { index, isChecked: true };
  });

  habits.unchecked.forEach((habit, index) => {
    map[habit.title] = { index, isChecked: false };
  });
  habits.map = { ...map };

  const userData = {
    ...data,
    habits
  }
  if (habits) {
    setUserData(userData)
  }
  return {
    token, userId, email, data: userData, preferences
  };
}

export const onLoginSuccess = (token, userId, tokenExpiration, email, data, preferences) => {
  return setUser({
    token,
    userId,
    tokenExpiration,
    email,
    data,
    preferences,
  });
}

export const getCurrentUser = () => isBrowser && getUser();

export const getUserData = () => {
  if (!isBrowser) return;
  return getUser().data;
}

export const setUserData = data => {
  if (!isBrowser) return;
  setUser({ ...getCurrentUser(), data });
}

export const logout = callback => {
  if (!isBrowser) return;

  wipeTestUserOnly({
    token: null,
    data: { habits: {
      checked: [],
      unchecked: [],
    } },
    userId: null,
    tokenExpiration: null,
    email: null,
    preferences: {
      darkMode: false,
      xEffectView: false,
    }
  });
  callback();
}

export const login = () => {
  if (!isBrowser) return false;

  const habits = updateHabits(data);
  let map = {};
  habits.checked.forEach((habit, index) => {
    map[habit.title] = { index, isChecked: true };
  });

  habits.unchecked.forEach((habit, index) => {
    map[habit.title] = { index, isChecked: false };
  });
  habits.map = { ...map };
  return {
    token: "12345",
    userId: "12345",
    tokenExpiration: "1h",
    email: "email@test.com",
    data: {
      ...data,
      habits
    },
    preferences: {
      darkMode: false,
      xEffectView: false,
    }
  };
}

export const getUserPreferences = () => {
  if (!isBrowser) return;
  return getUser().preferences;
}

export const setUserPreferences = (preferences) => {
  if (!isBrowser) return;
  setUser({ ...getCurrentUser(), preferences });
}
