export const initialState = {
    user:'',
 }

export const UserReducer = (state, action) => {
    switch(action.type){
        case 'setUser':
            return {...state, user:action.payload.user};
            break;
        default:
                return state;
    }
}