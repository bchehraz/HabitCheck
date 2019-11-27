import { isBrowser } from './helpers';

const getUser = () =>
  window.localStorage.user
    ? JSON.parse(window.localStorage.user)
    : {};

const setUser = user => {
  if (!isBrowser) return;
  window.localStorage.user = JSON.stringify(user);
}

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const { token, userId, email, data } = getUser();
  if (!token) {
    return false;
  }
  return { token, userId, email, data };
}

export const onLoginSuccess = (token, userId, tokenExpiration, email, data) => {
  return setUser({
    token,
    userId,
    tokenExpiration,
    email,
    data
  });
}

export const getCurrentUser = () => isBrowser && getUser();

export const logout = callback => {
  if (!isBrowser) return;

  setUser({
    token: null,
    data: { habits: [] },
    userId: null,
    tokenExpiration: null,
    email: null,
  });
  callback();
}

export const login = () => {
  if (!isBrowser) return false;

  return {
    token: "12345",
    userId: "12345",
    tokenExpiration: "1h",
    email: "email@test.com",
    data: {
      habits: [
        { title: 'Work on HabitCheck', streak: 0, isNew: true, isChecked: false },
        { title: 'Quit Smoking', streak: 40, isNew: false, isChecked: false },
        { title: 'Meditate', streak: -3, isNew: false, isChecked: false },
        { title: 'Sleep on time', streak: -1, isNew: false, isChecked: false },
        { title: '90 min Yoga', streak: 0, isNew: true, isChecked: true },
        { title: 'Push Ups', streak: 0, isNew: false, isChecked: true },
        { title: '30 min walk', streak: 0, isNew: false, isChecked: true },
        { title: 'Keto Diet', streak: 3, isNew: false, isChecked: true },
      ]
    }
  };
}

export const addHabit = (newHabit) => {
  if (!isBrowser) return false;

  console.log("New Habit Data: " + newHabit);
  let currentUser = getUser();
  let { data } = currentUser;
  let { habits } = data;
  habits = [ newHabit, ...habits ];

  data = { ...data, habits };
  currentUser = { ...currentUser, data };

  setUser(currentUser);
}
