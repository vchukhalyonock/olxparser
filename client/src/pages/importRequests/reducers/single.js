import {GET_IMPORT_REQUEST} from "../../../constants/actions";

const initialState = {
    email: undefined,
    olxAccountUrl: undefined,
    userId: undefined,
    t: Date.now()
};

export default function single(state = initialState, action) {
    if(action.type === GET_IMPORT_REQUEST) {
        return {
            ...state,
            ...action.payload.item,
            loaded: true,
            t: Date.now()
        }
    }
    return state;
}
