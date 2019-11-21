import { combineReducers } from "redux";
import single from "./single";
import list from "./list";

export default combineReducers({
    list,
    single
});