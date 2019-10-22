import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../login';
import Dashboard from "../dashboard";

class App extends Component {
    render() {

        if (this.props.token) {
            return (
                    <Dashboard />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
