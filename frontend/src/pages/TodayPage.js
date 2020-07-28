import React from "react"
import PropTypes from "prop-types"

import { AppLayout } from "../components/Layout"
import Today from "../components/Today/Today"

const TodayPage = ({ path }) => (
  <AppLayout path={path}>
    <Today />
  </AppLayout>
)

TodayPage.propTypes = {
  path: PropTypes.string.isRequired,
}

export default TodayPage