export const isBrowser = typeof window !== `undefined`

export const isResponseOk = res => {
  return !(res.status !== 200 && res.status !== 201)
}

export const dateToUTC = date => {
  date.setHours(0, 0, 0, 0)
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getUTCHours()
  )
}
