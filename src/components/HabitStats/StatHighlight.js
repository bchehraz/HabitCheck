import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

// TODO: This component will take a single value, a title, and a color.

const Container = styled.div`
  background-color: ${({ color }) => color};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 1rem;
  margin: 15px 0 0;
  user-select: none;

  h3 {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`

const Stat = styled.div`
  display: flex;
  justify-content: center;
  align-items center;
  padding: 5px 10px;
  background-color: ${({ color }) => color};
  color: white;
  border-radius: 7px;
`

const StatHighlight = ({ title, statValue, primaryColor, secondaryColor }) => {
  return (
    <Container color={primaryColor}>
      <h3>{title}</h3>
      <Stat color={secondaryColor}>
        <p className="stat">{statValue}</p>
      </Stat>
    </Container>
  )
}

//TODO: Prop Types
StatHighlight.propTypes = {
  title: PropTypes.string.isRequired,
  statValue: PropTypes.number.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
}

export default StatHighlight
