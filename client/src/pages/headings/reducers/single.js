import { GET_HEADING } from "../../../constants/actions";

const initialState = {
    t: Date.now()
};


export default function single(state = initialState, action) {
    if(action.type === GET_HEADING) {
        return {
            ...state,
            ...action.payload.item,
            t: Date.now(),
            loaded: true
        }
    }

    return state;
}
