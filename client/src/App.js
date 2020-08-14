import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import Search from './Pages/Search';
import Home from './Pages/Home';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#efebe9',
        },
        secondary: {
            main: '#ff9800',
        },
    },
});
function App() {
    return (
        <Router>
            <Fragment>
                <ThemeProvider theme={theme}>
                    <Navbar />
                    <Switch>
                        <Route path="/search">
                            <Search />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </ThemeProvider>
            </Fragment>
        </Router>
    );
}

export default App;
