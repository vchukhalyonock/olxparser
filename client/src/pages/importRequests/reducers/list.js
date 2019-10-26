import {
    GET_IMPORT_REQUESTS,
} from "../../../constants/reducers";

const initialState = {
    items: []
};


export default function list(state = initialState, action) {
    if(action.type === GET_IMPORT_REQUESTS) {
        return action.payload;
    }
    return state;
}