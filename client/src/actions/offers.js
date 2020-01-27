import { merge } from 'lodash';
import {
    GET_OFFERS,
    GET_OFFER,
    UPDATE_OFFER,
    DELETE_OFFER
} from "../constants/actions";
import {
    OFFER_URL,
    OFFERS_URL
} from "../constants/urls";
import config from "../config";
import rest from "../utils/rest";
import { METHODS } from "../constants/methods";

const offersUrl = `${config.backendUrl}${OFFERS_URL}`;
const offerUrl = `${config.backendUrl}${OFFER_URL}`;

const defaultQuery = {
    offset: 0,
    limit: 10,
    search: ''
};

const getOffers = (importRequestId, incomingQuery = {}) => async dispatch => {
    const queryData = merge(defaultQuery, incomingQuery);
    const responseData = await rest(`${offersUrl}/${importRequestId}`, METHODS.GET, queryData);
    dispatch({ type: GET_OFFERS, payload: responseData });
};

const getOffer = id => async dispatch => {
    const responseData = await rest(`${offerUrl}/${id}`, METHODS.GET);
    dispatch({ type: GET_OFFER, payload: responseData });
};


const updateOffer = offer => async dispatch => {
    const responseData = await rest(offerUrl, METHODS.PUT, offer);
    dispatch({ type: UPDATE_OFFER, payload: responseData, offer });
};


const deleteOffer = id => async dispatch => {
    await rest(`${offerUrl}/${id}`, METHODS.DELETE);
    dispatch({ type: DELETE_OFFER, payload: { id } });
};

export {
    getOffer,
    getOffers,
    updateOffer,
    deleteOffer
}
