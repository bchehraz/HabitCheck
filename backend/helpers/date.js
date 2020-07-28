exports.dateToUTC = date => {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getUTCHours()
  )
}

exports.dateToString = date => new Date(date).toISOString();
