import { getUserData, setUserData } from "../auth"

const updateHabitMap = (map, oldKey, newKey) => {
  const prev = { ...map[oldKey] }
  delete map[oldKey]
  map[newKey] = { ...prev }
  return map
}

const newHabitTitle = (title, newTitle) => {
  const data = getUserData()
  const { habits } = data

  const { index, isChecked } = habits.map[title]
  if (isChecked) {
    habits.checked[index] = { ...habits.checked[index], title: newTitle }
  } else {
    habits.unchecked[index] = { ...habits.unchecked[index], title: newTitle }
  }

  habits.map = { ...updateHabitMap(habits.map, title, newTitle) }

  setUserData({ ...data, habits: { ...habits } })
  console.log("Updated:", habits)

  return { ...habits }
}

export default newHabitTitle
