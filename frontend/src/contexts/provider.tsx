import React, { createContext, useReducer } from "react";
import { initialUserDetail, userDetailReducer } from "./";
import { authDetailReducer, initialAuthDetail } from "./auth";
import AuthProvider from './auth/authProvider';
import { initialMeet, meetListReducer } from "./meet";
import UserProvider from './user/userProvider';

export const GlobalContext = createContext({});

export default function GlobalProvider(props: any) {
  const [userDetailState, userDetailDispatch] = useReducer(
    userDetailReducer,
    initialUserDetail
  );

  const [authDetailState, authDetailDispatch] = useReducer(
    authDetailReducer,
    initialAuthDetail
  );

  const [meetListState, meetListDispatch] = useReducer(
    meetListReducer,
    initialMeet
  );

  return (
    <GlobalContext.Provider
      value={{
        userDetailState,
        userDetailDispatch,
        authDetailState,
        authDetailDispatch,
        meetListState,
        meetListDispatch,
      }}
    >
      <AuthProvider>
        <UserProvider>
          {props.children}
        </UserProvider>
      </AuthProvider>
    </GlobalContext.Provider>
  );
}
