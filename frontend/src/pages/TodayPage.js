import React from "react"

import { AppLayout } from "../components/Layout"
import Today from "../components/Today/Today"

const TodayPage = ({ path }) => (
  <AppLayout path={path}>
    <Today />
  </AppLayout>
)

export default TodayPage