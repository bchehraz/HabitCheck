import { isBrowser } from "../helpers"
import {
  getHabits,
  setHabits,
  handleUncheckHabit,
  handleCheckHabit,
  getNewHabitMap,
  needsUpdate,
} from "./"

// Determine Habit Action based on Checked State in Habit Map
const handleHabitAction = habitTitle => {
  if (!isBrowser) return

  if (!habitTitle || habitTitle === "") {
    console.log("<Error> Invalid Habit Title Passed to handleHabitAction")
    return false
  }

  // getHabits returns all habit data under user.data.habits stored in Window
  // currently returns checked, unchecked, and map
  const habits = getHabits()
  const { isChecked, index } = habits.map[habitTitle]

  let today = new Date()
  if (needsUpdate(today, habits.lastUpdate)) {
    return false
  }

  // Determine what habit action must take place
  // depending on whether the habit is currently checked or unchecked
  if (isChecked) {
    //uncheck habit, return updated progress
    const habit = handleUncheckHabit(habits.checked[index])

    //Move habit from checked to unchecked
    habits.checked.splice(index, 1)
    habits.unchecked.unshift(habit)
  } else {
    //check habit, return updated progress
    const habit = handleCheckHabit(habits.unchecked[index])

    //Move habit from unchecked to checked
    habits.unchecked.splice(index, 1)
    habits.checked = [habit, ...habits.checked]
  }

  //update habit map after updating checked and unchecked habits
  habits.map = { ...getNewHabitMap(habits) }

  setHabits(habits)
  return habits
}

export default handleHabitAction
