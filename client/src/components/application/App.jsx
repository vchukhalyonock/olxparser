import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../login';
import Dashboard from "../dashboard";
import { withStyles } from "@material-ui/core";
import Header from "../header";
import Copyright from "../copyright";

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
                <div className={classes.root}>
                    <Header title="Dashboard"/>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Dashboard />
                        <Copyright />
                    </main>
                </div>
                )
        } else {
            return (
                <Login/>
            )
        }
    }
}

const mapStateToProps = state => ({
    token: state.auth.token
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
