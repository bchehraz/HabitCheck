import _ from "lodash"

const logBlue = msg => {
  console.log("\x1b[44m%s\x1b[0m", msg)
}

const updateHabits = data => {
  let habits = _.cloneDeep(data.habits)
  let checked = []
  console.log("<Updating Habits>")

  let today = new Date()
  //today = new Date("12/23/2019");

  if (habits.lastUpdate !== null) {
    const date = new Date(habits.lastUpdate)
    if (today.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0)) {
      console.log("<Update> Habits have already been updated")
      return habits
    }
  }

  habits.unchecked.map(habit => {
    if (habit.progress.length === 0) {
      //if the streak is 0, in other words
      return habit
    }

    const { length } = habit.progress
    const current = habit.progress[length - 1]
    const lastDate = new Date(current.date)
    const diffTime = Math.abs(today - lastDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // dateDiff since yesterday
    //TODO: fix a bug where diffDays isn't correctly calculated for ALL situations
    const streak = Math.abs(current.streak)

    // logBlue(`<Unchecked> ${habit.title}, ${current.date}`)
    // console.log(`Day Difference: ${diffDays}`);
    // console.log(`Streak: ${current.streak}`);

    if (diffDays - streak === 0) {
      // console.log("Diffdays - streak = 0");
      return habit
    } else {
      //in the case where it is currently unchecked, a simple subtraction needs to be made
      let newStreak = diffDays - streak
      if (current.streak < 0) {
        current.streak -= newStreak
      } else {
        //if we're to set a new negative streak,
        //store the day BEFORE today
        const missedDay = new Date(today)
        newStreak -= 1
        missedDay.setDate(missedDay.getDate() - newStreak)

        habit.progress = [
          ...habit.progress,
          {
            date: missedDay.toLocaleDateString(),
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

    // logBlue(`<Checked> ${habit.title}, ${current.date}`)
    // console.log(`Day Difference: ${diffDays}`);
    // console.log(`Streak: ${current.streak}`);
    // console.log(`Days Missed: ${daysMissed}`);

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
          date: missedDay.toLocaleDateString(),
          streak: -(diffDays - current.streak),
        })
      }
      habits.unchecked.push(habit)
      return
    }
  })

  habits.checked = checked
  habits.lastUpdate = new Date(today).toLocaleDateString()
  // console.log("SET LAST UPDATE: " + habits.lastUpdate);
  // console.log(habits);
  // console.log("</Updating Habits>");
  return habits
}

export { updateHabits }
