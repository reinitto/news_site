import React from 'react';
import { ButtonGroup, Button, makeStyles } from '@material-ui/core';
import { useCountry } from '../../hooks/country-hook';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '../../constants';

const useStyles = makeStyles((theme) => {
    return {
        buttonGroup: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        flagButton: {
            backgroundColor: theme.palette.primary.light,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
            '& span img': {
                width: '2rem!important',
                height: '2rem!important',
            },
        },
        flagButtonActive: {
            backgroundColor: theme.palette.secondary.light,
            transform: 'scale(1.2)',
            zIndex: 100,
        },
    };
});

export const CountryPicker = () => {
    const { country, setCountry } = useCountry();
    const classes = useStyles();
    return (
        <ButtonGroup className={classes.buttonGroup}>
            {countries.map((countryCode, i) => {
                return (
                    <Button
                        key={`${countryCode + i}`}
                        className={`${classes.flagButton} ${
                            country === countryCode
                                ? classes.flagButtonActive
                                : ''
                        }`}
                    >
                        <ReactCountryFlag
                            countryCode={countryCode}
                            svg
                            title={countryCode}
                            onClick={() => setCountry(countryCode)}
                        />
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default CountryPicker;
