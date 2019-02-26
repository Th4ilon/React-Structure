import React from 'react';
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MainRoutes } from 'components/Routes'; // eslint-disable-line
import store from './store';

// import 'coreui-styles'; // eslint-disable-line
import 'simple-line-icons'; // eslint-disable-line
import 'spinkit-spinners'; // eslint-disable-line
import 'fonts-css'; // eslint-disable-line
import 'base-styles'; // eslint-disable-line
import 'custom-css'; // eslint-disable-line

const App = () => (
  <Provider store={store}>
    <MainRoutes />
  </Provider>
);

reactDOM.render(<App />, document.querySelector('#app')); // eslint-disable-line no-undef
