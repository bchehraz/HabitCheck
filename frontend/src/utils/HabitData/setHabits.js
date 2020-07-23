import { getCurrentUserData, setUserData } from "../auth"

const setHabits = habits => {
  setUserData({ ...getCurrentUserData(), habits: { ...habits } })
}

export default setHabits
