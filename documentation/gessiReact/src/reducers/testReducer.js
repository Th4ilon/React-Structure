const initialStateB = {
    sup : '',
    test : ''
}

//MY factura reducer, make sure dont mutated any values...
const reducerTest  = (state = initialStateB, action)=> {
    switch (action.type){
        case 'SET_NAME_FULFILLED' :{
            return Object.assign({}, state, {test: action.payload})
        }
        default: { return state}
     }
}

export default reducerTest;