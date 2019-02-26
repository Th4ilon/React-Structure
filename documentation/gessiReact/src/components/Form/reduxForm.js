import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, Button, Message } from 'semantic-ui-react';
import {connect} from "react-redux";
//Router link
import { Link } from 'react-router-dom';
//Actions
import { loadTenFacturas } from "../../actions/facturaActions";

//Componentes
import Label from "./label";
//PreValues.
const entidad =[
{ id: 0, value: 'A93139053', text: 'UNICAJA BANCO S.A.' },
{ id: 1, value: 'G93040566', text: 'UNICAJA - FUNDACION BANCARIA' },
{ id: 2, value: 'A86289642', text: 'ESPAÑA DUERO' },
{ id: 3, value: 'B92954197', text: 'GESTION DE INMUEBLES ADQUIRIDOS' }]
const ejercicio =[
 { id: 0, value: '2018', text: '2018' },
 { id: 1, value: '2017', text: '2017' }]
const periodo =[
{ id: 0, value: '00', text: 'Cualquiera' },
{ id: 1, value: '01', text: 'ENERO' },
{ id: 2, value: '02', text: 'FEBRERO' },
{ id: 3, value: '03', text: 'MARZO' },
{ id: 4, value: '04', text: 'ABRIL' },
{ id: 5, value: '05', text: 'MAYO' },
{ id: 6, value: '06', text: 'JUNIO' },
{ id: 7, value: '07', text: 'JULIO' },
{ id: 8, value: '08', text: 'AGOSTO' },
{ id: 9, value: '09', text: 'SEPTIEMBRE' },
{ id: 10, value: '10', text: 'OCTUBRE' },
{ id: 11, value: '11', text: 'NOVIEMBRE' },
{ id: 12, value: '12', text: 'DICIEMBRE' }]


///-------------------------------------------------------------------------------------------
/*<Field
    label="Entidad"
    name="facturaName"
    component={this.renderSelect}
    >
    {[
    { id: 0, value: 'A93139053', text: 'UNICAJA BANCO S.A.' },
    { id: 1, value: 'G93040566', text: 'UNICAJA - FUNDACION BANCARIA' },
    { id: 2, value: 'A86289642', text: 'ESPAÑA DUERO' },
    { id: 3, value: 'B92954197', text: 'GESTION DE INMUEBLES ADQUIRIDOS' }
    ].map(option => <option key={option.id} value={option.value}>{option.text}</option>)}
    </Field>
    <Field
    name="ejercicio"
    label="Ejercicio"
    component={this.renderSelect}
    >
    {[ { id: 0, value: '2018', text: '2018' }, { id: 1, value: '2017', text: '2017' } ].map(
    option => <option key={option.id} value={option.value}>{option.text}</option>
    )}
    </Field>
    <Field
    name="periodo"
    label="Periodo"
    component={this.renderSelect}
    >
    { [
    { id: 0, value: '00', text: 'Cualquiera' },
    { id: 1, value: '01', text: 'ENERO' },
    { id: 2, value: '02', text: 'FEBRERO' },
    { id: 3, value: '03', text: 'MARZO' },
    { id: 4, value: '04', text: 'ABRIL' },
    { id: 5, value: '05', text: 'MAYO' },
    { id: 6, value: '06', text: 'JUNIO' },
    { id: 7, value: '07', text: 'JULIO' },
    { id: 8, value: '08', text: 'AGOSTO' },
    { id: 9, value: '09', text: 'SEPTIEMBRE' },
    { id: 10, value: '10', text: 'OCTUBRE' },
    { id: 11, value: '11', text: 'NOVIEMBRE' },
    { id: 12, value: '12', text: 'DICIEMBRE' }
    ].map(option => <option key={option.id} value={option.value}>{option.text}</option>) }
    </Field>
    <Field name="fecha" component={this.renderSelect} label="Fecha">
    <option>Cualquiera</option>
    </Field>
    <Field name="paymentName" component={this.renderInput} label="Nombre de la factura" />
    <Field name="errorCode" component={this.renderInput} label="Código de error" />
    
    <Label htmlFor ="location"/>
        <Field id = "location" name="location" component={this.locationInput} /> 
    
    */
///-------------------------------------------------------------------------------------------
class SimpleForm extends Component {

  //THIS IS WHERE I CREATE  THE HTML COMPONENT OF THE ERROR!!
  locationInput({ input, meta: { touched, error }, ...custom }) {
    //touched : if the field was tuched(onChange)
    //Error : error message send from the Error Function.
    const hasError = touched && error !== undefined;
    return (
      <div>
        {hasError &&
          <Message
            error
            header='Error'
            content={error} />
        }
        <Input 
          error={hasError}
          fluid 
          placeholder="Location..."
          {...input}
          {...custom} />
      </div>
    );
  }

  //How I gonna resolve the axios call
  /*submit({ location }, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({ 
        type: 'FETCH_WEATHER',
        location,
        resolve,
        reject 
      });
    }).catch((error) => {
      throw new Error(error);
    });
  }*/

  /*<p>{this.props.facturas && this.props.facturas.map((item) => <li key={item.id}>{item.id}</li>)}</p>
  {console.log(this.props)}*/
  submit({entidad,ejercicio, periodo},dispatch){
    console.log('whats in values : ', entidad, ' : ', ejercicio, ' : ', periodo);
    dispatch({
      type: 'FETCH_FACTURA_SUBMIT',
      payload : loadTenFacturas(entidad, ejercicio, periodo)
    })
  }
 

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='wrraper'>
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Label htmlFor ="Entidad"/>
        <Field id = "Entidad" name="entidad" component='select'  >
            {entidad.map(option => <option key={option.id} value={option.value}>{option.text}</option>)}
        </Field> 
        <Label htmlFor ="Ejercicio"/>
        <Field id = "Ejercicio" name="ejercicio" component='select' >
            {ejercicio.map(
            option => <option key={option.id} value={option.value}>{option.text}</option>)}
        </Field>
        <Label htmlFor ="Periodo"/>  
        <Field id = "Periodo" name="periodo" component='select' >
            { periodo.map(option => <option key={option.id} value={option.value}>{option.text}</option>)}
        </Field>
        <Label htmlFor ="Fecha"/> 
        <Field id = "Fecha" name="fecha" component='select' >
            <option>Cualquiera</option>
        </Field> 
        <br/>
        <Label htmlFor ="Nombre de la factura"/>
        <Field  id = "Nombre de la factura"name="nombredelafactura" component={this.locationInput}/>
        <Label htmlFor ="Codigo de error"/>
        <Field id ="Codigo de error" name="errorCode" component={this.locationInput} />
        <br/> 
        <Button fluid type="submit">Buscar</Button>
      </form>
      
        <div className = 'listFacturas'>
          {this.props.err && <h1>{this.props.err}</h1>}
          {this.props.facturas2 && this.props.facturas2.map((item) => <Link key = {item.id + 123} to ={`/Details/${item.id}`}><li  key={item.id}>{'id: ' + item.id}</li></Link>)}
        </div>
      </div>
    );
  }
}

//HERE I CREATE MY ERRORS
const validate = values => {
  const errors = {}
  if (!values.nombredelafactura || values.nombredelafactura.trim() === '') {
    errors.nombredelafactura = 'Nombre de la factura is requierd'
  } 
  if (!values.errorCode || values.errorCode.trim() === '') {
    errors.errorCode = 'Codigo de error is requierd'
  } 
  return errors
}
function mapStateToProps (state){
  return{
    facturas2 : state.facturaReducerTen.facturas,
    err : state.facturaReducerTen.err
  }
}

SimpleForm = connect(mapStateToProps)(SimpleForm);



export default reduxForm({
  form: 'simple',
  validate
})(SimpleForm)
