import React, { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import DayJsUtils from '@date-io/dayjs';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { languages } from '../../constants';
import {
    Button,
    TextField,
    MenuItem,
    Accordion,
    Typography,
    AccordionDetails,
    AccordionSummary,
    makeStyles,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => {
    return {
        searchContainer: {
            maxWidth: '80%',
            margin: 'auto',
        },
        searchTextField: {
            display: 'flex',

            [theme.breakpoints.down(400)]: {
                maxWidth: '100%',
                flexDirection: 'column',
            },
        },
        queryTextField: {
            overflow: 'hidden',
            flexGrow: 1,
            margin: 4,
            [theme.breakpoints.down(400)]: {
                maxWidth: '100%',
                display: 'block',
            },
        },
        queryInput: {
            fontSize: 20,
            textAlign: 'center',
        },
        searchButton: {
            margin: 4,
            [theme.breakpoints.down(400)]: {
                maxWidth: '100%',
                display: 'block',
            },
        },
        advancedSearchContainer: {
            display: 'flex',
            [theme.breakpoints.down(400)]: {
                flexDirection: 'column',
            },
        },
        languageSelect: {
            width: '30%',
            [theme.breakpoints.down(400)]: {
                width: '100%',
            },
        },
        languageOption: {
            textTransform: 'capitalize',
        },
        accordionContainer: {
            maxWidth: 400,
            margin: 4,
            [theme.breakpoints.down(600)]: {
                margin: 'auto',
            },
        },
    };
});

function SearchBar({ setArticles, setErrorMessage, setLoading }) {
    const [minDate] = useState(dayjs(new Date()).subtract(30, 'day'));
    const classes = useStyles();
    const [searchParams, setParams] = useState({
        q: '',
        from: minDate,
        to: new Date(),
        language: 'All',
    });
    let updateParams = (prop, val) => {
        let newParams = { ...searchParams };
        newParams[prop] = val;
        setParams({ ...newParams });
    };

    let getArticles = useCallback(async () => {
        const url = new URL(window.location.origin + '/search-news');
        for (let param in searchParams) {
            if (param) {
                if (param === 'to' || param === 'from') {
                    url.searchParams.append(
                        param,
                        `${dayjs(searchParams[param]).year()}-${
                            dayjs(searchParams[param]).month() + 1
                        }-${dayjs(searchParams[param]).date()}`
                    );
                } else if (param === 'language') {
                    if (!searchParams[param] === 'All') {
                        url.searchParams.append(param, searchParams[param]);
                    }
                } else {
                    url.searchParams.append(param, searchParams[param]);
                }
            }
        }
        setLoading(true);
        setErrorMessage(null);
        let data = await fetch(url.href);
        let response = await data.json();
        if (response.status === 'ok') {
            setLoading(false);
            if (response.articles.length === 0) {
                setErrorMessage(
                    '0 Articles found! Change the search parameters and try again!'
                );
            } else {
                let articles = response.articles.sort(
                    (a, b) => dayjs(b.publishedAt) - dayjs(a.publishedAt)
                );
                setArticles(articles);
            }
        } else {
            setLoading(false);
            setErrorMessage(response.message);
        }
    }, [searchParams, setArticles, setErrorMessage, setLoading]);
    return (
        <div>
            <MuiPickersUtilsProvider utils={DayJsUtils}>
                <form noValidate autoComplete="off" autoFocus={true}>
                    <div className={classes.searchContainer}>
                        <div className={classes.searchTextField}>
                            <TextField
                                required
                                autoFocus={true}
                                fullWidth={true}
                                className={classes.queryTextField}
                                inputProps={{
                                    className: classes.queryInput,
                                }}
                                value={searchParams['q']}
                                onChange={(e) =>
                                    updateParams('q', e.target.value)
                                }
                                error={!searchParams['q']}
                                helperText={
                                    !searchParams['q'] && 'Enter Search term(s)'
                                }
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={!searchParams['q']}
                                onClick={getArticles}
                                className={classes.searchButton}
                            >
                                Search
                            </Button>
                        </div>
                        <div className={classes.accordionContainer}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="advanced search options"
                                >
                                    <Typography>Advanced Search</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div
                                        className={
                                            classes.advancedSearchContainer
                                        }
                                    >
                                        <DatePicker
                                            autoOk
                                            label="From"
                                            clearable
                                            disableFuture
                                            value={searchParams['from']}
                                            minDate={dayjs(minDate)}
                                            onChange={(date) =>
                                                updateParams('from', date)
                                            }
                                        />
                                        <DatePicker
                                            autoOk
                                            label="To"
                                            clearable
                                            disableFuture
                                            value={searchParams['to']}
                                            minDate={dayjs(minDate)}
                                            onChange={(date) =>
                                                updateParams('to', date)
                                            }
                                        />
                                        <TextField
                                            select
                                            className={classes.languageSelect}
                                            label="Language"
                                            value={searchParams['language']}
                                            onChange={(e) =>
                                                updateParams(
                                                    'language',
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem
                                                key="All"
                                                value="All"
                                                className={
                                                    classes.languageOption
                                                }
                                            >
                                                All
                                            </MenuItem>
                                            {Object.keys(languages).map(
                                                (language) => {
                                                    return (
                                                        <MenuItem
                                                            key={language}
                                                            value={language}
                                                            className={
                                                                classes.languageOption
                                                            }
                                                        >
                                                            {
                                                                languages[
                                                                    language
                                                                ]
                                                            }
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </TextField>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </form>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default SearchBar;
