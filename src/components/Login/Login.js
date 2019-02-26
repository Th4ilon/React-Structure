import React, { Component } from 'react';
import {
  Input,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Card,
  CardBody,
  InputGroupText,
  Form,
  CardGroup
} from 'reactstrap';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onLogin(event, username, password) {
    event.preventDefault();
    this.props.onLogin(username, password);
  }

  render() {
    const {
      title,
      description,
      buttonText,
      recoverPasswordText,
      errorMessage,
    } = this.props;
    const { username, password } = this.state;
    return (
      <div className="app flex-row align-items-center bg-login">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <img src="img/logo.png" className="img-fluid mx-auto d-block logotipo" alt="Logotipo Anaxi Spain" />
              <CardGroup>
                <Card>
                  <CardBody>
                    <Form name="login" onSubmit={event => this.onLogin(event, username, password)}>
                      <div className="text-center">
                        {title && <h2 className="hidden text-center">{title}</h2>}
                        {description && <p className="text-muted mb-4">{description}</p>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="USUARIO" onChange={event => this.setState({ username: event.target.value })} />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="CONTRASEÑA"
                            onChange={event => this.setState({ password: event.target.value })}
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="12" className="mb-1">
                            <Button
                              disabled={username === '' || password === ''}
                              color="primary"
                              className="px-4"
                              onClick={event => this.onLogin(event, username, password)}
                            >
                              {buttonText}
                            </Button>
                          </Col>
                          <Col xs="12" className="text-right">
                            {recoverPasswordText && <Button color="link" className="btn btn-link px-0">{recoverPasswordText}</Button>}
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  recoverPasswordText: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

Login.defaultProps = {
  title: '',
  description: '',
  buttonText: 'Login',
  recoverPasswordText: '',
  errorMessage: ''
};

export default Login;
