import React from "react"

import { AppLayout } from "../components/Layout"
import Settings from "../components/Settings"

const SettingsPage = ({ path }) => {
  return (
    <AppLayout path={path}>
      <Settings />
    </AppLayout>
  )
}

export default SettingsPage
