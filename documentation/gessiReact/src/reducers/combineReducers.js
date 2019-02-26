import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
//My reducers
import {facturaReducerTen, facturaReducerExpedida, loadReducer} from "./facturaReducer";
import reducerTest from './testReducer'

//all the reducers combine
const reducers = combineReducers({
    reducerTest,
    facturaReducerTen,
    loadReducer,
    facturaReducerExpedida,
    /*Now your store knows how to handle actions coming from the form components.
    NOTE: The key used to pass the redux-form reducer should be named form.
     If you need a custom key for some reason see getFormState config for more details.*/
    form : formReducer
    
})

export default reducers;