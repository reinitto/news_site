import React, { useMemo } from 'react';
import { Typography, makeStyles, CircularProgress } from '@material-ui/core';
import NewsCard from '../NewsCard';

const useStyles = makeStyles((theme) => {
    return {
        newsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: 'auto',
            maxWidth: '80%',
            justifyContent: 'center',
        },
        loadingContainer: {
            width: '100%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorContainer: {
            display: 'flex',
            justifyContent: 'center',
        },
    };
});

let ArticlesList = ({ articles, errorMessage, loading }) => {
    const memoizedArticles = useMemo(() => articles, [articles]);
    const classes = useStyles();
    if (loading) {
        return (
            <div className={classes.loadingContainer}>
                <CircularProgress
                    disableShrink={true}
                    thickness={5}
                    size={200}
                    color="secondary"
                />
            </div>
        );
    }
    if (errorMessage) {
        return (
            <div className={classes.errorContainer}>
                <Typography>{errorMessage}</Typography>
            </div>
        );
    }
    return (
        <div className={classes.newsContainer}>
            {memoizedArticles.map(
                (
                    {
                        source,
                        author,
                        title,
                        description,
                        url,
                        urlToImage,
                        publishedAt,
                        content,
                    },
                    i
                ) => {
                    return (
                        <NewsCard
                            cols={1}
                            key={author + i}
                            source={source}
                            author={author}
                            title={title}
                            description={description}
                            url={url}
                            urlToImage={urlToImage}
                            publishedAt={publishedAt}
                            content={content}
                        />
                    );
                }
            )}
        </div>
    );
};

export default ArticlesList;
