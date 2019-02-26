import React, { Component } from 'react';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
  CustomPaging
} from '@devexpress/dx-react-grid';
import   InputText from "components/InputText";
import {
  Grid,
} from '@devexpress/dx-react-grid-bootstrap4';
import ReactDOM from 'react-dom';
import parametrosCall from 'services/ParametrosGenerales/ParametrosGenerales';
import { Col, Row, Container } from 'reactstrap';
import AddUserAdmin from 'components/Modals/AddAdminUser';

class ParametrosGenerales extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    parametrosCall().then(data => console.log('im here : ', data));
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <InputText name="nombre" label="Nombre" />
          </Col>
        </Row>
      </Container>
    </div>
    );
  }
}

export default ParametrosGenerales;
