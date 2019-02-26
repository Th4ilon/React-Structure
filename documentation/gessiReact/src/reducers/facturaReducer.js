//Initial States
const initialStateFacturaList = {
    facturas : [],
    fetching : false,
    fetch : false,
    err: '',
}
const InitialStateExpedidas = {
    factura : {},
    fetching : false,
    fetch : false,
    err: '',

}
export const facturaReducerExpedida  = (state ={}, action)=> {
    switch (action.type){
        case 'FETCH_EXPEDIDA_PENDING' : {
            return {factura : {}}
        }
        case 'FETCH_EXPEDIDA_FULFILLED':{
            return {factura : action.payload.data}
        }
        case 'FETCH_EXPEDIDA_REJECTED':{
            return {...state, err : action.payload.messege}
        }
        default: { return state}
     }
}
//Load the initial state and  set the reducer on firee!
export const facturaReducerTen  = (state =initialStateFacturaList, action)=> {
    switch (action.type){
        case 'FETCH_FACTURA_SUBMIT_PENDING' : {
            return {...state, fetching : true, facturas : [], err: ''}
        }
        case 'FETCH_FACTURA_SUBMIT_FULFILLED':{
            return {...state, fetch: true, facturas : action.payload.data.content, fetching : false,  err: ''}
        }
        case 'FETCH_FACTURA_SUBMIT_REJECTED':{
            return {...state, err : action.payload.response.status + ' : '+ action.payload.response.statusText}
        }
        default: { return state}
     }
}
//import {fetchExpedida} from '../actions/facturaActions'
//const LOAD = fetchExpedida() 

export const loadReducer = (state ={},action)=>{
    switch (action.type) {
        case 'LOAD':
            return{
                factura : action.factura
            }
        case 'LOAD_COMBO':
            return{
                combos : action.combos
            }    
        default:
            return state
    }
}

//------------------------------------------------------------------------
/*
const LOAD = 'redux-form-examples/account/LOAD'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data
      }
    default:
      return state
  }
}


 * Simulates data loaded into this reducer from somewhere
 
export const load = data => ({ type: LOAD, data })

export default reducer


*/
//-------------------------------------------------------------------
//ES6 way to do it
/*export default function reducer(state = {
    facturas : [],
    fetching : false,
    fetch : false,
    err: null
}, action){
    switch (action.type){
        case 'FETCH_FACTURA_PENDING' : {
            return {...state, fetching : true}
        }
        case 'FETCH_FACTURA_FULFILLED':{
            return {...state, fetch: true, factura : action.payload.data.content}
        }
        case 'ERR':{
            return {...state, err : action.payload.data.content}
        }
    }
}*/