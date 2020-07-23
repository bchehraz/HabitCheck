import React, { useContext } from "react"
import { navigate } from "@reach/router"
import PropTypes from "prop-types"
import AuthContext from "../context/auth-context"
import { isLoggedIn } from "../utils/auth"

class PrivateRoute extends React.Component {
  static contextType = AuthContext

  render() {
    const { component: Component, location: pathname, ...rest } = this.props

    if (!isLoggedIn()) {
      navigate(`/app/login`)
      return null
    }

    return <Component {...rest} path={pathname.pathname} />
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object,
  pathname: PropTypes.objectOf(PropTypes.string.isRequired),
}

export default PrivateRoute
