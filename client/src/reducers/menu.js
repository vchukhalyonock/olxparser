import { MENU_CLICK } from "../constants/reducers";

const initialState = {
    title: 'Dashboard'
};

export default function menu(state = initialState, action) {
    if (action.type === MENU_CLICK) {
        return action.payload
    }
    return state;
}