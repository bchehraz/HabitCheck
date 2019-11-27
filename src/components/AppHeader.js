import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  background: white;
`;

const getDate = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const date = new Date();

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

const AppHeader = ({ title }) => (
  <header>
    <Container>
      <h1>
        {title}
      </h1>
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

export default AppHeader;
