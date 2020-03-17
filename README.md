# HabitCheck App (PWA)

[![codecov](https://codecov.io/gh/bchehraz/HabitCheck/branch/master/graph/badge.svg?token=E4fl4A6gli)](https://codecov.io/gh/bchehraz/HabitCheck)

[![CircleCI](https://circleci.com/gh/bchehraz/HabitCheck.svg?style=svg&circle-token=fb833bb6decbfff142aaac6cbf0e200dcecaf4cd)](https://circleci.com/gh/bchehraz/HabitCheck)

# Documentation

## Table of Contents

1. [Habit Data Structure](#habitdatastructure)

## Habit Data Structure

The project uses React Context to manage authentication and habit data in the app.

`src/context/auth-context.js`

```
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
  login: (
    token,
    userId,
    tokenExpiration,
    email,
    data,
    preferences
  ) => {},
  logout: () => {},
  newHabit: habit => {},
  checkHabit: (habitIndex, callback) => {},
  uncheckHabit: (habitIndex, callback) => {},
  toggleDarkMode: () => {},
  toggleXEffectView: () => {},
```

Habit data is structured like so:

```
data: {
  habits: {
    unchecked: [
      {
        title: "Sample Unchecked Habit",
        startDate: Date.UTC(...),
        bestStreak: 0,
        progress: [],
      },
    ],
    checked: [
      {
        title: "Sample Checked Habit",
        startDate: Date.UTC(...),
        bestStreak: 1,
        bestStreakDate: Date.UTC(...),
        progress: [
          {
            date: Date.UTC(...),
            streak: 1,
          },
        ],
      },
    ]
  }
}
```

The progress array holds a streak and date value for the streak's beginning date.

For example, in the case where a habit was checked off on the first day, then goes on a -7 day streak, then checks off again, this is what it would look like (starting on December 1st 2019):

```
progress: [
  { date: Date.UTC(2019, 11, 1, UTC_HOUR), streak: 1 },
  { date: Date.UTC(2019, 11, 2, UTC_HOUR), streak: -7 },
  { date: Date.UTC(2019, 11, 9, UTC_HOUR), streak: 1 },
],
```

_Note: The `UTC_HOUR` is indicating that a Date.getUTCHours() must be passed into the Date.UTC to get the correct date for the client._

In the case above, the user checks off the habit on December 1st, then fails to check it off for the next 7 days. The second entry in `progress` has the date December 2nd, even though it won't be until December 3rd where the app detects a missed day. Each day the streak continues, we simply increment or decrement the value. Whenever a streak is going from postiive to negative or vice versa, a new array entry is made into `progress` for the given habit with a corresponding date.

## More Documentation Coming Soon
