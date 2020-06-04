import { isBrowser } from "./helpers"
import { getHabits, setHabits } from "./auth"

const isValidIndex = index => {
  if (!index && index !== 0) {
    console.log(`<Error> Cannot perform habit action at index ${index}`)
    return false
  }
  return true
}

const dateToUTC = date => {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getUTCHours()
  )
}

const checkForUpdate = (today, lastUpdate) => {
  const date = new Date(lastUpdate)
  if (today.setHours(0, 0, 0, 0) !== date.setHours(0, 0, 0, 0)) {
    window.location.reload()
    return true
  }
  return false
}

const isBestStreak = (today, bestStreakDate) => {
  bestStreakDate = new Date(bestStreakDate)
  return today.setHours(0, 0, 0, 0) === bestStreakDate.setHours(0, 0, 0, 0)
}

export const handleCheckHabit = habitIndex => {
  if (!isBrowser) return

  if (!isValidIndex(habitIndex)) {
    return false
  }

  //let data = getUserData()
  let habits = getHabits()

  //get the habit we want to check off
  let habit = habits.unchecked[habitIndex]
  if (!habit) {
    console.log("<Error> Checking habit failed, Index: " + habitIndex)
    return false
  }

  // Catch the case where the user attempts to check a habit,
  // where the habits have yet to be updated
  let today = new Date()
  if (checkForUpdate(today, habits.lastUpdate)) {
    return false
  }

  /**** NEW ****/
  let { progress } = habit
  const { length } = progress

  let currentStreak = length !== 0 ? progress[length - 1].streak : 0

  console.log("<Check Habit Action>")
  console.log("Current Streak Value", currentStreak)

  if (currentStreak > 0) {
    // If on a positive streak
    // first check if there's a new 'best streak'
    let { bestStreak, bestStreakDate } = habit
    console.log("Best Streak", bestStreak)
    console.log("Best Streak Date", bestStreakDate)
    if (habit.bestStreak === currentStreak) {
      bestStreak++
      bestStreakDate = dateToUTC(today)
    }

    // update habits with new streak and bestStreak values
    progress[length - 1].streak++
    habit = {
      ...habit,
      bestStreak,
      bestStreakDate,
      lastBestStreakDate: habit.bestStreakDate,
      progress: [...progress],
    }
  } else {
    // If on a negative streak or there is no progress yet
    const utcNow = dateToUTC(today)

    if (length === 0) {
      //in the case where there's no progress yet...
      habit.bestStreak = 1
      habit.bestStreakDate = utcNow
    }

    habit = {
      ...habit,
      progress: [
        ...progress,
        {
          date: utcNow,
          streak: 1,
        },
      ],
    }
  }

  //Since we're checking off a habit, remove the item from unchecked
  // and add it to checked habits
  habits.unchecked.splice(habitIndex, 1)
  habits.checked = [habit, ...habits.checked]

  //update habit map
  habits.map = { ...getNewHabitMap(habits) }

  setHabits(habits)

  console.log("Checked a habit:", habit)
  return habits
}

export const handleUncheckHabit = habitIndex => {
  // IF a value > 1, simply subtract and keep the date.
  // IF a value === 1, check for an older streak and set it to that.
  /// ---- If an older streak is NOT found, remove the progress.
  if (!isBrowser) return

  if (!isValidIndex(habitIndex)) {
    return false
  }

  let habits = getHabits()
  let habit = habits.checked[habitIndex]

  if (!habit) {
    console.log("<Error> Unchecking habit failed, Index: " + habitIndex)
    return false
  }

  const today = new Date()
  // reload page if habits have yet to be auto-updated
  if (checkForUpdate(today, habits.lastUpdate)) {
    return false
  }

  let { progress, bestStreak, bestStreakDate, lastBestStreakDate } = habit
  const { length } = progress
  let currentStreak = progress[length - 1].streak

  if (bestStreak === currentStreak && isBestStreak(today, bestStreakDate)) {
    bestStreak--
    bestStreakDate = lastBestStreakDate
  }

  if (currentStreak === 1) {
    progress.pop()
  } else if (currentStreak > 1) {
    progress[length - 1].streak--
  }

  habit = {
    ...habit,
    bestStreak,
    bestStreakDate,
    progress: [...progress],
  }

  habits.checked.splice(habitIndex, 1)
  habits.unchecked.unshift(habit)

  //update habit map
  habits.map = { ...getNewHabitMap(habits) }

  setHabits(habits)

  console.log("Unchecking Habit", habit)
  return habits
}

export const addHabit = title => {
  if (!isBrowser) return

  const newHabit = {
    title,
    startDate: dateToUTC(new Date()),
    progress: [],
    bestStreak: 0,
  }

  let habits = getHabits()

  habits.unchecked = [newHabit, ...habits.unchecked]

  habits.map = {
    ...habits.map,
    ...updateHabitMap(habits.unchecked),
  }

  setHabits(habits)

  return habits
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
