//Dep
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import Bluebird from 'bluebird';
import { Provider } from 'react-redux';

import './index.css';

//import registerServiceWorker from './registerServiceWorker';
//Routes
import AppRoutes from './routes';
//Assets
import './index.css';
//Redux Store
import { configureStore } from "./lib/configureStore";
//reducers
import { rootReducers } from "./reducers";

// Bluebird configuration
window.Promise = Bluebird;

Bluebird.config({ warnings: false });

window.addEventListener('unhandledrejection', error => {
  error.preventDefault();

  if (process.env.NODE_ENV !== 'production') {
    console.warn('Unhandled promise rejection warning.', error.detail);
  }
});

// Configuring redux store
const store = configureStore({
  initialState: window.initialState
}, rootReducers);

render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>,
  document.getElementById('root')
);

