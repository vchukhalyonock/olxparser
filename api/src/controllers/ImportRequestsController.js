import Controller, { VERB } from '../core/Controller';
import {
    ImportRequestModel,
    OffersModel
    } from '../models';
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
            },
            {
                route: `${IMPORT_REQUEST_URL}/status`,
                verb: VERB.PUT,
                handler: this.updateImportRequestStatus
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

    async updateImportRequestStatus(req, res, next) {
        const { id, status } = req.body;
        try {
            const importRequest = await ImportRequestModel.findOne({_id: id}).exec();
            if(importRequest) {
                importRequest.status = status;
                await importRequest.save();
            }
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: "success"});
    }


    async getImportRequests(req, res, next) {
        const {
            limit,
            offset,
            search
        } = req.query;

        let query;
        if(search && search.trim()) {
            const regexp = new RegExp(search.trim(), 'i');
            query = {
                $or: [
                    {
                        email: regexp
                    },
                    {
                        olxAccountUrl: regexp
                    },
                    {
                        phone: regexp
                    }
                ]
            }
        } else {
            query = {};
        }

        let importRequests = null;
        let total = 0;
        try {
            importRequests = await ImportRequestModel.paginate(query, { limit, offset });
            total = await ImportRequestModel.countDocuments().exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({
            status: 'success',
            items: importRequests.docs,
            total
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
            await OffersModel.deleteMany({importRequestId: id}).exec();
            await ImportRequestModel.deleteOne({_id: id}).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: 'success'});
    }
}

export default new ImportRequestsController();