require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors');
const NewsAPI = require('newsapi');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const searchNews = (q, from, to, language) =>
    newsapi.v2
        .everything({
            q,
            from,
            to,
            language,
            // sortBy: 'publishedAt',
            pageSize: 100,
            page: 1,
        })
        .then((response) => response)
        .catch((err) => err);
const getTopNews = (country, category) =>
    newsapi.v2
        .topHeadlines({
            category,
            country,
        })
        .then((response) => response)
        .catch((err) => err);

app.use(cors());

app.get('/search-news', (req, res) => {
    const query = req.query.q;
    const from = req.query.from || '';
    const to = req.query.to || '';
    const language = req.query.language || '';
    searchNews(query, from, to, language)
        .then((response) => {
            if (response.status === 'ok') {
                res.json(response);
            } else {
                res.json({
                    status: 'error',
                    message:
                        'Woops! Something went wrong! Please, change the parameters and try again!',
                });
            }
        })
        .catch((error) => console.log(error));
});
app.get('/top-news', (req, res) => {
    const country = req.query.country;
    const category = req.query.category || '';
    getTopNews(country, category)
        .then((response) => {
            if (response.status === 'ok') {
                res.json(response);
            } else {
                res.json({
                    status: 'error',
                    message:
                        'Woops! Something went wrong! Please, change the parameters and try again!',
                });
            }
        })
        .catch((error) => console.log(error));
});
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build/static')));
    app.get('/', (req, res) => {
        res.sendfile(path.join(__dirname, 'client/build/index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/public/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`server listening on PORT: ${PORT}`);
});
