import { MENU_CLICK } from "../constants/actions";

const initialState = {
    title: 'Dashboard'
};

export default function menu(state = initialState, action) {
    if (action.type === MENU_CLICK) {
        return action.payload
    }
    return state;
}