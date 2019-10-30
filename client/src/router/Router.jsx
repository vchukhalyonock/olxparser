import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import {
    DASHBOARD_PATH,
    CREATE_IMPORT_REQUEST_PAGE_PATH,
    EDIT_IMPORT_REQUEST_PAGE_PATH,
    IMPORT_REQUESTS_PAGE_PATH
} from "../constants/router";
import Dashboard from "../pages/dashboard";
import {
    ImportRequestsContainer,
    ImportRequestsFormContainer
} from "../pages/importRequests/containers";

export default () => (
    <Switch>
        <Route exact path={DASHBOARD_PATH}>
            <Dashboard />
        </Route>
        <Route
            exact
            path={IMPORT_REQUESTS_PAGE_PATH}
            component={ImportRequestsContainer}
        />
        <Route
            exact
            path={CREATE_IMPORT_REQUEST_PAGE_PATH}
            component={ImportRequestsFormContainer}
        />
        <Route
            exact
            path={`${EDIT_IMPORT_REQUEST_PAGE_PATH}/:importRequestId`}
            component={ImportRequestsFormContainer}
        />
    </Switch>
);
