const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const HabitState = require('../../models/habitstate')
const Habit = require('../../models/habit')
const { dateToUTC } = require('../../helpers/date')
const { transformHabitState } = require('./merge')

module.exports = {
  getHabits: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated!")
    }

    try {
      const user = await User.findById(req.userId)

      if (!user) {
        throw new Error("Can't find a user by that ID.")
      }

      const habitState = await HabitState.findById(user.habits)
      return transformHabitState(habitState)
    } catch (err) {
      throw err
    }
  },
  addHabit: async ({ habitTitle }, req) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated!")
    }

    const utcDate = dateToUTC(new Date())
    const habit = new Habit({
      title: habitTitle,
      startDate: utcDate + "",
      bestStreak: 0,
      progress: [],
    })

    try {
      const user = await User.findById(req.userId)

      if (!user) {
        throw new Error("Can't find a user by that ID.")
      }

      await habit.save()

      const habitState = await HabitState.findById(user.habits)
      habitState.unchecked = [ habit, ...habitState.unchecked ]
      await habitState.save()

      return { 
        title: habit.title,
        startDate: habit.startDate,
        bestStreak: habit.bestStreak,
        bestStreakDate: habit.bestStreakDate,
        progress: habit.progress,
      }
    } catch (err) {
      throw err
    }
  },
  saveHabits: async ({ habits }, req) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated!")
    }

    // Data that can change here:

    // checked
    // unchecked 
    // progress for each habit

    // Possible Solutions
    // Create new objects, delete old ones?
    // OR 
    // Fetch current objects to get their ID, then ??
    // as in
    // Using Habit object IDs, manipulate the data!

    try {
      const user = await User.findById(req.userId)

      if (!user) {
        throw new Error("Can't find a user by that ID")
      }

      //onst habitState = await HabitState.findById(user.habits)
      return transformHabitState(habitState)
    } catch (err) {
      throw err
    }
  },
}
