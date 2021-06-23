import React, {createContext, useReducer} from 'react';
import {initialState, NserieReducer} from '../reducers/NserieReducer';

export const NserieContext = createContext();

export default ({children}) => {
    const [state, dispatch] = useReducer(NserieReducer, initialState);

    return(
        <NserieContext.Provider value={{state, dispatch}}>
            {children}
        </NserieContext.Provider>
    )
}