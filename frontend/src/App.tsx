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


// export function divide(a: number, b: number): number {
  
//     if (b === 0) {
//       throw new Error("You can't divide by zero.");
//     }

//     return Math.round(a / b);
//   }
