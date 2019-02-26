import React, { Component } from 'react';
import {
  SortingState,
  FilteringState,
  PagingState,
  GroupingState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  CustomPaging
} from '@devexpress/dx-react-grid';
import { faTachometerAlt, faUser, faCar, faDollarSign } from '@fortawesome/fontawesome-free-solid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
  Toolbar,
} from '@devexpress/dx-react-grid-bootstrap4';
import PercentWidget from 'components/Widgets';

import { Row } from 'reactstrap';

class ConfiguracionEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'empleado', title: 'Empleado' },
        { name: 'litros', title: 'Litros' },
        { name: 'matricula', title: 'Matrícula' },
        { name: 'fecha', title: 'Fecha' }
      ],
      rows: [
        {
          empleado: 'Pedro Fernández', litros: 235, matrícula: '2345 ABC', fecha: '23-12-2013',
        },
        {
          empleado: 'Antonio Herrera', litros: 274, matrícula: '2345 BBC', fecha: '11-05-2015',
        }
      ],
      pageSize: 10,
      currentPage: 0,
      totalCount: 0,
      filteringStateColumnExtensions: [
        { columnName: 'actions', filteringEnabled: false },
      ],
    };
  }

  Cell = props =>
    <Table.Cell {...props} />;

  render() {
    const {
      rows,
      columns,
      filteringStateColumnExtensions,
      totalCount,
      currentPage,
      pageSize
    } = this.state;
    return (
      <div className="container-fluid">
        <Row>
          <PercentWidget progressValue={23} text="Conductores" icon={faUser} />
          <PercentWidget progressValue={83} text="Vehículos" counter={12.124} icon={faCar} progressColor="yellow" />
          <PercentWidget progressValue={13} text="Litros restantes" counter={214.632} icon={faTachometerAlt} progressColor="blue" />
          <PercentWidget progressValue={63} text="Cotización" counter={12} icon={faDollarSign} progressColor="cyan" />
        </Row>
        <Row>
          <div className="col-sm-12 col-md-3 offset-md-9 mb-3">
            <button type="button" className="btn btn-danger btn-lg btn-block"><strong>Realizar pedido</strong></button>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <div className="card-header">Últimos repostajes</div>
            <Grid
              rows={rows}
              columns={columns}
            >
              <PagingState
                defaultCurrentPage={0}
                currentPage={currentPage}
                onCurrentPageChange={this.changeCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={this.changePageSize}
              />
              <FilteringState
                columnExtensions={filteringStateColumnExtensions}
              />
              <SortingState
                defaultSorting={[
                  { columnName: 'empleado', direction: 'asc' }
                ]}
              />
              <GroupingState />
              <PagingPanel />
              <IntegratedFiltering />
              <IntegratedPaging />
              <IntegratedSorting />
              <CustomPaging
                totalCount={totalCount}
              />
              <Table messages={{ noData: 'No hay datos' }} cellComponent={this.Cell} />
              <TableHeaderRow showSortingControls />
              <TableFilterRow />
              <Toolbar />
            </Grid>
          </div>
        </Row>
      </div>
    );
  }
}

export default ConfiguracionEmpresa;
