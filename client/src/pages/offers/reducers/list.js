import {
    DELETE_OFFER,
    GET_OFFERS
} from "../../../constants/actions";

const initialState = {
    items: []
};

export default function list(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    if (type === GET_OFFERS) {
        return payload;
    }

    if (type === DELETE_OFFER) {
        const newItems = state.items.filter((item) => {
            return item._id !== payload.id;
        });
        return {
            items: newItems
        }
    }

    return state;
}