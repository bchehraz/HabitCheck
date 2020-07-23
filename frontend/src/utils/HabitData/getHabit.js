import { getHabits } from "../"

const getHabit = title => {
  const habits = getHabits()
  const { isChecked, index } = habits.map[title]

  const habit = isChecked ? habits.checked[index] : habits.unchecked[index]

  return { habit, isChecked }
}

export default getHabit
