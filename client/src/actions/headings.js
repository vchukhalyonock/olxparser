import { merge } from 'lodash';
import {
    GET_HEADINGS,
    GET_HEADING,
    CREATE_HEADING,
    UPDATE_HEADING,
    DELETE_HEADING
} from "../constants/actions";
import { HEADINGS_URL } from "../constants/urls";
import config from "../config";
import rest from "../utils/rest";
import { METHODS } from "../constants/methods";

const headingsUrl = `${config.backendUrl}${HEADINGS_URL}`;

const defaultQuery = {
    offset: 0,
    limit: 10,
    search: ''
};

const getHeadings = (incomingQuery = {}) => async dispatch => {
    const queryData = merge(defaultQuery, incomingQuery);
    const responseData = await rest(headingsUrl, METHODS.GET, queryData);
    dispatch({ type: GET_HEADINGS, payload: responseData });
};


const getHeading = id => async dispatch => {
    const responseData = await rest(`${headingsUrl}/${id}`, METHODS.GET);
    dispatch({ type: GET_HEADING, payload: responseData });
};


const createHeading = heading => async dispatch => {
    const responseData = await rest(headingsUrl, METHODS.POST, heading);
    dispatch({ type: CREATE_HEADING, payload: responseData });
};

const updateHeading = (id, heading) => async dispatch => {
    const responseData = await rest(`${headingsUrl}/${id}`, METHODS.PUT, heading);
    dispatch({ type: UPDATE_HEADING, payload: responseData });
};


const deleteHeading = id => async dispatch => {
    await rest(`${headingsUrl}/${id}`, METHODS.DELETE);
    dispatch({ type: DELETE_HEADING, payload: { id } });
};

export {
    getHeadings,
    getHeading,
    createHeading,
    updateHeading,
    deleteHeading
}
