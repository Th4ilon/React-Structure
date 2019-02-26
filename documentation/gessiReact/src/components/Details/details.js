import React, { Component } from 'react';

//My Action
import { fetchExpedida,combofill } from "../../actions/facturaActions";
//redux-form asked
import { Field, reduxForm} from 'redux-form'
//components imports
import Label from "../Form/label";
//import { Input, Button, Message } from 'semantic-ui-react';
import {connect} from "react-redux";
//components
import { renderInput } from '../input/input';
import { renderSelect } from '../Select/select';

//DatosEstadoTop
  const datosEstadoRegistro = field => (
    <React.Fragment>
       <h6>{field.title && field.title}</h6>
        <Field  name="codigoError" component={renderInput} readOnly ='true' name ='codigoError'  label='Código Error'/>
        <Field  name="descripcionError" readOnly='true' component={renderInput} label ='Descripcion Error'/>
        <Field  name="estado" readOnly='true' component={renderInput} label ='Estado'/>
        <Field  name="idFacturaExpedida" readOnly='true' component={renderInput} label = 'Identificador interno' />
        <hr/>
    </React.Fragment>
  );
//DATOS TITULAR
const datosTitular = field => (
    <React.Fragment>
        <h6>{field.title && field.title}</h6>
        <Field  name="nombreRazon" component={renderInput} readOnly ='true'  label='Nombre o Razón Social'/>
        <Field  name="nif" readOnly='true' component={renderInput} label ='NIF Titular'/>
        <Field  name="nifrepresentanteLegal"  component={renderInput} label ='NIF Representante Legal'/>
        <hr/>
    </React.Fragment>
  );
//DATOS PERÍODO
const datosPeriodo = field =>(
    <React.Fragment>
        <h6>{field.title && field.title}</h6>
        <Field  name='ejercicio' readOnly ='true' component={renderInput} label='Ejercicio'/>
        <Field  name='periodo' readOnly='true' component={renderInput} label ='Período'/>
        <hr/>
    </React.Fragment>
)
//DATOS CABECERA FACTURA
const datosCabeceraFactura = field =>(
  <React.Fragment>
        <h6>{field.title && field.title}</h6>
        <Field  name='nifEmisorFactura' readOnly='true' component={renderInput}  label ='NIF Emisor Factura'/>
        <Field  name='numSerieFacturaEmisor' readOnly='true' component={renderInput} label ='Nro. Factura Emisor'/>
        <Field  name='fechaExpedicionFacturaEmisor' readOnly='true' component={renderInput} label ='Fecha Expedición Factura Emisor'/>
        <br/>
        <Field name = 'tipoFactura' component={renderSelect} children={field.children && field.children.tipoFactura} label = 'Tipo Factura'/>
        <Field name = 'tipoRectificativa' component={renderSelect} children={field.children && field.children.tipoRectificativa} label = 'Tipo Rectificativa'/>
        <hr/>
  </React.Fragment>
    )
//DATOS FACTURA RECTIFICATIVA
const datosFacturaRectificativa = field =>(
  <React.Fragment>
    <h6>{field.title && field.title}</h6>
    <div>    
      <Field  name='facturasRectificadasEmiNum0'  component={renderInput} label='Nº Factura Emisor 1'/>
      <Field  name='facturasRectificadasEmifech0'  component={renderInput} label ='Fecha Expedición Factura Emisor 1'/>
    </div> 
      <Field  name='baseRectificada'  component={renderInput} label='Base Rectificada'/>
      <Field  name='cuotaRectificada'  component={renderInput} label ='Cuota Rectificada'/>
      <Field  name='cuotaRecargoRectificado'  component={renderInput} label='Cuota Recargo Rectificado'/>
    <hr/>
  </React.Fragment>
)
//DATOS FACTURA
const datosFactura = field =>(
  <React.Fragment>
    <h6>{field.title && field.title}</h6>
      <Field  name='fechaOperacion' readOnly ='true' component={renderInput} label='Fecha Operación'/>
      <Field  name='claveRegimen' readOnly='true' component={renderSelect} children={field.children && field.children.claveRegimenEspecialOTrascendenciaEmi} label ='Clave de Régimen Especial'/>
    <br/>
      <Field  name = 'claveRegimen1' component={renderSelect} children={field.children && field.children.claveRegimenEspecialOTrascendenciaEmi} label = 'Clave Régimen 1'/>
      <Field  name = 'claveRegimen2' component={renderSelect} children={field.children && field.children.claveRegimenEspecialOTrascendenciaEmi} label = 'Clave Régimen 2'/>
      <Field  name='numRegistroAutorizacion' readOnly='true'  component={renderInput} label ='Número Registro Acuerdo Facturación'/>
    
    <br/>
      <Field  name='importeTotal' readOnly='true'  component={renderInput} label ='Importe Total'/>
      <Field  name='baseImponibleAcoste' readOnly='true'  component={renderInput} label ='Base Imponible a coste'/>
    <br/>
      <Field  name='descripcionOperacion' readOnly='true'  component={renderInput} label ='Descripcion Operacion'/>

    <hr/>
  </React.Fragment>
)
//CONTRAPARTE
const contraparte = field =>(
  <React.Fragment>
    <h6>{field.title && field.title}</h6>
    
    <hr/>
  </React.Fragment>
)
//DESGLOSE FACTURA

//DESGLOSE TIPO OPERACIÓN: Prestación Servicios

//DESGLOSE TIPO OPERACIÓN: Entrega Bienes

const loadCombos = combos =>({type : 'LOAD_COMBO', combos})
const loadFactura = factura => ({ type: 'LOAD', factura })
class Details extends Component{
    
    componentWillMount(){
        const idFactura = this.props.match.params.id;
        combofill().then((resolve)=>{
         this.props.loadC(resolve.data)
        });
        fetchExpedida(idFactura).then((resolve)=>{
          this.props.load(resolve.data);
        });
    }   
  
//DATOS ESTADO REGISTRO.

    render(){
        return(
            <form style={{textAlign: 'center'}}>              
             <Field
                name='topRender'
                component={datosEstadoRegistro}
                title = 'DATOS ESTADO REGISTRO'
              />
              <Field
                name='datosTitular'
                component={datosTitular}
                title = 'DATOS TITULAR'
              />
              <Field
                name='datosPeriodo'
                component={datosPeriodo}
                title = 'DATOS PERÍODO'
              />
              <Field
                name='datosCabeceraFactura'
                component={datosCabeceraFactura}
                title = 'DATOS CABECERA FACTURA'
                children ={this.props.combo && this.props.combo}
              />
              <Field
                name='datosFacturaRectificativa'
                component={datosFacturaRectificativa}
                title = 'DATOS FACTURA RECTIFICATIVA'
              />
              <Field
                name='datosFactura'
                component={datosFactura}
                title = 'DATOS FACTURA'
                children ={this.props.combo && this.props.combo}
              />
               <Field
                name='contraparte'
                component={contraparte}
                title = 'CONTRAPARTE'
              />
            
            </form>
        )
    }
  }



  Details =  reduxForm({
    form: 'details',
    
  })(Details)
Details = connect(
  state => ({
    initialValues: state.loadReducer.factura, // pull initial values from account reducer
    combo : state.loadReducer.combos
  }),
  { load: loadFactura,
    loadC : loadCombos
   },
  )(Details);
export default Details;

/*
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState' // a unique identifier for this form
})(InitializeFromStateForm)

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(InitializeFromStateForm)

export default InitializeFromStateForm
*/
///Simple Table component
/*
var TableComponent = React.createClass({
  render: function() {
    // Data
    var dataColumns = this.props.data.columns;
    var dataRows = this.props.data.rows;

    var tableHeaders = (<thead>
          <tr>
            {dataColumns.map(function(column) {
              return <th>{column}</th>; })}
          </tr>
      </thead>);

    var tableBody = dataRows.map(function(row) {
      return (
        <tr>
          {dataColumns.map(function(column) {
            return <td>{row[column]}</td>; })}
        </tr>); });
     
    // Decorate with Bootstrap CSS
    return (<table className="table table-bordered table-hover" width="100%">
        {tableHeaders}
        {tableBody}
      </table>) }});
        

// Example Data
var tableData = {
  columns: ['Service', 'Cost/Unit', 'Unit', 'Units Requested'],
  rows: [{
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'Veterinary Assitance',
    'Cost/Unit': 50,
    'Unit': '1 Hour',
    'Units Requested': 12
  }, {
    'Service': 'foo',
    'Unit': null,
    'Cost/Unit': undefined,
    'Units Requested': 42
  }]
};
*/



/*
  const loadFactura = id => ({ type: 'FETCH_EXPEDIDA', payload : fetchExpedida(id) })
class Details extends Component{
    
    componentWillMount(){
        const idFactura = this.props.match.params.id;
        this.props.load(idFactura)
      }    
  
      //DATOS ESTADO REGISTRO.
      
          render(){
              const { handleSubmit } = this.props;
             
              return(
                  <form>
                      <h6>DATOS ESTADO REGISTRO</h6>
                      <Field id ="Codigo de error" name="nombreRazon" component='input' />
                      
                  </form>
              )
          }
      }
        Details =  reduxForm({
          form: 'details',
          
        })(Details)
      Details = connect(
        state => ({
          initialValues: state.facturaReducerExpedida.factura // pull initial values from account reducer
        }),
        { load: loadFactura }
          )(Details);
      export default Details;
      

*/
//WithOut pending..
/*const loadFactura = factura => ({ type: 'LOAD', factura })
class Details extends Component{
    
    componentWillMount(){
        const idFactura = this.props.match.params.id;
       
        fetchExpedida(idFactura).then((resolve)=>{
          this.props.load(resolve.data);
        });
    }   
  
//DATOS ESTADO REGISTRO.

    render(){
        const { handleSubmit } = this.props;
       
        return(
            <form>
                <h6>DATOS ESTADO REGISTRO</h6>
                <Field id ="Codigo de error" name="nombreRazon" component='input' />
                
            </form>
        )
    }
  }



  Details =  reduxForm({
    form: 'details',
    
  })(Details)
Details = connect(
  state => ({
    initialValues: state.loadReducer.factura // pull initial values from account reducer
  }),
  { load: loadFactura }
    )(Details);
export default Details;
*/


//Redux-LOAD.
/*const mapStateToProps = (state) =>{
    //fetch
    return{
        factura : state.facturaReducerExpedida.factura
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //init
        setFacturasExpedida : (idFactura) =>{
          dispatch({
            //fill this data.
            type: 'FETCH_EXPEDIDA',
            payload : fetchExpedida(idFactura)
          })
        }
    }
  }*/