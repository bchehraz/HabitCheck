import { dateToUTC } from "../helpers"

const handleCheckHabit = habit => {
  let today = new Date()
  let { progress } = habit
  const { length } = progress

  let currentStreak = length !== 0 ? progress[length - 1].streak : 0

  if (currentStreak > 0) {
    // If on a positive streak
    // first check if there's a new 'best streak'
    let { bestStreak, bestStreakDate } = habit
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

  return habit
}

export default handleCheckHabit
