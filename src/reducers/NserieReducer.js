 const initialState = {
    nseries:null,
 }

export default(state = initialState, action = {}) => {
    switch(action.type){
        case 'setNseries':
            return {...state, nseries:action.payload.nseries};
            break;
        default:
                return state;
    }
}