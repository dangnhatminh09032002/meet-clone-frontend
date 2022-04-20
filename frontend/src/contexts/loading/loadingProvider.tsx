import React, { useState } from 'react';
import { createContext } from 'react';

export const LoadingContext = createContext({});

function Loading() {
    return <div>Loading...</div>;
}

export function LoadingProvider(props: any) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider
            value={{
                loading: loading,
                show: () => setLoading(true),
                hide: () => setLoading(false)
            }}>
            <>
                {loading && <Loading />}
                {props.children}
            </>
        </LoadingContext.Provider>
    );
}