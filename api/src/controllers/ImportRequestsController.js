import Controller, { VERB } from '../core/Controller';
import { ImportRequestModel } from '../models';
import { REQUEST_STATUS } from "../models/ImportRequestModel";
import { IMPORT_REQUEST_URL } from "../constants/urls";
import Error from "../core/Error";

class ImportRequestsController extends Controller {

    get routes() {
        return [
            {
                route: IMPORT_REQUEST_URL,
                verb: VERB.POST,
                handler: this.addImportRequest
            },
            {
                route: IMPORT_REQUEST_URL,
                verb: VERB.GET,
                handler: this.getImportRequests
            },
            {
                route: `${IMPORT_REQUEST_URL}/:id`,
                verb: VERB.GET,
                handler: this.getImportRequest
            },
            {
                route: `${IMPORT_REQUEST_URL}/:id`,
                verb: VERB.DELETE,
                handler: this.deleteImportRequest
            },
            {
                route: IMPORT_REQUEST_URL,
                verb: VERB.PUT,
                handler: this.updateImportRequest
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
            next(e);
        }

        return res.json({status: 'success'});
    }


    async updateImportRequest(req, res, next) {
        const newRequest = req.body;
        try {
            await ImportRequestModel.updateOne({_id: newRequest._id}, newRequest).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: "success"});
    }


    async getImportRequests(req, res, next) {
        let importRequests = null;
        try {
            importRequests = await ImportRequestModel.find({}).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({
            status: 'success',
            items: importRequests
        })
    }


    async getImportRequest(req, res, next) {
        const { id } = req.params;
        let importRequest = null;

        try {
            importRequest = await ImportRequestModel.findOne({_id: id}).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        if(!importRequest) {
            throw new Error("Not found", 404);
        }

        return res.json({
            status: 'success',
            item: importRequest
        })
    }

    async deleteImportRequest(req, res, next) {
        const { id } = req.params;
        try {
            await ImportRequestModel.deleteOne({_id: id}).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: 'success'});
    }
}

export default new ImportRequestsController();