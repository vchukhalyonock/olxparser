import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";
import { reducers as importRequests } from '../pages/importRequests';

export default combineReducers({
    auth,
    menu,
    importRequests
});