import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

const LayoutContainer = React.lazy(() =>
    import('./routes').then(({ Layout }) => ({ default: Layout }))
);

function App() {
    return (
        <BrowserRouter>
            <React.Suspense fallback={<h1>Loading...</h1>}>
                {/* <SideBar></SideBar> */}
                <LayoutContainer />
                {/* </Header> */}

                {/* <Banner></Banner> */}
            </React.Suspense>
        </BrowserRouter>
    );
}

export default App;
