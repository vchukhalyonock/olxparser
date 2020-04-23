import Controller, { VERB } from "../core/Controller";
import {
    CallcenterImportRequestModel, DeletedIRModel, ImportRequestModel,
    OffersModel
} from '../models';
import { OFFER_TYPE } from "../models/OffersModel";
import { CALLCENTER_REQUEST_STATUS } from "../models/CallcenterImportRequestModel";
import {
    FILTER_IMPORT_REQUESTS,
    OLX_URL_VALIDATE_REGEXP
} from "../constants/common";
import Error from "../core/Error";
import {
    getLastHourDate,
    getLastDayDate,
    getLastMonthDate
} from "../utils/common";
import {CALLCENTER_IMPORT_REQUEST_URL, IMPORT_REQUEST_URL} from "../constants/urls";
import {REQUEST_STATUS} from "../models/ImportRequestModel";
import {merge} from "lodash";


const isError = ({ phone, email, olxAccountUrl }) => {
    if(olxAccountUrl.search(OLX_URL_VALIDATE_REGEXP) === -1) {
        return new Error("Invalid OLX account URL");
    }

    return false;
};


class CallcenterImportRequestsController extends Controller {
    get routes() {
        return [
            {
                route: CALLCENTER_IMPORT_REQUEST_URL,
                verb: VERB.POST,
                handler: this.addImportRequest
            },
            {
                route: CALLCENTER_IMPORT_REQUEST_URL,
                verb: VERB.GET,
                handler: this.getImportRequests
            },
            {
                route: `${CALLCENTER_IMPORT_REQUEST_URL}/deleted`,
                verb: VERB.GET,
                handler: this.getDeletedIRs
            },
            {
                route: `${CALLCENTER_IMPORT_REQUEST_URL}/deleted`,
                verb: VERB.POST,
                handler: this.confirmDeleteIRFolder
            },
            {
                route: `${CALLCENTER_IMPORT_REQUEST_URL}/:id`,
                verb: VERB.GET,
                handler: this.getImportRequest
            },
            {
                route: `${CALLCENTER_IMPORT_REQUEST_URL}/:id/offers`,
                verb: VERB.DELETE,
                handler: this.deleteImportRequestOffers
            },
            {
                route: `${CALLCENTER_IMPORT_REQUEST_URL}/:id`,
                verb: VERB.DELETE,
                handler: this.deleteImportRequest
            },
            {
                route: CALLCENTER_IMPORT_REQUEST_URL,
                verb: VERB.PUT,
                handler: this.updateImportRequest
            },
            {
                route: `${CALLCENTER_IMPORT_REQUEST_URL}/status`,
                verb: VERB.PUT,
                handler: this.updateImportRequestStatus
            }
        ];
    }

    async addImportRequest(req, res, next) {
        const importRequest = {
            ...req.body,
            status: CALLCENTER_REQUEST_STATUS.NEW,
            requestedAt: new Date(),
        };

        if(!(importRequest.olxUrl && importRequest.olxUrl.trim())
            || !(importRequest.sessionId && importRequest.sessionId.trim())
            || !importRequest.limit
        ) {
            return next(new Error("Invalid params"), 400);
        }

        const error = isError(importRequest);
        if(error) {
            return next(error, 400);
        }

        const callcenterImportRequestModel = new CallcenterImportRequestModel(importRequest);
        try {
            await callcenterImportRequestModel.save();
        } catch (e) {
            console.log(e);
            if(e.errmsg.indexOf('olxUrl')) {
                return next(new Error("Duplicated olxUrl", 400));
            }
            return next(e);
        }

        return res.json({status: 'success'});
    }


    async updateImportRequest(req, res, next) {
        const newRequest = req.body;

        if(!(newRequest.olxUrl && newRequest.olxUrl.trim())
            || !(newRequest.sessionId && newRequest.sessionId.trim())
            || !newRequest.limit
            || !newRequest._id
        ) {
            return next(new Error("Invalid params"), 400);
        }

        const error = isError(newRequest);
        if(error) {
            return next(error, 400);
        }

        try {
            await CallcenterImportRequestModel
                .updateOne({_id: newRequest._id}, newRequest)
                .exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({status: "success"});
    }


    async updateImportRequestStatus(req, res, next) {
        const {
            id,
            status,
            errorMessage
        } = req.body;

        if(!id || !status) {
            return next(new Error("Invalid params"));
        }

        try {
            const importRequest = await CallcenterImportRequestModel
                .findOne({_id: id})
                .exec();
            if(importRequest) {
                importRequest.status = status;
                importRequest.errorMessage = errorMessage || '';
                importRequest.processedAt = new Date();
                await importRequest.save();
            }
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({status: "success"});
    }

    async getImportRequests(req, res, next) {
        const {
            limit,
            offset,
            search,
            order,
            orderBy,
            filter
        } = req.query;

        const queryOrderBy = orderBy === '' ? 'requestedAt' : orderBy;
        const queryOrder = order === '' ? 'desc' : order;

        let queryFilter;

        switch (filter) {
            case FILTER_IMPORT_REQUESTS.HOUR_REQUESTED:
                queryFilter = {
                    requestedAt: {
                        $gte: getLastHourDate()
                    }
                };
                break;

            case FILTER_IMPORT_REQUESTS.DAY_REQUESTED:
                queryFilter = {
                    requestedAt: {
                        $gte: getLastDayDate()
                    }
                };
                break;

            case FILTER_IMPORT_REQUESTS.MONTH_REQUESTED:
                queryFilter = {
                    requestedAt: {
                        $gte: getLastMonthDate()
                    }
                };
                break;

            case FILTER_IMPORT_REQUESTS.HOUR_PROCESSED:
                queryFilter = {
                    processedAt: {
                        $gte: getLastHourDate()
                    }
                };
                break;

            case FILTER_IMPORT_REQUESTS.DAY_PROCESSED:
                queryFilter = {
                    processedAt: {
                        $gte: getLastDayDate()
                    }
                };
                break;

            case FILTER_IMPORT_REQUESTS.MONTH_PROCESSED:
                queryFilter = {
                    processedAt: {
                        $gte: getLastMonthDate()
                    }
                };
                break;

            case FILTER_IMPORT_REQUESTS.PENDING:
                queryFilter = {
                    status: CALLCENTER_REQUEST_STATUS.PENDING
                };
                break;

            case FILTER_IMPORT_REQUESTS.IN_PROGRESS:
                queryFilter = {
                    status: CALLCENTER_REQUEST_STATUS.IN_PROGRESS
                };
                break;

            case FILTER_IMPORT_REQUESTS.ERROR:
                queryFilter = {
                    status: CALLCENTER_REQUEST_STATUS.ERROR
                };
                break;

            case FILTER_IMPORT_REQUESTS.NEW:
                queryFilter = {
                    status: CALLCENTER_REQUEST_STATUS.NEW
                };
                break;

            case FILTER_IMPORT_REQUESTS.DONE:
                queryFilter = {
                    status: CALLCENTER_REQUEST_STATUS.DONE
                };
                break;

            case FILTER_IMPORT_REQUESTS.ALL:
            default:
                queryFilter = {};
                break;
        }

        let query;
        if(search && search.trim()) {
            const regexp = new RegExp(search.trim(), 'i');
            query = {
                $or: [
                    {
                        olxAccountUrl: regexp
                    }
                ]
            }
        } else {
            query = {};
        }

        query = merge(query, queryFilter);

        let importRequests = null;
        let total = 0;
        try {
            importRequests = await CallcenterImportRequestModel.paginate(
                query,
                {
                    limit,
                    offset,
                    sort: [
                        [queryOrderBy, queryOrder]
                    ]
                });
            total = await CallcenterImportRequestModel
                .countDocuments(query)
                .exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({
            status: 'success',
            items: importRequests.docs === null ? [] : importRequests.docs,
            total
        })
    }


    async getImportRequest(req, res, next) {
        const { id } = req.params;
        let importRequest = null;

        try {
            importRequest = await CallcenterImportRequestModel
                .findOne({_id: id})
                .exec();
        } catch (e) {
            console.log(e);
            return next(new Error("Not found", 404));
        }

        return res.json({
            status: 'success',
            item: importRequest
        })
    }

    async deleteImportRequest(req, res, next) {
        const { id } = req.params;

        if(!id) {
            return next(new Error("Invalid params", 400));
        }

        try {
            await OffersModel
                .deleteMany({importRequestId: id, offerType: OFFER_TYPE.CALLCENTER})
                .exec();
            await ImportRequestModel
                .deleteOne({_id: id})
                .exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        try {
            const deletedIR = new DeletedIRModel({
                importRequestId: id,
                offerType: OFFER_TYPE.CALLCENTER
            });
            await deletedIR.save();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({status: 'success'});
    }

    async getDeletedIRs(req, res, next) {
        const IRs = await DeletedIRModel
            .find({ offerType: OFFER_TYPE.CALLCENTER })
            .exec();
        return res.json({
            status: 'success',
            items: IRs
        });
    }

    async confirmDeleteIRFolder(req, res, next) {
        const { id } = req.body;

        if(!id) {
            next(new Error("Invalid params", 400));
        }

        try {
            await DeletedIRModel
                .deleteOne({
                        importRequestId: id,
                        offerType: OFFER_TYPE.CALLCENTER
                    })
                .exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({status: 'success'});
    }


    async deleteImportRequestOffers(req, res, next) {
        const { id } = req.params;

        if(!id) {
            return next(new Error("Invalid params", 400));
        }

        try {
            await OffersModel
                .deleteMany({
                    importRequestId: id,
                    offerType: OFFER_TYPE.CALLCENTER
                })
                .exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({status: 'success'});
    }
}

export default new CallcenterImportRequestsController();
