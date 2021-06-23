import React, {createContext, useReducer} from 'react';
import {initialState, ClienteReducer} from '../reducers/ClienteReducer';

export const ClienteContext = createContext();

export default ({children}) => {
    const [state, dispatch] = useReducer(ClienteReducer, initialState);

    return(
        <ClienteContext.Provider value={{state, dispatch}}>
            {children}
        </ClienteContext.Provider>
    )
}