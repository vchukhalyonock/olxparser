import Controller, { VERB } from "../core/Controller";
import { HEADINGS_URL } from "../constants/urls";
import {HeadingModel, ImportRequestModel, OffersModel} from "../models";
import { HeadingService } from "../services";
import Error from "../core/Error";

class HeadingController extends Controller {
    get routes() {
        return [
            {
                route: HEADINGS_URL,
                verb: VERB.GET,
                handler: this.getHeadings
            },
            {
                route: `${HEADINGS_URL}/:id`,
                verb: VERB.GET,
                handler: this.getHeading
            },
            {
                route: HEADINGS_URL,
                verb: VERB.POST,
                handler: this.createHeading
            },
            {
                route: `${HEADINGS_URL}/:id`,
                verb: VERB.PUT,
                handler: this.updateHeading
            },
            {
                route: `${HEADINGS_URL}/:id`,
                verb: VERB.DELETE,
                handler: this.deleteHeading
            }
        ];
    }


    /**
     * @api {get} /headings getAllHeadings
     * @apiGroup Headings
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} limit
     * @apiParam {Number} offset
     * @apiParam {String} [search] search string
     * @apiParam {String} [order] order direction 'asc' or 'desc'
     * @apiParam {String} [orderBy] order by field. id, name, createdAt
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
     *          "_id": 0,
     *          "heading": "test/test1/test333",
     *          "createdAt": "2020-02-13T09:55:20.541Z",
     *          "__v": 0
     *      },
     *      {
     *          "_id": 1,
     *          "heading": "test/test1/test22343",
     *          "createdAt": "2020-02-13T09:55:56.949Z",
     *          "__v": 0
     *      }
     *      ],
     *      "total": 2
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
    async getHeadings(req, res, next) {
        const {
            query: {
                limit ,
                offset,
                search,
                order,
                orderBy
            }
        } = req;

        const queryOrderBy = orderBy === '' ? 'requestedAt' : orderBy;
        const queryOrder = order === '' ? 'desc' : order;

        let query;
        if(search && search.trim()) {
            const regexp = new RegExp(search.trim(), 'i');
            query = {
                $or: [
                    {
                        heading: regexp
                    }
                ]
            }
        } else {
            query = {};
        }

        let headings = null;
        let total = 0;
        try {
            headings = await HeadingModel.paginate(
                query,
                {
                    limit,
                    offset,
                    sort: [
                        [queryOrderBy, queryOrder]
                    ]
                });
            total = await HeadingModel.countDocuments(query).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({
            status: 'success',
            items: headings.docs === null ? [] : headings.docs,
            total
        })
    }


    /**
     * @api {get} /headings/:id getHeading
     * @apiGroup Headings
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
     *          "_id": 1,
     *          "heading": "test/test1/test22343",
     *          "createdAt": "2020-02-13T09:55:56.949Z",
     *          "__v": 0
     *      }
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
     *
     */
    async getHeading(req, res, next) {
        const { id } = req.params;
        let heading;

        try {
            heading = await HeadingModel.findOne({_id: id}).exec();
        } catch (e) {
            console.log(e);
            return next(new Error("Not found", 404));
        }

        if(!heading) {
            return next(new Error("Not found", 404));
        }

        return res.json({
            status: 'success',
            item: heading
        })
    }


    /**
     * @api {post} /headings createHeading
     * @apiGroup Headings
     * @apiVersion 1.0.0
     *
     * @apiParam {String} heading
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *      "heading": "test/test1/test3"
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
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "status": 400,
     *     "errors": "Heading already exists!!!"
     * }
     */
    async createHeading(req, res, next) {
        const heading = {
            ...req.body,
            createdAt: new Date()
        };

        if(!heading.heading || heading.heading.trim() === '') {
            return next(new Error("Invalid params"));
        }

        if(await HeadingService.isExist(heading.heading.trim())) {
            return next(new Error("Heading already exists!!!", 400));
        }

        const headingModel = new HeadingModel(heading);

        try {
            await headingModel.save();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({status: 'success'});
    }


    /**
     * @api {post} /headings/:id updateHeading
     * @apiGroup Headings
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id
     * @apiParam {String} heading
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *      "heading": "test/test1/test322"
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
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "status": 400,
     *     "errors": "Heading already exists!!!"
     * }
     */
    async updateHeading(req, res, next) {
        const { id } = req.params;
        const heading = {
            ...req.body
        };

        if(!heading.heading || heading.heading.trim() === '') {
           return next(new Error("Invalid params", 400));
        }

        if(await HeadingService.isExist(heading.heading.trim(), id)) {
            return next(new Error("Heading already exists!!!", 400));
        }

        try {
            await HeadingModel
                .updateOne({_id: id}, heading)
                .exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        const offersIds = await HeadingService.hasOffers(id);
        if(offersIds) {
            try {
                await OffersModel
                    .updateMany({ headingId: id }, { headingString: heading.heading })
                    .exec();
            } catch (e) {
                console.log(e);
                return next(e);
            }
        }

        return res.json({status: 'success'});
    }



    /**
     * @api {delete} /headings/:id deleteHeading
     * @apiGroup Headings
     * @apiVersion 1.0.0
     *
     * @apiParam {Number} id
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
     */
    async deleteHeading(req, res, next) {
        const { id } = req.params;

        if(!id) {
            return next(new Error("Invalid params"));
        }

        try{
            await HeadingModel
                .deleteOne({_id: id})
                .exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        try {
            await OffersModel
                .updateMany({ headingId: id }, { headingId: null, headingString: ''})
                .exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }


        return res.json({status: 'success'});
    }
}

export default new HeadingController();
