import { merge } from 'lodash';
import {
    GET_CALLCENTER_IMPORT_REQUEST,
    GET_CALLCENTER_IMPORT_REQUESTS,
    CREATE_CALLCENTER_IMPORT_REQUEST,
    UPDATE_CALLCENTER_IMPORT_REQUEST,
    DELETE_CALLCENTER_IMPORT_REQUEST,
    UPDATE_CALLCENTER_IMPORT_REQUEST_STATUS
} from "../constants/actions";
import {
    CALLCENTER_IMPORT_REQUESTS_URL
} from "../constants/urls";
import config from '../config';
import rest from "../utils/rest";
import { METHODS } from "../constants/methods";

const url = `${config.backendUrl}${CALLCENTER_IMPORT_REQUESTS_URL}`;
const defaultQuery = {
    offset: 0,
    limit: 10,
    search: ''
};


const getImportRequests = (incomingQuery = {}) => async dispatch => {
    const queryData = merge(defaultQuery, incomingQuery);
    const responseData = await rest(url, METHODS.GET, queryData);
    dispatch({ type: GET_CALLCENTER_IMPORT_REQUESTS, payload: responseData });
};

const getImportRequest = (id) => async dispatch => {
    const responseData = await rest(`${url}/${id}`, METHODS.GET);
    dispatch({ type: GET_CALLCENTER_IMPORT_REQUEST, payload: responseData });
};

const createImportRequest = (importRequest) => async dispatch => {
    const responseData = await rest(url, METHODS.POST, importRequest);
    dispatch({ type: CREATE_CALLCENTER_IMPORT_REQUEST, payload: responseData });
};


const updateImportRequest = (importRequest) => async dispatch => {
    const responseData = await rest(url, METHODS.PUT, importRequest);
    dispatch({ type: UPDATE_CALLCENTER_IMPORT_REQUEST, payload: responseData });
};


const deleteImportRequest = (id) => async dispatch => {
    await rest(`${url}/${id}`, METHODS.DELETE);
    dispatch({ type: DELETE_CALLCENTER_IMPORT_REQUEST, payload: { id } });
};

const updateImportRequestStatus = (id, status) => async dispatch => {
    await rest(`${url}/status`, METHODS.PUT, { id, status });
    dispatch({ type: UPDATE_CALLCENTER_IMPORT_REQUEST_STATUS, payload: { id, status } });
};

export {
    getImportRequest,
    getImportRequests,
    createImportRequest,
    updateImportRequest,
    deleteImportRequest,
    updateImportRequestStatus
}
