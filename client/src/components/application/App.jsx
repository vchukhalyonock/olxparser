import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { string } from "prop-types";

import Login from '../login';
import Dashboard from "../../pages/dashboard";
import { ImportRequestsContainer } from "../../pages/importRequests/containers";
import Header from "../header";
import Copyright from "../copyright";
import {
    DASHBOARD_PATH,
    IMPORT_REQUESTS_PAGE_PATH
} from "../../constants/router";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    }
});

class App extends Component {
    render() {

        const { classes } = this.props;

        if (this.props.token) {
            return (
                <Router>
                    <div className={classes.root}>
                        <Header title={this.props.menuTitle}/>
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer} />
                            <Switch>
                                <Route exact path={DASHBOARD_PATH}>
                                    <Dashboard />
                                </Route>
                                <Route exact path={IMPORT_REQUESTS_PAGE_PATH}>
                                    <ImportRequestsContainer />
                                </Route>
                            </Switch>
                            <Copyright />
                        </main>
                    </div>
                </Router>
                )
        } else {
            return (
                <Login/>
            )
        }
    }
}

App.propTypes = {
    token: string,
    menuTitle: string.isRequired
};

const mapStateToProps = state => ({
    token: state.auth.token,
    menuTitle: state.menu.title
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
