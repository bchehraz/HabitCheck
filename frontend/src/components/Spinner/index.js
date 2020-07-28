import React from "react"
import PropTypes from "prop-types"
import "./spinnerStyle.css"

const Spinner = ({ style }) => (
  <div className="loadingio-spinner-dual-ball-6ttlhp9e3l8" style={style}>
    <div className="ldio-xvoczscdqhs">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)

Spinner.propTypes = {
  style: PropTypes.object,
}

export default Spinner
