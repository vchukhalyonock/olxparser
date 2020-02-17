import Controller, { VERB } from '../core/Controller';
import {
    ImportRequestModel,
    OffersModel
    } from '../models';
import { REQUEST_STATUS } from "../models/ImportRequestModel";
import { IMPORT_REQUEST_URL } from "../constants/urls";
import { FILTER_IMPORT_REQUESTS } from "../constants/common";
import Error from "../core/Error";
import {
    getLastHourDate,
    getLastDayDate,
    getLastMonthDate
} from "../utils/common";
import { merge } from "lodash";

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
                route: `${IMPORT_REQUEST_URL}/:id/offers`,
                verb: VERB.DELETE,
                handler: this.deleteImportRequestOffers
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

    /**
     * @api {post} /import-request createImportRequest
     * @apiGroup ImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {String} email
     * @apiParam {String} phone
     * @apiParam {String} olxAccountUrl
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     "email": "test@test.com",
     *     "phone": "322223322",
     *     "olxAccountUrl": "http://olx.ua/1/2/3/4"
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
     */
    async addImportRequest(req, res, next) {
        const importRequest = {
            ...req.body,
            status: REQUEST_STATUS.NEW,
            requestedAt: new Date(),
        };

        if(!importRequest.email || !importRequest.phone || !importRequest.olxAccountUrl) {
            next(new Error("Invalid params"));
        }

        const importRequestModel = new ImportRequestModel(importRequest);
        try {
            await importRequestModel.save();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: 'success'});
    }



    /**
     * @api {put} /import-request updateImportRequest
     * @apiGroup ImportRequest
     * @apiVersion 1.0.0
     *
     * @apiParam {String} _id import request ID
     * @apiParam {String} email
     * @apiParam {String} phone
     * @apiParam {String} olxAccountUrl
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     "_id": "5e412380ea93af05d584bb2b",
     *     "email": "test@test.com",
     *     "phone": "322223322",
     *     "olxAccountUrl": "http://olx.ua/1/2/3/4"
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
    async updateImportRequest(req, res, next) {
        const newRequest = req.body;

        if(!newRequest.email || !newRequest.phone || !newRequest.olxAccountUrl || !newRequest._id) {
            next(new Error("Invalid params"));
        }

        try {
            await ImportRequestModel.updateOne({_id: newRequest._id}, newRequest).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: "success"});
    }


    /**
     * @api {put} /import-request/status updateImportRequestStatus
     * @apiGroup ImportRequest
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
            next(new Error("Invalid params"));
        }

        try {
            const importRequest = await ImportRequestModel.findOne({_id: id}).exec();
            if(importRequest) {
                importRequest.status = status;
                importRequest.errorMessage = errorMessage || '';
                importRequest.processedAt = new Date();
                await importRequest.save();
            }
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: "success"});
    }


    /**
     * @api {get} /import-request getAllImportRequest
     * @apiGroup ImportRequest
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
     *          "_id": "5e33f3024b180800249037cd",
     *          "email": "rus@mail.com",
     *          "olxAccountUrl": "https://ruslanif.olx.ua/",
     *          "phone": "+380980900367",
     *          "status": "NEW",
     *          "requestedAt": "2020-01-31T09:27:30.112Z",
     *          "__v": 0
     *      },
     *      {
     *          "_id": "5e33f35d4b180800249037ce",
     *          "email": "euro@test.com",
     *          "olxAccountUrl": "https://europedivan.olx.ua/shop/",
     *          "phone": "0969382848",
     *          "status": "DONE",
     *          "requestedAt": "2020-01-31T09:29:01.712Z",
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
                    status: REQUEST_STATUS.PENDING
                };
                break;

            case FILTER_IMPORT_REQUESTS.IN_PROGRESS:
                queryFilter = {
                    status: REQUEST_STATUS.IN_PROGRESS
                };
                break;

            case FILTER_IMPORT_REQUESTS.ERROR:
                queryFilter = {
                    status: REQUEST_STATUS.ERROR
                };
                break;

            case FILTER_IMPORT_REQUESTS.NEW:
                queryFilter = {
                    status: REQUEST_STATUS.NEW
                };
                break;

            case FILTER_IMPORT_REQUESTS.DONE:
                queryFilter = {
                    status: REQUEST_STATUS.DONE
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

        query = merge(query, queryFilter);

        let importRequests = null;
        let total = 0;
        try {
            importRequests = await ImportRequestModel.paginate(
                query,
                {
                    limit,
                    offset,
                    sort: [
                        [queryOrderBy, queryOrder]
                    ]
                });
            total = await ImportRequestModel.countDocuments(query).exec();
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
     * @api {get} /import-request/:id getImportRequest
     * @apiGroup ImportRequest
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
     *          "_id": "5e33f3024b180800249037cd",
     *          "email": "rus@mail.com",
     *          "olxAccountUrl": "https://ruslanif.olx.ua/",
     *          "phone": "+380980900367",
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
            importRequest = await ImportRequestModel.findOne({_id: id}).exec();
        } catch (e) {
            console.log(e);
            next(new Error("Not found", 404));
        }

        return res.json({
            status: 'success',
            item: importRequest
        })
    }


    /**
     * @api {delete} /import-request/:id deleteImportRequest
     * @apiGroup ImportRequest
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
            next(new Error("Invalid params", 400));
        }

        try {
            await OffersModel.deleteMany({importRequestId: id}).exec();
            await ImportRequestModel.deleteOne({_id: id}).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: 'success'});
    }


    /**
     * @api {delete} /import-request/:id/offers deleteImportRequestOffers
     * @apiGroup ImportRequest
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
            next(new Error("Invalid params", 400));
        }

        try {
            await OffersModel.deleteMany({importRequestId: id}).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: 'success'});
    }
}

export default new ImportRequestsController();