// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './Component/App';
import About from './Component/About/About';
import Page404 from './Component/Error/Error';


//Container
import Home from './containers/Home/Home';



const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={Home} />
      <Route component={Page404} />
    </Switch>
  </App>;

export default AppRoutes;
