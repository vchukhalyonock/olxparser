import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";
import { reducers as importRequests } from '../pages/importRequests';
import { reducers as offers } from '../pages/offers';

export default combineReducers({
    auth,
    menu,
    importRequests,
    offers
});