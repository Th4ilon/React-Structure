import React from 'react';
import Login from 'components/Login'; // eslint-disable-line
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import login from './state/actions'; // eslint-disable-line

const LoginScene = ({ isAuthenticated, dispatch, errorMessage }) => (
  isAuthenticated ? <Redirect to="/dashboard" /> : (
    <Login
      title="Identifícate"
      description="Introduce tu usuario y contraseña para acceder."
      recoverPasswordText="Recuperar contraseña"
      buttonText="Acceder"
      onLogin={(username, password) => dispatch(login(username, password))}
      errorMessage={errorMessage}
    />
  )
);

/*
const LoginScene =
  ({ isAuthenticated,
    dispatch,
    errorMessage,
    listadoEmpresas,
    hasGasolinera,
    user,
    permissionList
  }) => {
    if (!isAuthenticated) {
      return (<Login
        title="Identifícate"
        description="Introduce tu usuario y contraseña para acceder."
        recoverPasswordText="Recuperar contraseña"
        buttonText="Acceder"
        onLogin={(username, password) => dispatch(login(username, password))}
        errorMessage={errorMessage}
      />);
    } else {
      if (listadoEmpresas && listadoEmpresas.length > 0) {
        return (<span>Tengo empresas</span>);
      } else if (hasGasolinera) {
        console.log(user);
        return (<span>Tengo gasolineras</span>);
      }
      return null;
    }

  // return (<Redirect to="/dashboard" />);
};
*/

LoginScene.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

LoginScene.defaultProps = {
  errorMessage: ''
};

export default connect(state => ({
  errorMessage: state.auth.errorMessage
}))(LoginScene);
