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
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
  Toolbar,
} from '@devexpress/dx-react-grid-bootstrap4';
import { faUser, faCar } from '@fortawesome/fontawesome-free-solid';
import PercentWidget from 'components/Widgets';
import { Row } from 'reactstrap';
import styles from './module-css/ConfiguracionGasolinera.scss';

class ConfiguracionGasolinera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'empleado', title: 'Empleado' },
        { name: 'litros', title: 'Litros' },
        { name: 'matricula', title: 'Matrícula' },
        { name: 'fecha', title: 'Fecha' }
      ],
      rows: [],
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
        <Row className={styles['center-widgets']}>
          <PercentWidget progressValue={23} text="Solicitudes atendidas" counter={385} icon={faUser} />
          <PercentWidget progressValue={83} text="Litros suministrados" counter={1238} icon={faCar} progressColor="yellow" />
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
              <Table cellComponent={this.Cell} />
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

export default ConfiguracionGasolinera;
