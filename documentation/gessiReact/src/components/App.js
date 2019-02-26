// Dependencies
import React, { Component } from 'react';
//Redux dep
//import {connect} from "react-redux";

//import field.
/*import Form from "./Form/form";*/
import SimpleForm from "./Form/reduxForm";


//import reducer from '../reducers/combineReducers';
//import {fetchFacturas} from '../actions/facturaActions'
//import {testLoad} from '../actions/testAction'

class App extends Component {
  //IMPORTANT!!! WE NEED TO CALL THE SETVALUES() HERE(depending of when and what we need to do).
  /*componentWillMount(){
    this.props.setFacturas();
  }*/
  render() {
    return (
   <div className = 'wrapper' >
      <SimpleForm />
  </div>   
    );
  }
}
/*const mapStateToProps = (state) => {
  ///Here something bad xD
  return{
      facturas : state.facturaReducer.facturas,
  }
}*/
//const fecth = fetchFacturas();
/*const mapDispatchToProps = (dispatch) => {
  return {
      setFacturas : () =>{
        dispatch({
          type: 'FETCH_FACTURA',
          payload :fetchFacturas
        })
      }
  }
};*/
//export default connect(mapStateToProps,mapDispatchToProps)(App)
export default App