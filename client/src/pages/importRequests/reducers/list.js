import {
    DELETE_IMPORT_REQUEST,
    GET_IMPORT_REQUESTS,
    UPDATE_IMPORT_REQUEST_STATUS,
} from "../../../constants/actions";

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

    if(action.type === UPDATE_IMPORT_REQUEST_STATUS) {
        const newItems = state.items.map((item) => {
            if(item._id === action.payload.id) {
                item.status = action.payload.status
            }

            return item;
        });
        return {
            items: newItems
        }
    }
    return state;
}