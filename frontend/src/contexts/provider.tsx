import React, { createContext, useReducer } from 'react';

import { userDetailReducer, initialUserDetail } from './';

export const GlobalContext = createContext({});

export default function GlobalProvider(props: any) {
    const [userDetailState, userDetailDispatch] = useReducer(
        userDetailReducer,
        initialUserDetail
    );

    return (
        <GlobalContext.Provider value={{ userDetailState, userDetailDispatch }}>
            {props.children}
        </GlobalContext.Provider>
    );
}
