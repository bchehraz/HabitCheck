import React from 'react';

const AuthContext = React.createContext({
  token: null,
  userId: null,
  email: null,
  tokenExpiration: null,
  data: {},
  // eslint-disable-next-line
  login: (token, userId, tokenExpiration, email, data) => {},
  logout: () => {},
  newHabit: (habit) => {},
});

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
