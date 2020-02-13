import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import {
    DASHBOARD_PATH,
    CREATE_IMPORT_REQUEST_PAGE_PATH,
    EDIT_IMPORT_REQUEST_PAGE_PATH,
    IMPORT_REQUESTS_PAGE_PATH,
    OFFERS_PAGE_PATH,
    OFFER_DETAILS_PATH,
    EDIT_OFFERS_PAGE_PATH,
    HEADINGS_PAGE_PATH
} from "../constants/router";
import Dashboard from "../pages/dashboard";
import {
    ImportRequestsContainer,
    ImportRequestsFormContainer
} from "../pages/importRequests";
import {
    OffersContainer,
    OfferDetailsContainer,
    OffersFormContainer
} from "../pages/offers";
import {
    HeadingsContainer
} from "../pages/headings";

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

        <Route
            exact
            path={`${OFFERS_PAGE_PATH}/:importRequestId`}
            component={OffersContainer}
        />
        <Route
            exact
            path={`${OFFER_DETAILS_PATH}/:offerId`}
            component={OfferDetailsContainer}
        />
        <Route
            exact
            path={`${EDIT_OFFERS_PAGE_PATH}/:offerId`}
            component={OffersFormContainer}
        />
        <Route
            exact
            path={HEADINGS_PAGE_PATH}
            component={HeadingsContainer}
        />
    </Switch>
);
