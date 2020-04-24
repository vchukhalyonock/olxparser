import {
    GET_LAST_NEW_IMPORT_REQUESTS,
    GET_LAST_PROCESSED_IMPORT_REQUEST,
    GET_LAST_ERRORED_IMPORT_REQUEST
} from "../../../constants/actions";

const initialState = {};

export default function list(state = initialState, action) {

    const newState = {...state};

    switch (action.type) {
        case GET_LAST_ERRORED_IMPORT_REQUEST:
            newState[GET_LAST_ERRORED_IMPORT_REQUEST] = action.payload;
            break;


        case GET_LAST_PROCESSED_IMPORT_REQUEST:
            newState[GET_LAST_PROCESSED_IMPORT_REQUEST] = action.payload;
            break;

        default:
        case GET_LAST_NEW_IMPORT_REQUESTS:
            newState[GET_LAST_NEW_IMPORT_REQUESTS] = action.payload;
            break;
    }

    return newState;
}