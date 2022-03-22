import React, { useState, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

const LayoutContainer = React.lazy(() =>
    import('./routes').then(({ Layout }) => ({ default: Layout }))
);

const AppContext = createContext({
    isLogin: false,
    setIsLoginState: (val: boolean) => {
        return;
    },
});

function App() {
    const [isLogin, setIsLogin] = useState(false);

    const setIsLoginState = (val: boolean): void => {
        return setIsLogin(val);
    };

    return (
        <BrowserRouter>
            <AppContext.Provider value={{ isLogin, setIsLoginState }}>
                <React.Suspense fallback={<h1>Loading...</h1>}>
                    {/* <SideBar></SideBar> */}
                    <LayoutContainer />
                    {/* <Banner></Banner> */}
                </React.Suspense>
            </AppContext.Provider>
        </BrowserRouter>
    );
}

export default App;
