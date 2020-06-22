const isBestStreak = (today, bestStreakDate) => {
  bestStreakDate = new Date(bestStreakDate)
  return today.setHours(0, 0, 0, 0) === bestStreakDate.setHours(0, 0, 0, 0)
}

const handleUncheckHabit = habit => {
  // IF a value > 1, simply subtract and keep the date.
  // IF a value === 1, check for an older streak and set it to that.
  /// ---- If an older streak is NOT found, remove the progress.
  const today = new Date()
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

  return habit
}

export default handleUncheckHabit
