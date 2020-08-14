import React from 'react';
import DayJS from 'react-dayjs';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '45%',
        minWidth: 180,
        maxWidth: 345,
        overflow: 'hidden',
        margin: '4px',
        height: 'fit-content',
        flexGrow: 1,
        flexShrink: 1,
    },
});

export default function NewsCard({
    source: { name },
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
}) {
    const classes = useStyles();
    return (
        <Card className={`${classes.root} masonry-card-item`}>
            <CardActionArea
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                style={{ textDecoration: 'none' }}
            >
                <CardMedia
                    component="img"
                    alt={description}
                    height="140"
                    image={
                        urlToImage
                            ? urlToImage
                            : 'https://fakeimg.pl/345x140/?text=Image+Not+Available'
                    }
                    title={description}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {content}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="p">
                        Source:{name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="p">
                        Published:
                        <DayJS format={'HH:mm dddd, MMMM D'}>
                            {publishedAt}
                        </DayJS>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
