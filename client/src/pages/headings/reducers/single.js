import {
    GET_HEADING,
    CREATE_HEADING,
    UPDATE_HEADING
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
            console.log(action);
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

        default:
            return state;
    }
}
