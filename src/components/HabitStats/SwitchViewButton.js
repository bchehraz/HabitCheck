import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FaCalendarAlt, FaTh } from "react-icons/fa"
import Switch from "react-toggle-switch"

import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css"

const Container = styled.div`
  .switch {
    width: 80px;
    height: 40px;
    border-radius: 30px;
    -webkit-box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
    background-color: rgba(102, 199, 244, 0.5);
    background-color: white;
  }

  .switch.on {
    background-color: rgba(138, 203, 136, 0.5);
    background-color: #2d3142;
  }

  .switch .switch-toggle {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .switch .switch-toggle * {
    margin: 0 auto;
    padding: 1px;
  }

  .switch .switch-toggle .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .switch.on .switch-toggle {
    left: 2.1rem;
    background-color: white;
  }
`

const SwitchViewButton = ({ enabled, onClick }) => (
  <Container>
    <Switch onClick={onClick} on={enabled} className="switch">
      <div className="icon-container">
        {enabled ? <FaTh size={20} /> : <FaCalendarAlt size={20} />}
      </div>
    </Switch>
  </Container>
)

SwitchViewButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SwitchViewButton
