import React, { Component } from 'react';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
  CustomPaging
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropProvider, TableColumnReordering, Toolbar,
  TableColumnVisibility, ColumnChooser,
} from '@devexpress/dx-react-grid-bootstrap4';
import ReactDOM from 'react-dom';
import {
  getComerciales,
  createComercial,
  updateComercial,
  deleteComercial
} from 'services/administration/comerciales';
import { Col, Row } from 'reactstrap';
import AddUserAdmin from 'components/Modals/AddAdminUser';

class Comerciales extends Component {
  static defaultProps = {

  }
  static propTypes = {

  }
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'login', title: 'Identificador' },
        { name: 'nombre', title: 'Comercial' },
        { name: 'telefono', title: 'Teléfono' },
        { name: 'email', title: 'Email' },
        { name: 'actions', title: 'Operaciones' }
      ],
      rows: [],
      pageSizes: [5, 10, 15],
      pageSize: 10,
      loading: true,
      isOpen: false,
      currentPage: 0,
      totalCount: 0,
      filteringStateColumnExtensions: [
        { columnName: 'actions', filteringEnabled: false },
      ],
    };
  }

  Cell = props =>
    (props.column.name === 'actions' ?
      <this.ActionsCell {...props} /> :
      <Table.Cell {...props} />
  );

  ActionsCell = props => (
    <Table.Cell>
      <a href="" onClick={(event) => { event.preventDefault(); this.setState({ isOpen: true, isEdit: true, data: props.row })}}><i className="icon-note icons font-2xl" /></a>
      {/* <button onClick={() => this.setState({ isOpen: true, isEdit: false, data: props.row })}><i className="icon-magnifier" /></button> */}
      <a href="" onClick={(event) => { event.preventDefault(); this.deleteUser(props.row.id)}}><i className="icon-close icons font-2xl" /></a>
    </Table.Cell>
  );

  componentDidMount() {
    const tableClassList = ReactDOM.findDOMNode(this).querySelector('.table').classList;
    tableClassList.add('table-striped');

    const paginationClassList = document.querySelector('.pagination');
    // paginationClassList.remove('m-0');
    // paginationClassList.remove('d-sm-flex');
    // paginationClassList.remove('d-none');
    // paginationClassList.remove('float-right');

    this.loadData();
  }

  loadData() {
    getComerciales().then(admins =>
      this.setState({
        rows: admins.usuarios.map(user => ({
          login: user.login,
          nombre: user.nombre,
          telefono: user.telefono,
          email: user.email,
          apellido1: user.apellido1,
          apellido2: user.apellido2,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
          dni: user.dni,
          id: user.id
        })),
        loading: false,
        totalCount: admins.tamanoTotal
      })
    );
  }

  showAddDialog() {
    this.setState({
      isEdit: false,
      isOpen: true,
      data: {}
    });
  }

  createUser = (data) => {
    createComercial(data).then(() => {
      this.loadData();
      this.setState({
        isOpen: false,
      });
    });
  }

  updateUser = (data) => {
    updateComercial(data).then(() => {
      this.loadData();
      this.setState({
        isOpen: false,
      });
    });
  };

  deleteUser = (id) => {
    deleteComercial(id).then(() => {
      this.loadData();
    });
  }

  render() {
    const {
      rows, columns, filteringStateColumnExtensions, loading, isOpen, isEdit, data, totalCount, currentPage, pageSize
    } = this.state;
    return (
      <div className="text-center">
        <button type="button" className="btn btn-danger btn-lg btn-block" onClick={() => { this.showAddDialog(); }}><strong>Añadir comercial</strong></button>
        <div className="card card-table">
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
                { columnName: 'login', direction: 'asc' }
              ]}
              columnExtensions={[
                { columnName: 'actions', sortingEnabled: false }
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
          {loading && <div className="sk-circle12 sk-child" />}

          <AddUserAdmin
            modalTitle={isEdit ? 'Editar comerciales' : 'Crear comercial'}
            formButtonText={isEdit ? 'Editar comercial' : 'Añadir comercial'}
            isOpen={isOpen}
            onSubmit={isEdit ? this.updateUser : this.createUser}
            isEdit={isEdit}
            data={data}
          />
        </div>
        <Row>
          <Col xs="1">
            {/*<button className="btn btn-primary btn-block" onClick={() => { this.showAddDialog(); }}>
              <i className="icon-plus" />
    </button>*/}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Comerciales;
