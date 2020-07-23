import { getCurrentUserData } from "../auth"

const getHabits = () => {
  return getCurrentUserData().habits
}

export default getHabits
