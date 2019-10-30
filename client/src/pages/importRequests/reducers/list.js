import {
    DELETE_IMPORT_REQUEST,
    GET_IMPORT_REQUESTS,
} from "../../../constants/reducers";

const initialState = {
    items: []
};


export default function list(state = initialState, action) {
    if(action.type === GET_IMPORT_REQUESTS) {
        return action.payload;
    }

    if(action.type === DELETE_IMPORT_REQUEST) {
        const newItems = state.items.filter((item) => {
            return item._id !== action.payload.id;
        });
        return {
            items: newItems
        }
    }
    return state;
}