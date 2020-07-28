import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  background: white;
  user-select: none;

  @media only screen and (min-width: 768px) {
    p {
      font-size: 1.2em;
    }

    h1 {
      font-size: 3em;
    }
  }
`

const getDate = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const date = new Date()

  return `${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`
}

const AppHeader = ({ title }) => (
  <header>
    <Container>
      <h1>{title}</h1>
      <p>{getDate()}</p>
    </Container>
  </header>
)

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

AppHeader.defaultProps = {
  siteTitle: ``,
}

export default AppHeader
