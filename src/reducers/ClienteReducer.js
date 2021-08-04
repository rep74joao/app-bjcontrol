const initialState = {
    clientes:null,
 }

export default(state = initialState, action = {}) => {
    switch(action.type){
        case 'setClientes':
            return {...state, clientes:action.payload.clientes};
            break;
        default:
                return state;
    }
}