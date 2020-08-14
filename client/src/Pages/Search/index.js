import React, { useState } from 'react';
import ArticlesList from '../../components/ArticlesList';
import SearchBar from '../../components/SearchBar';
import { Typography } from '@material-ui/core';

function Search() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <div>
            <Typography variant="h3" align="center">
                Search Page
            </Typography>
            <SearchBar
                setArticles={setArticles}
                setErrorMessage={setErrorMessage}
                setLoading={setLoading}
            />
            <ArticlesList
                articles={articles}
                errorMessage={errorMessage}
                loading={loading}
            />
        </div>
    );
}

export default Search;
