import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import GlobalProvider from '../src/contexts/provider';
import App from './App';


ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
