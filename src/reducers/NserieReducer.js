export const initialState = {
    nseries:'',
 }

export const NserieReducer = (state, action) => {
    switch(action.type){
        case 'setNseries':
            return {...state, nseries:action.payload.nseries};
            break;
        default:
                return state;
    }
}