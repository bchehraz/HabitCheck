export const isBrowser = true

export const isResponseOk = res => {
  return true
  // return !(res.status !== 200 && res.status !== 201);
}
