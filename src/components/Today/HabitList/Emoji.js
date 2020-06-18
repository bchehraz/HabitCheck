import React from "react"
import PropTypes from "prop-types"

const Emoji = ({ symbol, label, style }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
    style={style}
  >
    {symbol}
  </span>
)

Emoji.propTypes = {
  symbol: PropTypes.string.isRequired,
  label: PropTypes.string,
  style: PropTypes.object,
}

export default Emoji
