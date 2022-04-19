import React, { createContext } from "react";
export const UserContext = createContext({});

export default function UserProvider(props: any) {
    return (
        <UserContext.Provider value={{}}>
            {props.children}
        </UserContext.Provider>
    );
}
