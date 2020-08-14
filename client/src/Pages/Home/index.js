import React, { useState, useEffect } from 'react';
import { useCountry } from '../../hooks/country-hook';
import { Toolbar, Typography } from '@material-ui/core';
import { CountryPicker } from '../../components/CountryPicker';
import ArticlesList from '../../components/ArticlesList';
import { countryNames } from '../../constants';

function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const { country } = useCountry();

    useEffect(() => {
        let getTopNews = async () => {
            setErrorMessage(null);
            const url = new URL(window.location.href + 'top-news');
            url.searchParams.append('country', country);
            setLoading(true);
            let data = await fetch(url.href);
            let response = await data.json();

            if (response.status === 'ok') {
                setLoading(false);
                if (response.articles.length === 0) {
                    setErrorMessage(
                        '0 Articles found! Change the Country and try again!'
                    );
                } else {
                    setErrorMessage(null);
                    setArticles(response.articles);
                }
            } else {
                setLoading(false);
                setErrorMessage(
                    'Oops! Something went wrong! Please try again!'
                );
            }
        };
        getTopNews();
        setCountryName(countryNames[country]);
    }, [country]);
    return (
        <div>
            <Toolbar>
                <CountryPicker />
            </Toolbar>
            <Typography variant="h2" align="center">
                Top News in {countryName}
            </Typography>

            <ArticlesList
                articles={articles}
                errorMessage={errorMessage}
                loading={loading}
            />
        </div>
    );
}
export default Home;
