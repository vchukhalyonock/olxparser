import Controller, { VERB } from "../core/Controller";
import {
    CallcenterImportRequestModel
} from '../models';
import { CALLCENTER_REQUEST_STATUS } from "../models/CallcenterImportRequestModel";
import {
    EMAIL_VALIDATE_REGEX,
    FILTER_IMPORT_REQUESTS,
    OLX_URL_VALIDATE_REGEXP, PHONE_REG
} from "../constants/common";
import Error from "../core/Error";
import {
    getLastHourDate,
    getLastDayDate,
    getLastMonthDate
} from "../utils/common";


const isError = ({ phone, email, olxAccountUrl }) => {
    if(olxAccountUrl.search(OLX_URL_VALIDATE_REGEXP) === -1) {
        return new Error("Invalid OLX account URL");
    }

    return false;
};


class CallcenterImportRequestsController extends Controller {
    get routes() {
        return [];
    }
}

export default new CallcenterImportRequestsController();
