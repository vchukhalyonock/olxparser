import Controller, { VERB } from "../core/Controller";
import { OffersModel } from "../models";
import { EXPORT_URL } from "../constants/urls";


class ExportController extends Controller {

    get routes() {
        return [
            {
                route: `${EXPORT_URL}/yandex-market`,
                verb: VERB.GET,
                handler: this.ExportToYandexMarket
            }
        ]
    }


    async ExportToYandexMarket(res, req, next) {

    }
}

export default new ExportController();
