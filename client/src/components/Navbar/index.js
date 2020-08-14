import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Navbar() {
    const [value, setValue] = useState(window.location.pathname);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <nav>
            <AppBar position="sticky">
                <Toolbar>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab
                            component={Link}
                            underline="none"
                            to="/"
                            label="Top News"
                            value={'/'}
                        />
                        <Tab
                            component={Link}
                            underline="none"
                            to="/search"
                            label="Search News"
                            value={'/search'}
                        />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </nav>
    );
}

export default Navbar;
