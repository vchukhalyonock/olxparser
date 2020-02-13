import {
    DELETE_HEADING,
    GET_HEADINGS
} from "../../../constants/actions";

const initialState = {
    items: []
};

export default function list(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    if(type === GET_HEADINGS) {
        return payload;
    }

    if(type === DELETE_HEADING) {
        const newItems = state.items.filter((item) => {
            return item._id !== payload.id;
        });
        return {
            items: newItems
        }
    }

    return state;
}