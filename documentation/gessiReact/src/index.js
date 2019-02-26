//Dep
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, } from 'react-router-dom';
//CSS
import './index.css';
//AppRoutes
import  AppRoutes  from "./routes";
//I dont know what tha heck is this... xD
//import registerServiceWorker from './registerServiceWorker';

//Container
import store from "./store";
//Call redux, add Router, Redux-Form.

const app = document.getElementById('root')
ReactDOM.render(
    <Provider store={store} >
      <Router>
        <React.Fragment>
            <AppRoutes />
        </React.Fragment>
      </Router>
    </Provider>,
     app);

     /*
     import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Root from './components/Root';
import store from './store';
import InvoiceDetail from './components/Forms/InvoiceDetail';
const customHistory = createBrowserHistory()
const App = () => (
  <Provider store={store}>
    <Router history={customHistory}>
      <React.Fragment>
        <Route path="/" exact component={Root} />
        { <Route path="/invoices/:id" render={props => <InvoiceDetail {...props} />} /> }
        <Route path="/invoices/:id" component={InvoiceDetail} />
      </React.Fragment>
    </Router>
  </Provider>
);
     */