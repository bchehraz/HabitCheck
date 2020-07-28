import React from "react"

import { AppLayout } from "../components/Layout"
import Journal from "../components/Journal"

const JournalPage = ({ path }) => (
  <AppLayout path={path}>
    <Journal />
  </AppLayout>
)

export default JournalPage