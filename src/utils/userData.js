import { isBrowser } from './helpers';

const getUserData = () => {
 return window.localStorage.userData
    ? JSON.parse(window.localStorage.userData)
    : {};
}

const setUserData = userData => {
  if (!isBrowser) return;
  window.localStorage.userData = JSON.stringify(userData);
}

export const hasUserData = () => {
  if (!isBrowser) return false;

  const { token } = getUserData();
  if (!token) {
    return false;
  }
  return { token };
}

/*export const onLoginSuccess = (token) => {
  return setToken({
    token
  });
}

export const logout = callback => {
  if (!isBrowser) return;

  setUserData({});
  callback();
}

export const login = () => {
  if (!isBrowser) return false;

  return { token: "12345" };
}*/
