import { isBrowser, dateToUTC } from "../helpers"
import { getHabits, setHabits } from "./"

const updateHabitMap = unchecked => {
  let map = {}
  unchecked.forEach((habit, index) => {
    map[habit.title] = { index, isChecked: false }
  })

  return map
}

const addHabit = title => {
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

export default addHabit
