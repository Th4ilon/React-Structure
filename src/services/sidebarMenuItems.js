import React from 'react';
import s4 from 'utils/guid';
import Administradores from 'scenes/UserAdministration';
import Comerciales from 'scenes/UserAdministration/Comerciales';
import ConfiguracionEmpresa from 'scenes/ConfiguracionEmpresa';
import ConfiguracionGasolinera from 'scenes/ConfiguracionGasolinera';
import ParametrosGenerales from 'scenes/ParametrosGenerales';

export default function getDashboardRoutes(permissions = []) {
  return [
    {
      id: s4(),
      name: 'Administración',
      // url: '/dashboard/administracion',
      hasPermissions: permissions.indexOf('F_WEB_ADM_GESTUSU') > -1 ||
        permissions.indexOf('F_WEB_ADM_AVISOS') > -1 ||
        permissions.indexOf('F_WEB_ADM_PARAMGEN') > -1 ||
        permissions.indexOf('F_WEB_ADM_EMPRCLIENTE') > -1,
      exact: true,
      iconClass: 'briefcase',
      component: props => null, // eslint-disable-line
      nodes: [
        {
          id: s4(),
          name: 'Configuración',
          // url: '/dashboard/configuracion',
          hasPermissions: permissions.indexOf('F_WEB_ADM_GESTUSU') > -1 ||
            permissions.indexOf('F_WEB_ADM_AVISOS') > -1 ||
            permissions.indexOf('F_WEB_ADM_PARAMGEN') > -1 ||
            permissions.indexOf('F_WEB_ADM_EMPRCLIENTE') > -1,
          exact: true,
          iconClass: 'settings',
          component: props => null, // eslint-disable-line
          nodes: [
            {
              id: s4(),
              name: 'Usuarios',
              hasPermissions: permissions.indexOf('F_WEB_ADM_GESTUSU') > -1,
              exact: true,
              component: props => null, // eslint-disable-line
              nodes: [
                {
                  id: s4(),
                  name: 'Administradores',
                  url: '/dashboard/configuracion/usuarios/administradores',
                  hasPermissions: permissions.indexOf('F_WEB_ADM_GESTUSU') > -1,
                  exact: true,
                  component: props => <Administradores permissions={permissions}/>, // eslint-disable-line
                },
                {
                  id: s4(),
                  name: 'Comerciales',
                  url: '/dashboard/configuracion/usuarios/con',
                  hasPermissions: permissions.indexOf('F_WEB_ADM_GESTUSU') > -1,
                  exact: true,
                  component: props => <Comerciales permissions={permissions}/>, // eslint-disable-line
                },
                {
                  id: s4(),
                  name: 'Empresas',
                  url: '/dashboard/configuracion/usuarios/empresas',
                  hasPermissions: permissions.indexOf('F_WEB_ADM_GESTUSU') > -1,
                  exact: true,
                  component: props => <span>Usuarios Empresas</span>, // eslint-disable-line
                },
                {
                  id: s4(),
                  name: 'Gassolineras',
                  url: '/dashboard/configuracion/usuarios/gasolineras',
                  hasPermissions: permissions.indexOf('F_WEB_ADM_GESTUSU') > -1,
                  exact: true,
                  component: props => <span>Usuarios Gasolineras</span>, // eslint-disable-line
                }
              ]
            },
            {
              id: s4(),
              name: 'Avisos',
              url: '/dashboard/configuracion/avisos',
              hasPermissions: permissions.indexOf('F_WEB_ADM_AVISOS') > -1,
              exact: true,
              component: props => <span>Avisos</span>, // eslint-disable-line
            },
            {
              id: s4(),
              name: 'Parámetros Generales',
              url: '/dashboard/configuracion/parametros',
              hasPermissions: permissions.indexOf('F_WEB_ADM_PARAMGEN') > -1,
              exact: true,
              component: props => <ParametrosGenerales/>, // eslint-disable-line
            }
          ],
        },
        {
          id: s4(),
          name: 'Pedidos',
          url: '/dashboard/pedidos',
          hasPermissions: permissions.indexOf('F_WEB_ADM_PEDIDOS') > -1,
          exact: true,
          iconClass: 'docs',
          component: props => <span>Pedidos</span>, // eslint-disable-line
        },
        {
          id: s4(),
          name: 'Empresas',
          url: '/dashboard/empresas',
          hasPermissions: permissions.indexOf('F_WEB_ADM_EMPRCLIENTE') > -1,
          exact: true,
          iconClass: 'notebook',
          component: props => <ConfiguracionEmpresa {...props} />,
        },
        {
          id: s4(),
          name: 'Gasolineras',
          url: '/dashboard/gasolineras',
          hasPermissions: permissions.indexOf('F_WEB_ADM_EMPRGAS') > -1,
          iconClass: 'location-pin',
          exact: true,
          component: props => <ConfiguracionGasolinera {...props} />,
        }
      ]
    },
    {
      id: s4(),
      name: 'Estadísticas',
      url: '/dashboard',
      hasPermissions: permissions.indexOf('F_WEB_DASHBOARD') > -1,
      exact: true,
      iconClass: 'chart',
      component: props => <span>Estadísticas</span>, // eslint-disable-line
    },
    {
      id: s4(),
      name: 'Solicitudes de suministro',
      url: '/dashboard/suministro',
      hasPermissions: permissions.indexOf('F_APP_SOLICSUMINISTRO') > -1,
      exact: true,
      iconClass: 'drawer',
      component: props => <span>Solicitud de suministro</span>, // eslint-disable-line
    }
  ];
}

