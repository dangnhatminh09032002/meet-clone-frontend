import React, { createContext, useReducer } from "react";
import { userDetailReducer, initialUserDetail } from "../../contexts/user";

import { HomePage } from "../../pages/home/HomePage";

const UserContext = createContext({});

export const HomeContainer = (props: any) => {
  const [userDetailState, userDetailDispatch] = useReducer(
    userDetailReducer,
    initialUserDetail
  );

  return (
    <UserContext.Provider value={{ userDetailState, userDetailDispatch }}>
      <HomePage />
    </UserContext.Provider>
  );
};
