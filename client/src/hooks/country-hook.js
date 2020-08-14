import React, { createContext, useState, useContext, useEffect } from 'react';
const CountryContext = createContext();

export default function CountryProvider({ children }) {
    const [country, setCountry] = useState(null);
    useEffect(() => {
        const getInitCountry = async () => {
            var endpoint =
                'http://ip-api.com/json/?fields=status,message,countryCode';
            let res = await fetch(endpoint);
            let { countryCode } = await res.json();
            if (countryCode) {
                setCountry(countryCode.toLowerCase());
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
