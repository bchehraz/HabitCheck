const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    password: String
    habits: HabitState!
    preferences: Preference!
  }

  type Preference {
    _id: ID!
    darkMode: Boolean!
    xEffectView: Boolean!
  }

  type HabitState {
    _id: ID!
    checked: [Habit!]
    unchecked: [Habit!]
  }

  type Habit {
    _id: ID!
    title: String!
    startDate: String!
    bestStreak: Int!
    bestStreakDate: String
    progress: [Streak!]
  }

  type Streak {
    _id: ID!
    streak: Int!
    date: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    email: String!
  }

  input UserInput {
    email: String!
    password: String!
  }

  input HabitStateInput {
    checked: [HabitInput!]
    unchecked: [HabitInput!]
  }

  input HabitInput {
    title: String!
    startDate: String!
    bestStreak: Int!
    bestStreakDate: String
    progress: [StreakInput!]
  }

  input StreakInput {
    streak: Int!
    date: String!
  }

  input PreferenceInput {
    darkMode: Boolean!
    xEffectView: Boolean!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    getPreferences: Preference!
    getHabits: HabitState!
  }

  type RootMutation {
    createUser(userInput: UserInput!): AuthData!
    addHabit(habitTitle: String!): Habit!
    saveHabits(habits: HabitStateInput!): HabitState!
    savePreferences(preferences: PreferenceInput!): Preference!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
