import React from 'react';
import Login from 'scenes/Login'; // eslint-disable-line
import NotFound from 'scenes/NotFound'; // eslint-disable-line
import dashboardRoutes from 'services/dashboardRoutes'; // eslint-disable-line
import Dashboard from 'scenes/Dashboard'; // eslint-disable-line
import s4 from 'utils/guid'; // eslint-disable-line

const mainRoutes = [
  {
    id: s4(),
    path: '/',
    exact: true,
    component: props => <Login {...props} />,
    isPrivate: false,
  },
  {
    id: s4(),
    path: '/dashboard',
    component: props => <Dashboard {...props} />,
    isPrivate: true
  }
];

const notFoundRoute = {
  from: '*',
  to: '/404',
  exact: true,
  component: props => <NotFound {...props} />
};

export {
  mainRoutes,
  dashboardRoutes,
  notFoundRoute
};
