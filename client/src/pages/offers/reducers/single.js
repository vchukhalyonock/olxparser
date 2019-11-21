import { GET_OFFER } from "../../../constants/actions";

const initialState = {};

export default function single(state = initialState, action) {
    if(action.type === GET_OFFER) {
        return {
            ...state,
            ...action.payload.item,
            loaded: true
        }
    }
    return state;

}
