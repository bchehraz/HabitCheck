import { getNewHabitMap, setHabits } from "./"
import { dateToUTC } from "../helpers"

const getDateDiffInDays = (a, b) => {
  a.setHours(0, 0, 0, 0)
  b.setHours(0, 0, 0, 0)
  return Math.floor((dateToUTC(b) - dateToUTC(a)) / (1000 * 60 * 60 * 24))
}

const updateHabits = habits => {
  const today = new Date()

  const date = new Date(habits.lastUpdate)
  if (today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
    return habits
  }

  /*
    Update Unchecked Habits Array

    Description: If an update is necessary, then it's assumed that unchecked habits
    will need to be moved to a negative streak
  */

  habits.unchecked.map(habit => {
    if (habit.progress.length === 0) {
      //if the streak is 0, in other words
      return habit
    }

    const { length } = habit.progress
    const current = habit.progress[length - 1]
    const diffDays = getDateDiffInDays(new Date(current.date), today)
    const streak = Math.abs(current.streak)

    if (diffDays - streak !== 0) {
      let newStreak = diffDays - streak
      if (current.streak < 0) {
        current.streak -= newStreak
      } else {
        const missedDay = new Date(current.date)
        missedDay.setDate(missedDay.getDate() + streak)
        habit.progress = [
          ...habit.progress,
          {
            date: dateToUTC(missedDay),
            streak: -newStreak,
          },
        ]
      }
    }
    return habit
  })

  /*
    Update Checked Habits Array

    Description: There is no case where a checked habit would stay checked after update
  */

  habits.checked.map(habit => {
    const { length } = habit.progress
    const current = habit.progress[length - 1]
    const diffDays = getDateDiffInDays(new Date(current.date), today)
    const daysMissed = diffDays - current.streak

    if (daysMissed >= 1) {
      const missedDay = new Date(today)
      missedDay.setDate(missedDay.getDate() - daysMissed)
      habit.progress.push({
        date: dateToUTC(missedDay),
        streak: -(diffDays - current.streak),
      })
    }
    habits.unchecked.push(habit)
    return habit
  })

  habits.lastUpdate = dateToUTC(today)
  habits.checked = []

  habits.map = getNewHabitMap(habits)

  setHabits(habits)

  //TODO: After update is complete, save data to backend

  return habits
}

export default updateHabits
