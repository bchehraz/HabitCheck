import React from "react"
import PropTypes from "prop-types"

import { AppLayout } from "../components/Layout"
import Journal from "../components/Journal"

const JournalPage = ({ path }) => (
  <AppLayout path={path}>
    <Journal />
  </AppLayout>
)

JournalPage.propTypes = {
  path: PropTypes.string.isRequired,
}

export default JournalPage