let dates = [
  new Date("12/02/2019"),
  new Date("12/02/2019"),
  new Date("10/25/2019"),
  new Date("11/28/2019"),
  new Date("11/29/2019"),
  new Date("12/01/2019"),
  new Date("12/01/2019"),
  new Date("12/01/2019"),
  new Date("12/01/2019"),
]

let utcStartDate = []
for (let i = 0; i < dates.length; i++) {
  utcStartDate.push(
    Date.UTC(
      dates[i].getFullYear(),
      dates[i].getMonth(),
      dates[i].getDate(),
      dates[i].getUTCHours()
    )
  )
}
let hour = new Date("2/2/2020").getUTCHours()
// Date.UTC(2020, 11, 2, hour)

export const data = {
  habits: {
    unchecked: [
      {
        title: "Work on HabitCheck",
        startDate: Date.UTC(2019, 11, 2, hour),
        bestStreak: 0,
        progress: [],
      },
      {
        title: "TEST_DATA_1",
        startDate: Date.UTC(2019, 11, 2, hour),
        bestStreak: 0,
        progress: [{ date: Date.UTC(2020, 1, 6, hour), streak: 24 }],
      },
      {
        title: "Quit Smoking",
        startDate: Date.UTC(2019, 9, 25, hour),
        bestStreak: 40,
        bestStreakDate: Date.UTC(2019, 11, 3, hour),
        progress: [
          {
            date: Date.UTC(2019, 9, 25, hour),
            streak: 40,
          },
          //{ date: "12/4/2019", streak: -1 }
        ],
      },
      {
        title: "Meditate",
        startDate: Date.UTC(2019, 10, 28, hour),
        bestStreak: 1,
        bestStreakDate: Date.UTC(2019, 10, 28, hour),
        progress: [
          { date: Date.UTC(2019, 10, 28, hour), streak: 1 },
          { date: Date.UTC(2019, 10, 29, hour), streak: -3 },
        ],
      },
      {
        title: "Sleep on time",
        startDate: Date.UTC(2019, 10, 29, hour),
        bestStreak: 1,
        bestStreakDate: Date.UTC(2019, 10, 30, hour),
        progress: [
          { date: Date.UTC(2019, 10, 30, hour), streak: 1 },
          { date: Date.UTC(2019, 11, 1, hour), streak: -1 },
        ],
      },
    ],
    checked: [
      {
        title: "90 min Yoga",
        startDate: Date.UTC(2019, 11, 1, hour),
        bestStreak: 1,
        bestStreakDate: Date.UTC(2019, 11, 1, hour),
        progress: [
          {
            date: Date.UTC(2019, 11, 1, hour),
            streak: 1,
          },
        ],
      },
      {
        title: "Push Ups",
        startDate: Date.UTC(2019, 11, 1, hour),
        bestStreak: 1,
        bestStreakDate: Date.UTC(2019, 11, 1, hour),
        progress: [
          {
            date: Date.UTC(2019, 11, 1, hour),
            streak: 1,
          },
        ],
      },
      {
        title: "30 min walk",
        startDate: Date.UTC(2019, 11, 1, hour),
        bestStreak: 1,
        bestStreakDate: Date.UTC(2019, 11, 1, hour),
        progress: [
          {
            date: Date.UTC(2019, 11, 1, hour),
            streak: 1,
          },
        ],
      },
      {
        title: "Keto Diet",
        startDate: Date.UTC(2019, 11, 1, hour),
        bestStreak: 3,
        bestStreakDate: Date.UTC(2019, 11, 3, hour),
        progress: [
          {
            date: Date.UTC(2019, 11, 1, hour),
            streak: 3,
          },
        ],
      },
    ],
  },
}

export const data_1 = {
  habits: {
    checked: [],
    unchecked: [],
  },
}

let date = new Date()
date.setDate(date.getDate() - 45)

export const data_2 = {
  habits: {
    unchecked: [
      {
        title: "Work on HabitCheck",
        startDate: "12/02/2019",
        bestStreak: 0,
        progress: [],
      },
      {
        title: "TEST_DATA_1",
        startDate: "12/02/2019",
        bestStreak: 0,
        progress: [{ date: "2/6/2020", streak: 24 }],
      },
      {
        title: "Quit Smoking",
        startDate: "10/25/2019",
        bestStreak: 40,
        bestStreakDate: "12/03/2019",
        progress: [
          {
            date: "10/25/2019",
            streak: 40,
          },
          //{ date: "12/4/2019", streak: -1 }
        ],
      },
      {
        title: "Meditate",
        startDate: "11/28/2019",
        bestStreak: 1,
        bestStreakDate: "11/28/2019",
        progress: [
          { date: "11/28/2019", streak: 1 },
          { date: "11/29/2019", streak: -3 },
        ],
      },
      {
        title: "Sleep on time",
        startDate: "11/29/2019",
        bestStreak: 1,
        bestStreakDate: "11/30/2019",
        progress: [
          { date: "11/30/2019", streak: 1 },
          { date: "12/1/2019", streak: -1 },
        ],
      },
    ],
    checked: [
      {
        title: "90 min Yoga",
        startDate: "12/1/2019",
        bestStreak: 1,
        bestStreakDate: "12/1/2019",
        progress: [
          {
            date: "12/1/2019",
            streak: 1,
          },
        ],
      },
      {
        title: "Push Ups",
        startDate: "12/1/2019",
        bestStreak: 1,
        bestStreakDate: "12/1/2019",
        progress: [
          {
            date: "12/1/2019",
            streak: 1,
          },
        ],
      },
      {
        title: "30 min walk",
        startDate: "12/1/2019",
        bestStreak: 1,
        bestStreakDate: "12/1/2019",
        progress: [
          {
            date: "12/1/2019",
            streak: 1,
          },
        ],
      },
      {
        title: "Keto Diet",
        startDate: "12/1/2019",
        bestStreak: 3,
        bestStreakDate: "12/3/2019",
        progress: [
          {
            date: "12/1/2019",
            streak: 3,
          },
        ],
      },
    ],
  },
}

/*

let today = new Date();
lastDate = new Date("11/3/2019");
diffTime = Math.abs(today - lastDate);

lastDate2 = new Date("11/4/2019");
diffTime2 = Math.abs(today - lastDate2)
diffTime
diffTime2

let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
let diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24)) 

const streak = 40;

let newStreak = diffDays - streak;
let newStreak2 = diffDays2 - streak;

let missedDay = new Date(today)
let missedDay2 = new Date(today)
missedDay.setDate(missedDay.getDate() - newStreak)
missedDay2.setDate(missedDay2.getDate() - newStreak2)


//missedDay = December 12
//missedDay2 = December 13

//-----------> diffDays, streak, diffDays-streak
//11/3/2019 -> 110       40      70
//11/4/2019 -> 108       40      68


Math.ceil(Math.abs(new Date() - date1) / (1000 * 60 * 60 * 24))
*/
