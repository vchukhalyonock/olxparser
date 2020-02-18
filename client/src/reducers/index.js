import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";
import { reducers as importRequests } from '../pages/importRequests';
import { reducers as offers } from '../pages/offers';
import { reducers as headings } from '../pages/headings';
import { reducers as dashboard } from "../pages/dashboard";

export default combineReducers({
    auth,
    menu,
    importRequests,
    offers,
    headings,
    dashboard
});
