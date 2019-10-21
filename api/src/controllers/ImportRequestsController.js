import Controller, { VERB } from '../core/Controller';
import { ImportRequestModel } from '../models';
import { REQUEST_STATUS } from "../models/ImportRequestModel";

class ImportRequestsController extends Controller {

    get routes() {
        return [
            {
                route: '/import-request',
                verb: VERB.POST,
                handler: this.addImportRequest
            }
        ]
    }

    async addImportRequest(req, res, next) {
        const importRequest = {
            ...req.body,
            status: REQUEST_STATUS.NEW,
            requestedAt: new Date(),
        };
        const importRequestModel = new ImportRequestModel(importRequest);
        try {
            await importRequestModel.save();
        } catch (e) {
            console.log(e);
        }

        return res.json({status: 'success'});
    }
}

export default new ImportRequestsController();