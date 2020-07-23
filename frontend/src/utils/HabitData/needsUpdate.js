const needsUpdate = (today, lastUpdate) => {
  const date = new Date(lastUpdate)
  if (today.setHours(0, 0, 0, 0) !== date.setHours(0, 0, 0, 0)) {
    window.location.reload()
    return true
  }
  return false
}

export default needsUpdate
