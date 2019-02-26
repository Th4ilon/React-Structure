// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Page404 from './components/Error/error';
import Details from './components/Details/details'

//Container
import App from './components/App';



const AppRoutes = () =>
    <Switch>
      <Route exact path="/Details/:id" component={Details} />
      <Route exact path="/" component={App} />
      <Route component={Page404} />
    </Switch>
export default AppRoutes;
