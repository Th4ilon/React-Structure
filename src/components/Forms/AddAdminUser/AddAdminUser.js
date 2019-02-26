import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, reset, getFormValues } from 'redux-form';
import InputText from 'components/InputText';
import { SubmissionError } from 'redux-form';
import { Row, Col, Card, CardBody, CardHeader, FormGroup } from 'reactstrap';

const loadDetail = data => ({ type: 'LOAD', data });

function createInitialDetailObjectFromState(state) {
  const detail = state.loadedForm.data;
  if (!detail) return {};
  return Object.assign({}, {
    id: detail.id,
    login: detail.login,
    nombre: detail.nombre,
    apellido1: detail.apellido1,
    apellido2: detail.apellido2,
    telefono: detail.telefono,
    email: detail.email,
    password: '', // if edit, password is null, and send null to set the old password
    passwordConfirm: ''
  });
}

class AddUserAdmin extends Component {
  constructor(props) {
    super(props);
    // this.props.setItems(['test']);
    this.state = {
      showPasswordFields: false
    };
  }
  componentWillMount() {
    this.props.load(this.props.isEdit ? this.props.data : {});
  }

  onSubmit = (event, values) => {
    event.preventDefault();
    /* if (true) {
      throw new SubmissionError({
        nombre: 'Wrong password',
        _error: 'Login failed!'
      });
    } else { */
    this.props.onSubmit(this.props.adminFormValues);
    // }
  }

  render() {
    const { formButtonText, invalid } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="form-horizontal">
        <Card>
          <CardBody>
            <input type="hidden" readOnly name="id" />
            <fieldset>
              <legend>Datos contacto</legend>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <InputText name="nombre" label="Nombre" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <InputText name="apellido1" label="Primer apellido" />
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <InputText name="apellido2" label="Segundo apellido" />
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <InputText maxLength={9} name="telefono" label="Teléfono" />
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <InputText name="email" label="Email" />
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <InputText maxLength={9} name="dni" label="DNI" />
                </Col>
              </Row>
            </fieldset>

            <fieldset>
              <legend>Datos acceso</legend>
              <InputText maxLength={32} name="login" label="Login" />
              {!this.props.isEdit &&
                <div>
                  <InputText name="password" type="password" label="Contraseña" />
                  <InputText name="passwordConfirm" type="password" label="Repetir contraseña" />
                </div>
              }
              {this.props.isEdit && <button className="btn btn-primary" onClick={() => { this.setState({ showPasswordFields: !this.state.showPasswordFields }); }}>Cambiar contraseña</button>}
              {
                this.props.isEdit && this.state.showPasswordFields &&
                <div>
                  <span className="help-block">Si no se rellena, se mantendrá la contraseña anterior</span>
                  <InputText name="password" type="password" label="Nueva contraseña" />
                  <InputText name="passwordConfirm" type="password" label="Repetir contraseña" />
                </div>
              }
            </fieldset>
            <div className="modal-footer">
              <button className={`btn btn-danger btn-lg btn-block${invalid ? ' disabled' : ''}`} disabled={invalid}>{formButtonText}</button>
            </div>
          </CardBody>
        </Card>
      </form>
    );
  }
}

AddUserAdmin = reduxForm({
  form: 'manageAdmin',
  validate: (values, props) => {
    const errors = {};
    const {
      nombre,
      apellido1,
      apellido2,
      telefono,
      email,
      dni,
      login,
      password,
      passwordConfirm
    } = values;
    if (!nombre) {
      errors.nombre = 'El nombre no puede estar vacío';
    } else if (nombre.length > 100) {
      errors.nombre = 'El tamaño máximo del nombre es de 100 caracteres';
    }
    if (!apellido1) errors.apellido1 = 'El primer apellido no puede estar vacío';
    if (!apellido2) errors.apellido2 = 'El segundo apellido no puede estar vacío';
    if (!telefono) {
      errors.telefono = 'El teléfono no puede estar vacío';
    } else if (!telefono.match(/^[0-9]\d{8}$/g)) {
      errors.telefono = 'El teléfono debe contener nueve dígitos';
    }
    if (!email) {
      errors.email = 'El correo no puede estar vacío';
    } else if (!email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g)) {
      errors.email = 'Dirección de correo inválida';
    }

    if (!dni) {
      errors.dni = 'El DNI no puede estar vacío';
    } /* else if (!dni.math(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)) {
      errors.dni = 'El formatod del DNI no es correcto';
    } */ else if (!validateDNI(dni)) {
      errors.dni = 'El formato del DNI no es correcto';
    }
    if (!login) {
      errors.login = 'El login no puede estar vacío';
    } else if (login.length < 6 || login.length > 32) {
      errors.login = 'El tamaño del login tiene que ser entre 6 y 32 caracteres';
    }
    if (!props.isEdit) {
      if (!password) {
        errors.password = 'La contraseña no puede estar vacía';
      } else if (!password.match(/(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/g)) {
        errors.password = 'La contraseña debe contener números, letras y al menos un carácter especial';
      }
      if (!passwordConfirm) {
        errors.passwordConfirm = 'La confirmación de la contraseña no puede estar vacía';
      } else if (passwordConfirm !== password) {
        errors.passwordConfirm = 'La contraseña no coincide';
      }
    } else if (password) {
      if (!password.match(/(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/g)) {
        errors.password = 'La contraseña debe contener números, letras y al menos un carácter especial';
      }
      if (passwordConfirm !== password) {
        errors.passwordConfirm = 'La contraseña no coincide';
      }
    }
    return errors;
  },
  warn: (values) => {
    const warnings = {};
    /* if (values.login !== '') {
      warnings.login = 'Login can not be empty';
    } */
    return warnings;
  },
  enableReinitialize: true
})(AddUserAdmin);
/*
const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (items) =>{
      dispatch({
        type: 'LOAD_ITEMS',
        data: items
      });
    }
  }
}
*/
const selector = formValueSelector('manageAdmin');

const validateDNI = (value) => {
  const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  const str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  const nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');

  const letter = str.substr(-1);
  const charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
};
/*
const mapStateToProps = state => ({
  initialValues: createInitialDetailObjectFromState(state),
  adminFormValues: selector(state, 'administrador', 'apellidos', 'telefono')
}, { load: loadDetail });
*/
export default connect(
  state => ({
    initialValues: createInitialDetailObjectFromState(state),
    adminFormValues: selector(
      state,
      'nombre',
      'apellido1',
      'apellido2',
      'telefono',
      'login',
      'password',
      'passwordConfirm',
      'email',
      'dni',
      'id'
    )
  }),
  { load: loadDetail },
  /* mapStateToProps,
  mapDispatchToProps */
)(AddUserAdmin);
