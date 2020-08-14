import React, { createContext, useState, useContext, useEffect } from 'react';
const CountryContext = createContext();

export default function CountryProvider({ children }) {
    const [country, setCountry] = useState(null);
    useEffect(() => {
        const getInitCountry = async () => {
            var endpoint = 'https://freegeoip.app/json/';
            let res = await fetch(endpoint);
            let { country_code } = await res.json();
            if (country_code) {
                setCountry(country_code.toLowerCase());
            } else {
                setCountry('us');
            }
        };
        getInitCountry();
    }, []);

    return (
        <CountryContext.Provider value={{ country, setCountry }}>
            {children}
        </CountryContext.Provider>
    );
}
export const useCountry = () => useContext(CountryContext);
