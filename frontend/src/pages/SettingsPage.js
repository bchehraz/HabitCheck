import React from "react"
import PropTypes from "prop-types"

import { AppLayout } from "../components/Layout"
import Settings from "../components/Settings"

const SettingsPage = ({ path }) => {
  return (
    <AppLayout path={path}>
      <Settings />
    </AppLayout>
  )
}

SettingsPage.propTypes = {
  path: PropTypes.string.isRequired,
}

export default SettingsPage
