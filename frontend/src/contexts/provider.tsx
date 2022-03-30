import React, { createContext, useReducer } from 'react';

import { userDetailReducer, initialUserDetail } from './';
import { chatDetailReducer, initialChatDetail } from './chat';

export const GlobalContext = createContext({});

export default function GlobalProvider(props: any) {
    const [userDetailState, userDetailDispatch] = useReducer(
        userDetailReducer,
        initialUserDetail
    );

    const [chatDetailState, chatDetailDispatch] = useReducer(
        chatDetailReducer,
        initialChatDetail
    );

    return (
        <GlobalContext.Provider value={{ userDetailState, userDetailDispatch, chatDetailState, chatDetailDispatch }}>
            {props.children}
        </GlobalContext.Provider>
    );
}
