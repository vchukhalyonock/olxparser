import { MENU_CLICK } from "../constants/actions";

const menuClick = (title) => dispatch => {
    dispatch({
        type: MENU_CLICK,
        payload: {
            title
        }
    });
};

export {
    menuClick
}
