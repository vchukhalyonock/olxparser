import {
    GET_CALLCENTER_IMPORT_REQUEST,
    RESET_CALLCENTER_IMPORT_REQUEST_FORM,
    CREATE_CALLCENTER_IMPORT_REQUEST,
    UPDATE_CALLCENTER_IMPORT_REQUEST
} from "../../../constants/actions";

const initialState = {
    olxUrl: undefined,
    sessionId: undefined,
    error: null,
    loaded: false,
    t: Date.now()
};


export default function single(state = initialState, action) {
    switch (action.type) {
        case GET_CALLCENTER_IMPORT_REQUEST:
            return {
                ...state,
                ...action.payload.item,
                loaded: true,
                t: Date.now()
            };

        case CREATE_CALLCENTER_IMPORT_REQUEST:
        case UPDATE_CALLCENTER_IMPORT_REQUEST:
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

        case RESET_CALLCENTER_IMPORT_REQUEST_FORM:
        default:
            return initialState;

    }
}