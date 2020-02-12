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


    async getHeading(req, res, next) {
        const { id } = req.params;
        let heading = null;

        try {
            heading = await HeadingModel.findOne({_id: id}).exec();
        } catch (e) {
            console.log(e);
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


    async updateHeading(req, res, next) {
        const { id } = req.param;
        const heading = {
            ...req.body
        };

        if(!heading.heading || heading.heading.trim() === '') {
           return next(new Error("Invalid params", 400));
        }

        if(await HeadingService.isExist(heading.heading.trim(), id)) {
            return next(new Error("Heading already exists!!!", 400));
        }

        const session = await HeadingModel.startSession();
        await session.startTransaction();

        try {
            await HeadingModel
                .updateOne({_id: id}, heading, { session })
                .exec();
        } catch (e) {
            await session.abortTransaction();
            console.log(e);
            return next(e);
        }

        const offersIds = await HeadingService.hasOffers(id);
        if(offersIds) {
            try {
                await OffersModel
                    .updateMany({ headingId: id }, { headingString: heading.heading }, { session })
                    .exec();
            } catch (e) {
                await session.abortTransaction();
                console.log(e);
                return next(e);
            }
        }

        await session.commitTransaction();

        session.endSession();

        return res.json({status: 'success'});
    }


    async deleteHeading(req, res, next) {
        const { id } = req.params;

        if(!id) {
            return next(new Error("Invalid params"));
        }

        if(!await HeadingService.isExist()) {
            return next(new Error("Not found", 404));
        }

        const session = await HeadingModel.startSession();

        try{
            await HeadingModel
                .deleteOne({_id: id}, session)
                .exec();
        } catch (e) {
            await session.abortTransaction();
            console.log(e);
            return next(e);
        }

        try {
            await OffersModel
                .updateMany({ headingId: id }, { headingId: null, headingString: ''}, session)
                .exec();
        } catch (e) {
            await session.abortTransaction();
            console.log(e);
            return next(e);
        }


        await session.commitTransaction();

        return res.json({status: 'success'});
    }
}

export default new HeadingController();
