import _ from "lodash"

const logBlue = (msg, arg = "") => {
  console.log("\x1b[44m%s\x1b[0m", msg, arg)
}

const getDateDiffInDays = (a, b) => {
  const utc1 = Date.UTC(
    a.getFullYear(),
    a.getMonth(),
    a.getDate(),
    a.getUTCHours()
  )
  const utc2 = Date.UTC(
    b.getFullYear(),
    b.getMonth(),
    b.getDate(),
    b.getUTCHours()
  )

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24))
}

const updateHabits = data => {
  let habits = _.cloneDeep(data.habits)
  let checked = []

  const today = new Date()
  console.log(
    "[Updating Habit] Last Update Stored (formatted to date): ",
    new Date(habits.lastUpdate)
  )

  if (habits.lastUpdate !== null) {
    const date = new Date(habits.lastUpdate)
    if (today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
      return habits
    }
  }

  habits.unchecked.map(habit => {
    if (habit.title === "Test Habit 453")
      logBlue("<TEST> UNCHECKED > ", habit.progress)
    if (habit.progress.length === 0) {
      //if the streak is 0, in other words
      return habit
    }

    const { length } = habit.progress
    const current = habit.progress[length - 1]
    const lastDate = new Date(current.date)
    const diffDays = getDateDiffInDays(lastDate, today)
    const streak = Math.abs(current.streak)

    if (diffDays - streak === 0) {
      if (habit.title === "Test Habit 453") return habit
    } else {
      //in the case where it is currently unchecked, a simple subtraction needs to be made
      logBlue("diffDays, streak, diffDays-streak")
      console.log(diffDays, streak, diffDays - streak)
      console.log("")
      let newStreak = diffDays - streak
      if (current.streak < 0) {
        current.streak -= newStreak
      } else {
        const missedDay = new Date(lastDate)
        missedDay.setDate(missedDay.getDate() + streak)
        habit.progress = [
          ...habit.progress,
          {
            date: Date.UTC(
              missedDay.getFullYear(),
              missedDay.getMonth(),
              missedDay.getDate(),
              missedDay.getUTCHours()
            ),
            streak: -newStreak,
          },
        ]
      }

      return habit
    }
  })

  habits.checked.map(habit => {
    const { length } = habit.progress
    const current = habit.progress[length - 1]
    const lastDate = new Date(current.date)
    const diffTime = Math.abs(today - lastDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const daysMissed = diffDays - current.streak

    if (daysMissed === -1) {
      // Case:
      // Checked it off today.
      checked.push(habit)
      return habit
    } else if (daysMissed >= 0) {
      // Case:
      // Checked it off yesterday
      if (daysMissed > 0) {
        //Case:
        // Has n missed days where n >= 1
        const missedDay = new Date(today)
        missedDay.setDate(missedDay.getDate() - daysMissed)
        habit.progress.push({
          date: Date.UTC(
            missedDay.getFullYear(),
            missedDay.getMonth(),
            missedDay.getDate(),
            missedDay.getUTCHours()
          ),
          streak: -(diffDays - current.streak),
        })
      }
      habits.unchecked.push(habit)
      return
    }
  })

  habits.checked = checked
  habits.lastUpdate = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getUTCHours()
  )
  return habits
}

export { updateHabits }
