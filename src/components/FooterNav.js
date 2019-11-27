import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiCheckSquare } from 'react-icons/fi';
import { FaChartArea, FaBookOpen } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  z-index: 100;
  -webkit-box-shadow: 0 -2px 5px rgba(0,0,0,0.25);
  box-shadow: 0 -2px 5px rgba(0,0,0,0.25);

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
`;

const Navigation = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;

  display: inline-grid;
  grid-template-columns: 33.33% 33.33% 33.34%;
  align-items: stretch;
  justify-items: stretch;
`;

const Tab = styled.div`
  position: relative;
  margin: 0 auto;
  height: 5rem;

  display: flex;
  flex-direction: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  ${({ active }) => !active && 'padding-top: 0.5rem;'}
  ${({ active }) => !active && 'opacity: 0.8;'}

  -webkit-transition: all 300ms ease-out;
  -moz-transition: all 300ms ease-out;
  -ms-transition: all 300ms ease-out;
  -o-transition: all 300ms ease-out;
  transition: all 300ms ease-out;
`;

const TabSelection = styled.div`
  height: 6px;
  width: 100%;
  background: linear-gradient(268.09deg, #8ACB88 0%, #66C7F4 100%), #66C7F4;
  position: absolute;
  top: 0;

  -webkit-transition: all 300ms ease-out;
  -moz-transition: all 300ms ease-out;
  -ms-transition: all 300ms ease-out;
  -o-transition: all 300ms ease-out;
  transition: all 300ms ease-out;
`;

const LinkStyle = styled.span`
  a {
    ${({applyStyle}) => (applyStyle) && 'color: green'}
  }
`;

const getTabIcon = (isActive) => {
  const size = isActive ? 40 : 32;
  return {
    "Habit Stats": <FaChartArea size={size} />,
    "Today": <FiCheckSquare size={size} />,
    "Your Journal": <FaBookOpen size={size} />,
  }
}

const getTab = (activePage, title) => {
  const isActive = (title === activePage);

  return (
    <Tab active={isActive}>
      {isActive && <TabSelection />}
      {getTabIcon(isActive)[title]}
    </Tab>
  )
}

const FooterNav = ({ currentPage }) => {

  return (
    <Container>
      <Navigation className="footer">
        <Link to="/app/stats">
          {getTab(currentPage, "Habit Stats")}
        </Link>
        <Link to="/app/">
          {getTab(currentPage, "Today")}
        </Link>
        <Link to="/app/journal">
          {getTab(currentPage, "Your Journal")}
        </Link>
      </Navigation>
    </Container>
  );
}

/*



  <LinkStyle applyStyle={currentPage === "Today"}><Link to="/app">Today</Link></LinkStyle>{` - `}
  <LinkStyle applyStyle={currentPage === "Habit Stats"}><Link to="/app/stats">Habit Stats</Link></LinkStyle>{` - `}
  <LinkStyle applyStyle={currentPage === "Your Journal"}><Link to="/app/journal">Your Journal</Link></LinkStyle>

*/

FooterNav.propTypes = {
  currentPage: PropTypes.string.isRequired,
}

export default FooterNav;
