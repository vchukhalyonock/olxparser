import {LOGIN} from "./constants";

const initialState = {};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            break;

        default:
            break;
    }

    return state;
}