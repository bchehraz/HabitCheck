const getNewHabitMap = habits => {
  const { checked, unchecked } = habits
  let map = {}
  checked.forEach((habit, index) => {
    map[habit.title] = { index, isChecked: true }
  })

  unchecked.forEach((habit, index) => {
    map[habit.title] = { index, isChecked: false }
  })
  return map
}

export default getNewHabitMap
