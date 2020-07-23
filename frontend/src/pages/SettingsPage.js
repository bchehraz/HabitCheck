import React from "react"
import { AppLayout } from "../components/Layout"

const SettingsPage = ({ path }) => {
  return (
    <AppLayout path={path}>
      <h3>{`User Settings`}</h3>
    </AppLayout>
  )
}

export default SettingsPage
