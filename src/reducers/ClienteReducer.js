export const initialState = {
    clientes:'',
 }

export const ClienteReducer = (state, action) => {
    switch(action.type){
        case 'setClientes':
            return {...state, clientes:action.payload.clientes};
            break;
        default:
                return state;
    }
}