import Controller, { VERB } from "../core/Controller";
import {
    ImportRequestModel,
    OffersModel
} from "../models";
import { EXPORT_URL } from "../constants/urls";
import Error from "../core/Error";
import { YMLConverter } from "../helpers/yandexMarketHelper";


class ExportController extends Controller {

    get routes() {
        return [
            {
                route: `${EXPORT_URL}/yandex-market`,
                verb: VERB.POST,
                handler: this.ExportToYandexMarket
            }
        ]
    }


    async ExportToYandexMarket(req, res, next) {
        const {
            importRequestId,
            offersIds
        } = req.body;

        const importRequest = await ImportRequestModel
            .findById(importRequestId)
            .exec();

        if(!importRequest) {
            throw new Error("Not found", 404);
        }

        const offers = await OffersModel
            .find({ importRequestId })
            .where('_id')
            .in(offersIds)
            .exec();

        const YML = YMLConverter(importRequest, offers);

        res.set('Content-Type', 'text/xml');
        res.send(YML);
    }
}

export default new ExportController();
