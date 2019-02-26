import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import NotFoundRoute from './NotFoundRoute';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <NotFoundRoute />
      ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

PrivateRoute.defaultProps = {
  isAuthenticated: false
};

export default PrivateRoute;
