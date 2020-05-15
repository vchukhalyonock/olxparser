import Controller, { VERB } from "../core/Controller";
import {
    CallcenterImportRequestModel,
    DeletedIRModel,
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
import { CALLCENTER_IMPORT_REQUEST_URL } from "../constants/urls";
import {merge} from "lodash";


const isError = ({ olxUrl }) => {
    if(olxUrl.search(OLX_URL_VALIDATE_REGEXP) === -1) {
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

    /**
     * @api {post} /callcenter-import-request createCallcenterImportRequest
     * @apiGroup CallcenterImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {String} sessionId
     * @apiParam {Number} limit
     * @apiParam {String} olxUrl
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     "sessionId": "12345",
     *     "limit": 100,
     *     "olxUrl": "http://olx.ua/1/2/3/4"
     * }
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "status": "success"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "message": "Invalid token",
     *     "user": false
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "status": 400,
     *     "errors": "Invalid params"
     * }
     *
     * * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "status": 400,
     *     "errors": "Duplicated olxUrl"
     * }
     */
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


    /**
     * @api {put} /callcenter-import-request updateCallcenterImportRequest
     * @apiGroup CallcenterImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {String} _id
     * @apiParam {String} sessionId
     * @apiParam {Number} limit
     * @apiParam {String} olxUrl
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *      "_id": "aba4454-0ds",
     *     "sessionId": "12345",
     *     "limit": 100,
     *     "olxUrl": "http://olx.ua/1/2/3/4"
     * }
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "status": "success"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "message": "Invalid token",
     *     "user": false
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "status": 400,
     *     "errors": "Invalid params"
     * }
     *
     * * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "status": 400,
     *     "errors": "Duplicated olxUrl"
     * }
     */
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


    /**
     * @api {put} /callcenter-import-request/status updateCallcenterImportRequestStatus
     * @apiGroup CallcenterImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id import request ID
     * @apiParam {String} status import request status. Can be one of NEW, PENDING, IN_PROGRESS, DONE, ERROR
     * @apiParam {String} [errorMessage]
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     "id": "5e412380ea93af05d584bb2b",
     *     "status": "DONE",
     * }
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "status": "success"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "message": "Invalid token",
     *     "user": false
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *     "status": 500,
     *     "errors": "Invalid params"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *     "errors": "CastError: Cast to ObjectId failed for value \"1\" at path \"_id\" for model \"ImportRequest\""
     * }
     */
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


    /**
     * @api {get} /callcenter-import-request getAllCallcenterImportRequest
     * @apiGroup CallcenterImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} limit
     * @apiParam {Number} offset
     * @apiParam {String} [search] search string
     * @apiParam {String} [order] order direction 'asc' or 'desc'
     * @apiParam {String} [orderBy] order by field. email, phone, olxAccountUrl, status, requestedAt
     * @apiParam {String} [filter] filtering by import or processed dates. 'all', 'hour_requested', 'day_requested', 'month_requested', 'hour_processed', 'day_processed', 'month_processed'
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "status": "success",
     *      "items": [
     *      {
     *          "_id": "aba4454-0ds",
     *          "sessionId": "12345",
     *          "limit": 100,
     *          "olxUrl": "http://olx.ua/1/2/3/4"
     *          "status": "NEW",
     *          "requestedAt": "2020-01-31T09:27:30.112Z",
     *          "__v": 0
     *      },
     *      {
     *          "_id": "aba4454-0ds",
     *          "sessionId": "12345",
     *          "limit": 100,
     *          "olxUrl": "http://olx.ua/1/2/3/4"
     *          "status": "NEW",
     *          "requestedAt": "2020-01-31T09:27:30.112Z",
     *          "__v": 0
     *      },
     *      ],
     *      "total": 10
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "message": "Invalid token",
     *     "user": false
     * }
     *
     */
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


    /**
     * @api {get} /callcenter-import-request/:id getCallcenterImportRequest
     * @apiGroup CallcenterImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "status": "success",
     *      "item": {
     *          "_id": "aba4454-0ds",
     *          "sessionId": "12345",
     *          "limit": 100,
     *          "olxUrl": "http://olx.ua/1/2/3/4"
     *          "status": "NEW",
     *          "requestedAt": "2020-01-31T09:27:30.112Z",
     *          "__v": 0
     *          }
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "message": "Invalid token",
     *     "user": false
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *      "status": 404,
     *      "errors": "Not found"
     * }
     */
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


    /**
     * @api {delete} /callcenter-import-request/:id deleteCallcenterImportRequest
     * @apiGroup CallcenterImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "status": "success"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "message": "Invalid token",
     *     "user": false
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *     "errors": "CastError: Cast to ObjectId failed for value \"1\" at path \"_id\" for model \"ImportRequest\""
     * }
     */
    async deleteImportRequest(req, res, next) {
        const { id } = req.params;

        if(!id) {
            return next(new Error("Invalid params", 400));
        }

        try {
            await OffersModel
                .deleteMany({importRequestId: id, offerType: OFFER_TYPE.CALLCENTER})
                .exec();
            await CallcenterImportRequestModel
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


    /**
     * @api {delete} /callcenter-import-request/:id/offers deleteCallcenterImportRequestOffers
     * @apiGroup CallcenterImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "status": "success"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "message": "Invalid token",
     *     "user": false
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *     "errors": "CastError: Cast to ObjectId failed for value \"1\" at path \"_id\" for model \"ImportRequest\""
     * }
     */
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
