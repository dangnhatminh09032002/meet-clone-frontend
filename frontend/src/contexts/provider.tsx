import React, { createContext, useReducer } from "react";
import { userDetailReducer, initialUserDetail } from "./";
import { authDetailReducer, initialAuthDetail } from "./auth";
import { meetListReducer, initialMeet } from "./meet";

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
      {props.children}
    </GlobalContext.Provider>
  );
}
