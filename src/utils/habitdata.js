import { isBrowser } from "./helpers"
import { getUserData, setUserData } from "./auth"
import { updateHabits } from "./updateHabits"

export const handleCheckHabit = habitIndex => {
  if (!isBrowser) return

  if (!habitIndex && habitIndex !== 0) {
    console.log(
      `<Error> Invalid Habit Index passed into check habit function ${habitIndex}`
    )
    return
  }

  let data = getUserData()

  //get the habit we want to check off
  let habit = data.habits.unchecked[habitIndex]
  if (!habit) {
    console.log("<Error> Checking habit failed, Index: " + habitIndex)
    return false
  }

  let today = new Date()
  if (data.habits.lastUpdate !== null) {
    const date = new Date(data.habits.lastUpdate)
    if (today.setHours(0, 0, 0, 0) !== date.setHours(0, 0, 0, 0)) {
      return window.location.reload()
    }
  }

  let streak = 1
  if (habit.progress.length === 0) {
    // no progress exists, or streak is 0!
    habit = {
      ...habit,
      progress: [
        {
          date: today.toLocaleDateString(),
          streak,
        },
      ],
    }
  } else {
    const { length } = habit.progress
    let current = habit.progress[length - 1]
    let { progress } = habit

    if (current.streak < 0) {
      progress.push({
        date: today.toLocaleDateString(),
        streak,
      })
    } else if (current.streak > 0) {
      streak = current.streak + 1
      progress[length - 1] = {
        ...current,
        streak,
      }
    } else {
      console.log("<Error> handleCheckHabit discovered a streak of 0")
    }

    habit.progress = [...progress]
  }
  // Set a new Best Streak if this new streak surpasses the previous Best Streak
  if (streak > habit.bestStreak) {
    //set a value in the progress marking the current
    habit.bestStreak += 1
    habit.bestStreakDate = new Date().toLocaleDateString()
  }
  data.habits.unchecked.splice(habitIndex, 1)
  data.habits.checked = [habit, ...data.habits.checked]

  //update habit map
  let newMap = { ...data.habits.map }
  data.habits.checked.forEach((habit, index) => {
    newMap[habit.title] = { index, isChecked: true }
  })

  data.habits.unchecked.forEach((habit, index) => {
    newMap[habit.title] = { index, isChecked: false }
  })
  data.habits.map = { ...newMap }

  setUserData(data)
  // console.log("Checked Off > ")
  // console.log(data.habits)
  return data.habits
}

export const handleUncheckHabit = habitIndex => {
  // IF a value > 1, simply subtract and keep the date.
  // IF a value === 1, check for an older streak and set it to that.
  /// ---- If an older streak is NOT found, remove the progress.
  if (!isBrowser) return

  if (!habitIndex && habitIndex !== 0) {
    console.log(
      `<Error> Invalid Habit Index passed into check habit function ${habitIndex}`
    )
    return
  }

  let data = getUserData()
  let habit = data.habits.checked[habitIndex]

  if (!habit) {
    console.log("<Error> Unchecking habit failed, Index: " + habitIndex)
    return false
  }

  const today = new Date()
  if (data.habits.lastUpdate !== null) {
    const date = new Date(data.habits.lastUpdate)
    if (today.setHours(0, 0, 0, 0) !== date.setHours(0, 0, 0, 0)) {
      return window.location.reload()
    }
  }

  const { length } = habit.progress
  let current = habit.progress[length - 1]
  let { progress } = habit

  if (current.streak > 1) {
    progress[length - 1] = {
      ...current,
      streak: current.streak - 1,
    }
  } else if (current.streak === 1) {
    progress.pop()
  }

  // console.log("<Uncheck> Uncheck Function")
  // console.log("Current Streak" + current.streak)
  // console.log("Best Streak" + habit.bestStreak)
  if (current.streak === habit.bestStreak) {
    //check to see if the current streak IS the best streak value
    if (habit.bestStreakDate) {
      //only if the newBestStreak is checked, subtract 1 from the best streak as well.
      // if newBestStreak is not set, it means a previous streak had set this new streak.
      // This is unique to unchecking an item that is already checked
      if (today.toLocaleDateString() === habit.bestStreakDate) {
        habit.bestStreak -= 1
        // Since we are unchecking a current best streak,
        // set the bestStreakDate to yesterday...?

        // TODO: This has to be done in a cleaner way somehow if it's to be used as a useful data point to display to the user. It *could* be used to show the date the user reached this best streak. Really useful? Not really...
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)
        habit.bestStreakDate = yesterday
        // console.log(habit.bestStreakDate)
      }
    }
  }

  //lets say we have 2 streaks
  // you reach the first streak of 60
  // 1. Determine the new best streak value if you unchecked.
  // 2. Determine the best streak value if you were at 61 days then subtracted to 60

  habit.progress = [...progress]
  data.habits.checked.splice(habitIndex, 1)
  data.habits.unchecked.unshift(habit)

  //update habit map
  data.habits.map = { ...getNewHabitMap(data.habits) }

  setUserData(data)
  // console.log("Unchecked >")
  // console.log(data.habits)
  return data.habits
}

export const addHabit = title => {
  if (!isBrowser) return

  const newHabit = {
    title,
    startDate: new Date().toLocaleDateString(),
    progress: [],
    bestStreak: 0,
  }

  let data = getUserData()

  data.habits.unchecked = [newHabit, ...data.habits.unchecked]

  data.habits.map = {
    ...data.habits.map,
    ...updateHabitMap(data.habits.unchecked),
  }

  setUserData(data)

  return data.habits
}

const getNewHabitMap = habits => {
  const { checked, unchecked } = habits
  let newMap = {}
  checked.forEach((habit, index) => {
    newMap[habit.title] = { index, isChecked: true }
  })

  unchecked.forEach((habit, index) => {
    newMap[habit.title] = { index, isChecked: false }
  })
  return newMap
}

const updateHabitMap = unchecked => {
  let map = {}
  unchecked.forEach((habit, index) => {
    map[habit.title] = { index, isChecked: false }
  })

  return map
}
