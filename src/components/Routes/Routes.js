import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { mainRoutes, dashboardRoutes } from 'services/routes'; // eslint-disable-line
import NotFoundRoute from './NotFoundRoute';
import PrivateRoute from './PrivateRoute';

let RouteSwitch = ({ routes, isAuthenticated }) => (
  <Router>
    <Switch>
      { routes.map(route =>
        (route.isPrivate ? <PrivateRoute
          key={route.id}
          isAuthenticated={route.hasPermissions || isAuthenticated}
          exact={route.exact}
          path={route.path}
          component={route.component}
        /> : <Route
          key={route.id}
          exact={route.exact}
          path={route.path}
          render={props => route.component({ isAuthenticated, ...props })}
        />
      )) }
      <NotFoundRoute />
    </Switch>
  </Router>
);

RouteSwitch.propTypes = {
  routes: PropTypes.array, // eslint-disable-line react/forbid-prop-types,
  isAuthenticated: PropTypes.bool.isRequired
};

RouteSwitch.defaultProps = {
  routes: []
};

RouteSwitch = connect(state => ({
  isAuthenticated: state.auth.isAuthenticated
}))(RouteSwitch);

const MainRoutes = () => (
  <RouteSwitch routes={mainRoutes} />
);

const DashboardRoutes = ({ permissions }) =>
  permissions && <RouteSwitch routes={dashboardRoutes(permissions)} />;

DashboardRoutes.propTypes = {
  permissions: PropTypes.array.isRequired // eslint-disable-line
};

export {
  MainRoutes,
  DashboardRoutes
};
