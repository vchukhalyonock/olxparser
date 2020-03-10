import {
    GET_IMPORT_REQUEST,
    RESET_IMPORT_REQUEST_FORM,
    CREATE_IMPORT_REQUEST,
    UPDATE_IMPORT_REQUEST
} from "../../../constants/actions";

const initialState = {
    email: undefined,
    olxAccountUrl: undefined,
    userId: undefined,
    error: null,
    loaded: false,
    t: Date.now()
};

export default function single(state = initialState, action) {
    switch (action.type) {
        case GET_IMPORT_REQUEST:
            return {
                ...state,
                ...action.payload.item,
                loaded: true,
                t: Date.now()
            };

        case CREATE_IMPORT_REQUEST:
        case UPDATE_IMPORT_REQUEST:
            if(!action.payload) {
                return {
                    ...state,
                    error: true,
                    loaded: false
                }
            } else {
                return {
                    ...state,
                    error: false,
                    loaded: true
                }
            };

        case RESET_IMPORT_REQUEST_FORM:
        default:
            return initialState;

    }

    /*if(action.type === GET_IMPORT_REQUEST) {
        return {
            ...state,
            ...action.payload.item,
            loaded: true,
            t: Date.now()
        }
    }
    return state;*/
}
