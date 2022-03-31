import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalProvider from '../src/contexts/provider';


const LayoutContainer = React.lazy(() =>
    import('./routes').then(({ Layout }) => ({ default: Layout }))
);

function App() {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <React.Suspense fallback={<h1>Loading...</h1>}>
                    {/* <SideBar></SideBar> */}
                    <LayoutContainer />
                    {/* </Header> */}

                    {/* <Banner></Banner> */}
                </React.Suspense>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;
