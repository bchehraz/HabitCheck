import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import AuthContext from '../context/auth-context';
import { isLoggedIn } from '../utils/auth';

class PrivateRoute extends React.Component {
  static contextType = AuthContext;

  render() {
    const {
      component: Component,
      location: pathname,
      ...rest
    } = this.props;

    if (!isLoggedIn()) {
      if (pathname !== `/app/login`) {
        navigate(`/app/login`);
      }
      return null;
    }

    return <Component {...rest} path={pathname.pathname} />
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object,
  pathname: PropTypes.objectOf(PropTypes.string.isRequired),
}

export default PrivateRoute;
