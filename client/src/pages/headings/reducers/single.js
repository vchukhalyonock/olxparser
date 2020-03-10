import {
    GET_HEADING,
    CREATE_HEADING,
    UPDATE_HEADING,
    RESET_HEADING_FORM
} from "../../../constants/actions";

const initialState = {
    t: Date.now(),
    error: null,
    loaded: false
};


export default function single(state = initialState, action) {

    switch (action.type) {
        case GET_HEADING:
            return {
                ...state,
                ...action.payload.item,
                t: Date.now()
            };


        case CREATE_HEADING:
        case UPDATE_HEADING:
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

        case RESET_HEADING_FORM:
        default:
            return initialState;
    }
}
