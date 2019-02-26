import React from 'react';
import { Route } from 'react-router-dom';

import { notFoundRoute } from './../../services/routes';

const NotFoundRoute = () => (
  <Route
    from={notFoundRoute.from}
    to={notFoundRoute.to}
    exact={notFoundRoute.exact}
    render={props => notFoundRoute.component({ ...props })}
  />
);

export default NotFoundRoute;
