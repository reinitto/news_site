import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CountryProvider from './hooks/country-hook';

ReactDOM.render(
    <React.StrictMode>
        <CountryProvider>
            <App />
        </CountryProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
