import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"

import { AppHeader, FooterNav } from "./"
import "../Landing/layout.css"
import "./layout.scss"

const AppLayout = ({ children, path }) => {
  let page = path.replace("/app/", "")
  if (page === "/app" || page === "") {
    page = "Today"
  } else if (page === "settings") {
    page = "Settings"
  } else {
    page = "Journal"
  }
  return (
    <>
      <ThemeProvider theme={{ mode: "light" }}>
        <AppHeader title={page} />
        <div
          style={{
            margin: `0 auto 5rem`,
            padding: 0,
            maxWidth: "100%",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            position: "relative",
          }}
        >
          <main>{children}</main>
        </div>
        <FooterNav currentPage={page} path={path} />
      </ThemeProvider>
    </>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
}

export default AppLayout
