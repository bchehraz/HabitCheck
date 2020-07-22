import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  visibility: ${props => (props.enabled ? "visible" : "hidden")};
  opacity: ${props => (props.enabled ? 1 : 0)};

  transition: all 300ms ease-in-out;
  z-index: ${props => props.zIndex};
`

const Backdrop = props => <Cover {...props} />

Backdrop.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  zIndex: PropTypes.number.isRequired,
}

export default Backdrop
