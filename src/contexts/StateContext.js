import React, {createContext, useContext, useReducer} from 'react'

import UserReducer from '../reducers/UserReducer'
import NserieReducer from '../reducers/NserieReducer'
import ClienteReducer from '../reducers/ClienteReducer'

const initialState = {
    user: UserReducer(),
    nseries: NserieReducer(),
    clientes: ClienteReducer(),
}

const MainReducer = (state, action) => ({
    user: UserReducer(state.user, action),
    nseries: NserieReducer(state.nseries, action),
    clientes: ClienteReducer(state.clientes, action),
})

export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer(MainReducer, initialState);

    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)