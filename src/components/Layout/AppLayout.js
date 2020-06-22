import React from "react"
import PropTypes from "prop-types"

import { AppHeader, FooterNav } from "./"
import "../landing/layout.css"
import "./layout.scss"

const AppLayout = ({ children, path }) => {
  let page = path.replace("/app/", "")
  if (page === "/app" || page === "") {
    page = "Today"
  } else if (page === "settings") {
    page = "Settings"
  } else {
    page = "Your Journal"
  }
  return (
    <>
      <AppHeader title={page} />
      <div
        style={{
          margin: `0 auto 5rem`,
          padding: 0,
          maxWidth: "100%",
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
        }}
      >
        <main>{children}</main>
      </div>
      <FooterNav currentPage={page} />
    </>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
}

export default AppLayout
