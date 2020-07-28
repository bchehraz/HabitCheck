import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';

import Logo from "../../images/logo.svg"

const Container = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  user-select: none;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;

  img {
    margin: 0;
  }
`

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#eee`,
      margin: '0 auto',
      marginBottom: `1.45rem`,
    }}
  >
    <Container>
      <LogoContainer>
        <img src={Logo} alt="logo" />
        <Link
          to="/"
          style={{
            color: `#2D3142`,
            textDecoration: `none`,
          }}
        >
          <h1>{siteTitle}</h1>
        </Link>
      </LogoContainer>
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;
