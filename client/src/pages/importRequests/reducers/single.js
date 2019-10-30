import {GET_IMPORT_REQUEST} from "../../../constants/reducers";

const initialState = {
    email: undefined,
    olxAccountUrl: undefined
};

export default function single(state = initialState, action) {
    if(action.type === GET_IMPORT_REQUEST) {
        return {
            ...state,
            ...action.payload.item,
            loaded: true
        }
    }
    return state;
}
