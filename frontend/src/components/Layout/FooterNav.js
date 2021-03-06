import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import _ from "lodash"
import { FiCheckSquare, FiSettings } from "react-icons/fi"
import { FaBookOpen } from "react-icons/fa"

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  z-index: 100;
  -webkit-box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.25);

  position: fixed;
  left: 0;
  bottom: 0;
  background-color: white;

  a {
    -webkit-transition: all 300ms ease-out;
    -moz-transition: all 300ms ease-out;
    -ms-transition: all 300ms ease-out;
    -o-transition: all 300ms ease-out;
    transition: all 300ms ease-out;
  }
`

const Navigation = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;

  display: inline-grid;
  grid-template-columns: 33.33% 33.33% 33.34%;
  align-items: stretch;
  justify-items: stretch;
`

const Tab = styled.div`
  position: relative;
  margin: 0 auto;
  height: 5rem;

  display: flex;
  flex-direction: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  ${({ active }) => !active && "padding-top: 0.5rem;"}
  ${({ active }) => !active && "opacity: 0.8;"}

    transition: all 150ms ease-out;

  .icon {
    height: 32px;
    width: 32px;

    transition: all 150ms ease-out;
  }

  .icon.active {
    height: 40px;
    width: 40px;
    transition: all 150ms ease-out;
  }
`

const TabSelection = styled.div`
  height: 6px;
  width: 100%;
  background: linear-gradient(268.09deg, #8acb88 0%, #66c7f4 100%), #66c7f4;
  position: absolute;
  top: 0;

  -webkit-transition: all 300ms ease-out;
  -moz-transition: all 300ms ease-out;
  -ms-transition: all 300ms ease-out;
  -o-transition: all 300ms ease-out;
  transition: all 300ms ease-out;
`

const getTabIcon = isActive => {
  return {
    Settings: <FiSettings className={`icon ${isActive && "active"}`} />,
    Today: <FiCheckSquare className={`icon ${isActive && "active"}`} />,
    "Journal": <FaBookOpen className={`icon ${isActive && "active"}`} />,
  }
}

const getTab = (activePage, title) => {
  const isActive = title === activePage

  return (
    <Tab active={isActive} className={_.camelCase(title)}>
      {isActive && <TabSelection />}
      {getTabIcon(isActive)[title]}
    </Tab>
  )
}

const FooterNav = ({ currentPage }) => {
  return (
    <Container>
      <Navigation className="footer">
      <Link to="/app/journal">{getTab(currentPage, "Journal")}</Link>
        <Link to="/app/">{getTab(currentPage, "Today")}</Link>
        <Link to="/app/settings">{getTab(currentPage, "Settings")}</Link>
      </Navigation>
    </Container>
  )
}

FooterNav.propTypes = {
  currentPage: PropTypes.string.isRequired,
}

export default FooterNav
