import { isBrowser } from "./helpers"
import { getUserPreferences, setUserPreferences } from "./auth"

export const handleToggleDarkMode = () => {
  if (!isBrowser) return

  let preferences = getUserPreferences()
  preferences = {
    ...preferences,
    darkMode: !preferences.darkMode,
  }
  setUserPreferences(preferences)
  return preferences
}

export const handleToggleXEffectView = () => {
  if (!isBrowser) return

  let preferences = getUserPreferences()
  preferences = {
    ...preferences,
    xEffectView: !preferences.xEffectView,
  }
  setUserPreferences(preferences)
  return preferences
}
