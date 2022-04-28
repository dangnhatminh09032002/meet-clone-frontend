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
                <React.Suspense fallback={false}>
                    <LayoutContainer />
                </React.Suspense>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;
