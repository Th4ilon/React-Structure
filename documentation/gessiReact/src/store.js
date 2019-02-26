//redux
import { createStore, applyMiddleware } from "redux";
//Pre created middleware.
import logger from 'redux-logger';
//Pre created middleware
import thunk from 'redux-thunk';
//helper for the asyc call
import promise from "redux-promise-middleware";

//Reducers
import reducers from "./reducers/combineReducers";

//const
//My middleware.
const myMiddleware = applyMiddleware(logger,thunk,promise())
//dev tools, use by the browser addon for redux
const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//Create Store
const store = createStore(reducers,devTool,myMiddleware);

export default store;
/*const initialState = {
    fetching : false,
    fetch : false,
    facturas : [],
    err: null
}
//make sure dont mutated any values.
const reducer  = (state = initialState, action)=> {
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
    return state;
}
//url of the server function(POST, Query body)
const url = "http://192.168.11.126:8080/gesii/factura/expedidas" 
//init the middleware
const myMiddleware = applyMiddleware(promise(),thunk,logger);

// conf for the redux dev tool on chrome
const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//Connection confg
const connectionConfg = {
    payload : axios({ 
        method: 'POST',
        url: url, 
        headers: { //header conf of the axios
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}, 
        params: { //Use fot query string on the url
            entidad: 'A93139053',
            ejercicio : '2017',
            pdte:'0',
            size : '10'   } 
          })
}
//init of the sotore
const store = createStore(reducer, devTool, myMiddleware);


//Dispatch the store so the activation can occurr
store.dispatch((dispatch)=>{
    dispatch({
        type : 'FETCH_FACTURA',
        payload : connectionConfg.payload
    })
    //WithOut redux-promise-middleWare. ES6 is required to handle the promise
    /*axios({ 
        method: 'POST',
        url: 'http://192.168.11.126:8080/gesii/factura/expedidas', 
        headers: { //header conf of the axios
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}, 
        params: { //Use fot query string on the url
            entidad: 'A93139053',
            ejercicio : '2017',
            pdte:'0',
            size : '10'   } 
          })
    .then((response)=>{
        dispatch({type: 'RECIVE_DATA', payload : response.data.content})
    }).catch((Err)=>{
        dispatch({type: 'ERR'})
    })*/
//})