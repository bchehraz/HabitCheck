const DataLoader = require('dataloader');

const Habit = require('../../models/habit');
const User = require('../../models/user');
const HabitState = require('../../models/habitstate');
const Streak = require('../../models/streak');

/*
  The purpose of the transform functions below is to
   bind objects with id attributes to their respectful object data

  More specifically this is for HabitState, Habit, and Streak type
*/

// transformHabitState

// transformHabit

const habitLoader = new DataLoader(habitIds => {
  return habits(habitIds)
})

const habits = async habitIds => {
  try {
    const habits = await Habit.find({ _id: { $in: habitIds } })
    return habits.map(transformHabit);
  } catch (err) {
    throw err
  }
}

const streakLoader = new DataLoader(streakIds => {
  return streaks(streakIds)
})

const streaks = async streakIds => {
  try {
    const streaks = await Streak.find({ _id: { $in: streakIds } })
    return streaks.map(streak => ({ ...streak._doc }));
  } catch (err) {
    throw err
  }
}

// const saveStreaks = async (streakIds, update) => {
//   try {
//     await Streak.findByIdAndDelete({ _id: { $in: streakIds } })
//     streakUpdate.map(streak => {
//       const newStreak = 
//     })
//   } catch (err) {
//     throw err;
//   }
// }

const transformHabit = habit => {
  return {
    ...habit._doc,
    progress: () => streakLoader.loadMany(habit._doc.progress)
  }
}

const transformHabitState = habitState => {
  return {
    ...habitState._doc,
    checked: () => habitLoader.loadMany(habitState._doc.checked),
    unchecked: () => habitLoader.loadMany(habitState._doc.unchecked),
  }
}

exports.transformHabitState = transformHabitState
exports.transformHabit = transformHabit

/////////////////////////////////////////////////
//must get a list of events, a single event, ...
const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString());
    })
    return events.map(transformEvent);
  } catch (err) {
    throw err;
  }
}

const singleEvent = async eventId => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
}

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
}

const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
}

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
