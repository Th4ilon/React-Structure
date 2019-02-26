import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//redux
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
//helper for the asyc call
import promise from "redux-promise-middleware";
//axios
import  axios  from "axios";

//--------------------------------------------------------------------------------------------------//
//reducer have th logic of the app. passing the initial state
//1** Create areducer.
/*const reducer = (state = Myobj, action) =>{
        console.log('action type : ' ,action.type);
        console.log('action doing : ', state);    
    // state = to the actual state obj and we add the new field. Creating a new state so it can save states
    state = {...state, testText : action.doing}
    return state;
}
const Myobj = {
    id : 1,
    testText : 'testing'
}
 
//recive the reducer and dev tool
//2*** create Store
const store = createStore(reducer,
    //For the dev tool.
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


store.subscribe(()=>{
    console.log("store change", store.getState())
})
// call the store, the action have to have a type action or is not going to work

// fire the action
store.dispatch({type : 'INC', doing : 2})
store.dispatch({type : 'INC', doing : 'back to testing'})
store.dispatch({type : 'INC', doing : 'nothing'})*/
//--------------------------------------------------------------------------------------------------//
//MidelWare.
//Sate with initial state
//actions.
/*const reducer = (initialState = 0, action) =>{
    if (action.type ==='INC') {
        return initialState + action.payload
    }
    else if (action.type ==='DEC') {
        return  initialState - action.payload
    }
    else if (action.type === 'E') {
        throw new Error("Err ocurred");
        
    }
}
//
const logger = (store)=>(next)=>(action)=>{
    console.log('action fired : ', action );
    //next set every action affter is fierd, otherwise the middleware just kills it
    next(action);
}


const Err = (store)=>(next)=>(action)=>{
    try {
        next(action);
    }catch(e){
        console.log('Err has ocurred : ', e)
    }
}

const myMiddleWare = applyMiddleware(logger, Err);
const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// Recive reducer, dev tool(webBrowser tool), and the middlerware
const store = createStore(reducer, devTool, myMiddleWare)

store.dispatch({type : 'INC', payload : 1});
store.dispatch({type : 'INC', payload : 1});
store.dispatch({type : 'INC', payload : 1});
store.dispatch({type : 'DEC', payload : 3});
store.dispatch({type : 'E'});*/
//--------------------------------------------------------------------------------------------------//
//ASYC REDUX
const initialState = {
    fetching : false,
    fetch : false,
    facturas : [],
    err: null
}
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

//init of the sotore
const store = createStore(reducer, devTool, myMiddleware);


store.dispatch((dispatch)=>{
    dispatch({
        type: 'FETCH_FACTURA',
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
    })
    //WithOut redux-promise-middleWare.
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
})

//redux-promises-middleware
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();