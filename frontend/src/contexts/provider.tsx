import React, { createContext, useReducer } from 'react';
import { userDetailReducer, initialUserDetail } from './';
import { chatDetailReducer, initialChatDetail } from './chat';
import { authDetailReducer, initialAuthDetail } from './auth';

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

    const [authDetailState, authDetailDispatch] = useReducer(
        authDetailReducer,
        initialAuthDetail
    );

    return (
        <GlobalContext.Provider value={{ userDetailState, userDetailDispatch, authDetailState, authDetailDispatch, chatDetailState, chatDetailDispatch }}>
            {props.children}
        </GlobalContext.Provider>
    );
}
