import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { DashboardRoutes } from 'components/Routes';
import dashboardRoutes from 'services/dashboardRoutes';
import getPermissionsList from './state/actions';
import getDashboardRoutes from 'services/sidebarMenuItems';
import { withRouter } from 'react-router';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

class Dashboard extends Component {
  componentWillMount() {
    this.props.dispatch(getPermissionsList());
  }

  render() {
    const { permissionList } = this.props;
    if (permissionList.length === 0) return null;
    const items = dashboardRoutes(permissionList);
    return items.length > 0 ? (
        <Switch>
          <div className="app">
            <Header />
            <div className="app-body">
              <Sidebar location={this.props.location} items={getDashboardRoutes(permissionList)} />
              <main className="main">
              { items.map(route => {
                return renderRoute(route);
              })}
          </main>
        </div>
        <footer className="app-footer">
          <span>© 2018 <span className="logotipo" /> Anaxi Spain.</span>
        </footer>
      </div>
      </Switch>
    ) : null;
  }
}

const renderRoute = (route) => <Route
  key={route.id}
  exact={route.exact}
  path={route.url}
  render={props => route.component({ ...props })}
/>

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  permissionList: PropTypes.array.isRequired // eslint-disable-line
};

// mapDispatchToProps

export default connect(state => ({
  permissionList: state.permissionList.permissionList
}))(Dashboard);
