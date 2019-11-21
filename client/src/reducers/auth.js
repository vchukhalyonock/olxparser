import { LOGIN } from "../constants/actions";
import { LOCAL_STORAGE_TOKEN } from "../actions/auth";

const initialState = {
    token: localStorage.getItem(LOCAL_STORAGE_TOKEN)
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return action.payload;

        default:
            break;
    }

    return state;
}