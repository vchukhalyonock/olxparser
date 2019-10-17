import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";


import Login from "./components/login";
import {Provider} from "react-redux";

const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <Login/>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

