import React, { createContext, useReducer } from 'react';
import { initialUserDetail, userDetailReducer } from './';
import { authDetailReducer, initialAuthDetail } from './auth';
import AuthProvider from './auth/authProvider';
import { initialLoading, loadingReducer } from './loading';
import { initialMeet, meetListReducer } from './meet';
import UserProvider from './user/userProvider';

export const GlobalContext = createContext({});

export default function GlobalProvider(props: any) {
    const [userDetailState, userDetailDispatch] = useReducer(userDetailReducer, initialUserDetail);

    const [authDetailState, authDetailDispatch] = useReducer(authDetailReducer, initialAuthDetail);

    const [meetListState, meetListDispatch] = useReducer(meetListReducer, initialMeet);

    const [loadingState, loadingDispatch] = useReducer(loadingReducer, initialLoading);

    return (
        <GlobalContext.Provider
            value={{
                loadingState,
                loadingDispatch,
                userDetailState,
                userDetailDispatch,
                authDetailState,
                authDetailDispatch,
                meetListState,
                meetListDispatch,
            }}
        >
            <AuthProvider>
                <UserProvider>{props.children}</UserProvider>
            </AuthProvider>
        </GlobalContext.Provider>
    );
}
