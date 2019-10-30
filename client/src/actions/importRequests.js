import {
    GET_IMPORT_REQUESTS,
    GET_IMPORT_REQUEST,
    CREATE_IMPORT_REQUEST,
    UPDATE_IMPORT_REQUEST,
    DELETE_IMPORT_REQUEST,
} from "../constants/reducers";
import { IMPORT_REQUESTS_URL } from "../constants/urls";
import config from '../config';
import rest from "../utils/rest";
import { METHODS } from "../constants/methods";

const url = `${config.backendUrl}${IMPORT_REQUESTS_URL}`;

const getImportRequests = () => async dispatch => {
    const responseData = await rest(url, METHODS.GET);
    dispatch({type: GET_IMPORT_REQUESTS, payload: responseData});
};

const getImportRequest = (id) => async dispatch => {
    const responseData = await rest(`${url}/${id}`, METHODS.GET);
    dispatch({type: GET_IMPORT_REQUEST, payload: responseData});
};


const createImportRequest = (importRequest) => async dispatch => {
    const responseData = await rest(url, METHODS.POST, importRequest);
    dispatch({type: CREATE_IMPORT_REQUEST, payload: responseData});
};


const updateImportRequest = (importRequest) => async dispatch => {
    const responseData = await rest(url, METHODS.PUT, importRequest);
    dispatch({type: UPDATE_IMPORT_REQUEST, payload: responseData});
};


const deleteImportRequest = (id) => async dispatch => {
    await rest(`${url}/${id}`, METHODS.DELETE);
    dispatch({type: DELETE_IMPORT_REQUEST, payload: {id: id}});
};

export {
    getImportRequest,
    getImportRequests,
    createImportRequest,
    updateImportRequest,
    deleteImportRequest,
}