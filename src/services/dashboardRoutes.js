import getDashboardRoutes from 'services/sidebarMenuItems';

function setDashboardRoutes(routes, array = []) {
  routes.forEach((route) => {
    if (route.hasPermissions) {
      if (route.nodes && route.nodes.length > 0) {
        setDashboardRoutes(route.nodes, array);
      }
      array.push({
        id: route.id,
        url: route.url || '',
        component: route.component,
        exact: route.exact,
        children: route.nodes
      });
    }
  });
  return array;
}

const dashboardRoutes = permissions =>
  setDashboardRoutes(getDashboardRoutes(permissions));

export default dashboardRoutes;
