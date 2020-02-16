import {
    isArray,
    isObject
} from "lodash";
import Controller, { VERB } from "../core/Controller";
import {
    OffersModel,
    ImportRequestModel
} from "../models";
import { OFFERS_URL } from "../constants/urls";
import Error from "../core/Error";
import offerService from "../services/OfferService";

class OffersController extends Controller {
    get routes() {
        return [
            {
                route: OFFERS_URL,
                verb: VERB.POST,
                handler: this.createOffer
            },
            {
                route: `${OFFERS_URL}/heading`,
                verb: VERB.PUT,
                handler: this.setHeading
            },
            {
                route: `${OFFERS_URL}/offer`,
                verb: VERB.PUT,
                handler: this.updateOffer
            },
            {
                route: `${OFFERS_URL}/:importRequestId`,
                verb: VERB.GET,
                handler: this.getOffers
            },
            {
                route: `${OFFERS_URL}/offer/:id`,
                verb: VERB.GET,
                handler: this.getOffer
            },
            {
                route: `${OFFERS_URL}/offer/:id`,
                verb: VERB.DELETE,
                handler: this.deleteOffer
            }
        ]
    }


    /**
     * @api {get} /offers/:importRequestId getAllOffers
     * @apiGroup Offers
     * @apiVersion 1.0.0
     *
     * @apiParam {String} importRequestId
     * @apiParam {Number} limit
     * @apiParam {Number} offset
     * @apiParam {String} [search] search string
     * @apiParam {String} [order] order direction 'asc' or 'desc'
     * @apiParam {String} [orderBy] order by field. description, phone, title, url, createdAt, importRequestId
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "status": "success",
     * "items": [
     * {
     *      "heading": [
     *          "Объявление Любомль",
     *          "Запчасти для транспорта Любомль",
     *          "Автозапчасти и аксессуары Любомль",
     *          "Автозапчасти Любомль"
     *      ],
     *      "details": [
     *          {
     *              "measure": "Объявление от",
     *              "value": "Частного лица"
     *          },
     *          {
     *              "measure": "Тип запчасти / аксессуара",
     *              "value": "Автозапчасти"
     *          },
     *          {
     *              "measure": "Состояние",
     *              "value": "Б/у"
     *          },
     *          {
     *              "measure": "Вид запчасти",
     *              "value": "Кузовные детали"
     *          }
     *      ],
     *      "images": [
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg",
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg",
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg",
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg",
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg"
     *      ],
     *      "srcImages": [
     *          "https://apollo-ireland.akamaized.net:443/v1/files/knvcp49p86y42-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/xxk3kdbfi9rg2-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/s7hfrs49firi2-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/mh5100g3hc0b2-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/7nnjq46xde3y-UA/image;s=644x461"
     *      ],
     *      "_id": "5e33e43c53ee0c235830424a",
     *      "description": "В наличиї есть все запчастини по Audi Q7.\nДетальна информация по тел.  688 - Показать номер -",
     *      "phone": "380 688 282085",
     *      "price": {
     *          "amount": "15 000",
     *          "volume": "грн."
     *      },
     *      "title": "Морда, фары, капот, дверіAudi Q7 запчасти",
     *      "url": "https://www.olx.ua/obyavlenie/morda-fary-kapot-dveraudi-q7-zapchasti-IDFCo4r.html?sd=1#e644acc915",
     *      "importRequestId": "5e33f3fc4b180800249037d0",
     *      "createdAt": "2020-01-31T08:24:28.246Z",
     *      "__v": 0
     * },
     * .....
     * ],
     * "total": 15
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
     *      "errors": "Resource not found"
     * }
     *
     */
    async getOffers(req, res, next) {
        const {
            query: {
                limit ,
                offset,
                search,
                order,
                orderBy
            },
            params: {
                importRequestId
            }
        } = req;

        const queryOrderBy = orderBy === '' ? 'requestedAt' : orderBy;
        const queryOrder = order === '' ? 'desc' : order;

        let query;
        if(search && search.trim()) {
            const regexp = new RegExp(search.trim(), 'i');
            query = {
                importRequestId,
                $or: [
                    {
                        description: regexp
                    },
                    {
                        title: regexp
                    },
                    {
                        url: regexp
                    },
                    {
                        headingString: regexp
                    }
                ]
            }
        } else {
            query = { importRequestId };
        }

        let offers = null;
        let total = 0;
        try {
            offers = await OffersModel
                .paginate(
                    query,
                    {
                        limit,
                        offset,
                        sort: [
                            [queryOrderBy, queryOrder]
                        ]
                    });
            total = await OffersModel.countDocuments(query).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({
            status: 'success',
            items: offers.docs,
            total
        })
    }


    /**
     * @api {get} /offers/offer/:id getOffer
     * @apiGroup Offers
     * @apiVersion 1.0.0
     *
     * @apiParam {String} id
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "status": "success",
     * "item":
     * {
     *      "heading": [
     *          "Объявление Любомль",
     *          "Запчасти для транспорта Любомль",
     *          "Автозапчасти и аксессуары Любомль",
     *          "Автозапчасти Любомль"
     *      ],
     *      "details": [
     *          {
     *              "measure": "Объявление от",
     *              "value": "Частного лица"
     *          },
     *          {
     *              "measure": "Тип запчасти / аксессуара",
     *              "value": "Автозапчасти"
     *          },
     *          {
     *              "measure": "Состояние",
     *              "value": "Б/у"
     *          },
     *          {
     *              "measure": "Вид запчасти",
     *              "value": "Кузовные детали"
     *          }
     *      ],
     *      "images": [
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg",
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg",
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg",
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg",
     *          "http://192.168.2.50/qweqdqdqe134234123/134234-23423-rdsd-w-rfwerr/1.jpg"
     *      ],
     *      "srcImages": [
     *          "https://apollo-ireland.akamaized.net:443/v1/files/knvcp49p86y42-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/xxk3kdbfi9rg2-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/s7hfrs49firi2-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/mh5100g3hc0b2-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/7nnjq46xde3y-UA/image;s=644x461"
     *      ],
     *      "_id": "5e33e43c53ee0c235830424a",
     *      "description": "В наличиї есть все запчастини по Audi Q7.\nДетальна информация по тел.  688 - Показать номер -",
     *      "phone": "380 688 282085",
     *      "price": {
     *          "amount": "15 000",
     *          "volume": "грн."
     *      },
     *      "title": "Морда, фары, капот, дверіAudi Q7 запчасти",
     *      "url": "https://www.olx.ua/obyavlenie/morda-fary-kapot-dveraudi-q7-zapchasti-IDFCo4r.html?sd=1#e644acc915",
     *      "importRequestId": "5e33f3fc4b180800249037d0",
     *      "createdAt": "2020-01-31T08:24:28.246Z",
     *      "__v": 0
     * }
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
     *      "errors": "Resource not found"
     * }
     *
     */
    async getOffer(req, res, next) {
        const { id } = req.params;
        let offer = null;
        let importRequest = null;
        let doc = null;

        try {
            offer = await OffersModel.findOne({_id: id}).exec();
            if (offer) {
                importRequest = await ImportRequestModel.findOne({_id: offer.importRequestId}).exec();
                doc = offer._doc;
            }
        } catch (e) {
            console.log(e);
            next(e);
        }

        if(!offer) {
            throw new Error("Not found", 404);
        }

        return res.json({
            status: 'success',
            item: {
                ...doc,
                importRequest
            }
        });
    }



    /**
     * @api {put} /offers/offer updateOffer
     * @apiGroup Offers
     * @apiVersion 1.0.0
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *      _id: "234234aqrlk309e00err",
     *      "heading":[
     *          "Объявление Узин",
     *          "Электроника Узин",
     *          "Аудиотехника Узин",
     *          "Магнитолы Узин"
     *      ],
     *      "url":"https://www.olx.ua/obyavlenie/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs.html#dcfb000ef3;promoted",
     *      "title":"Бобинный магнитофон Dokorder 1140 (19, 38 скорость)",
     *      "price":{
     *          "amount":"3900",
     *          "volume":"$"
     *      },
     *      "description":"Топовая модель от фирмы Denki  Onkyo. Состояние головок как новые. Полностью рабочий аппарат в идеальном состоянии.
     *              В Гугле очень много информации о данной модели. По записи и воспроизведении многим моделям с более высоким ценником даст фору.",
     *      "importRequestId":"5e3d5113669ecc3dcd489823",
     *      "images":[
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/0.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/1.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/2.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/3.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/4.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/5.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/6.jpg",
     *           "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/7.jpg"
     *      ],
     *      "srcImages": [
     *          "https://apollo-ireland.akamaized.net:443/v1/files/5hk0vi4qdstv-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/w6m0hm7qlb0o1-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/rm8jemxtpfzd-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/40pacxt1q4gl3-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/2b2gnzyekowc3-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/26hxjiwna67v1-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/cbb6thpmrk8i1-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/e6hwy3g6ujje3-UA/image;s=644x461"
     *      ],
     *      "details":[
     *          {
     *              "measure":"Объявление от",
     *              "value":"Бизнес"
     *          },
     *          {
     *              "measure":"Вид аудиотехники",
     *              "value":"Магнитолы"
     *          },
     *          {
     *              "measure":"Состояние",
     *              "value":"Б/у"
     *          }
     *      ],
     *      "createdAt":"2020-02-08T10:53:08.606Z",
     *      "_id":"5e3e931423e2900e0422a96f"
     * }
     *
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
     *     "errors": "CastError: Cast to ObjectId failed for value \"1\" at path \"_id\" for model \"OFFERS\""
     * }
     */
    async updateOffer(req, res, next) {
        const newOffer = req.body;
        try {
            await OffersModel.updateOne({_id: newOffer._id}, newOffer).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: "success"});
    }


    async setHeading(req, res, next) {
        const {
            offers,
            heading
        } = req.body;

        if(!isArray(offers) && !isObject(heading)) {
            return next(new Error("Invalid params", 400));
        }

        try {
            await OffersModel.updateMany(
                    {
                        _id: {
                            $in: offers
                        }
                    },
                    {
                        headingId: heading.value,
                        headingString: heading.option
                    }
                )
                .exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({status: "success"});
    }



    /**
     * @api {post} /offers createOffer
     * @apiGroup Offers
     * @apiVersion 1.0.0
     *
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *      "heading":[
     *          "Объявление Узин",
     *          "Электроника Узин",
     *          "Аудиотехника Узин",
     *          "Магнитолы Узин"
     *      ],
     *      "url":"https://www.olx.ua/obyavlenie/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs.html#dcfb000ef3;promoted",
     *      "title":"Бобинный магнитофон Dokorder 1140 (19, 38 скорость)",
     *      "price":{
     *          "amount":"3900",
     *          "volume":"$"
     *      },
     *      "description":"Топовая модель от фирмы Denki  Onkyo. Состояние головок как новые. Полностью рабочий аппарат в идеальном состоянии.
     *              В Гугле очень много информации о данной модели. По записи и воспроизведении многим моделям с более высоким ценником даст фору.",
     *      "importRequestId":"5e3d5113669ecc3dcd489823",
     *      "images":[
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/0.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/1.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/2.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/3.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/4.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/5.jpg",
     *          "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/6.jpg",
     *           "http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/7.jpg"
     *      ],
     *      "srcImages": [
     *          "https://apollo-ireland.akamaized.net:443/v1/files/5hk0vi4qdstv-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/w6m0hm7qlb0o1-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/rm8jemxtpfzd-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/40pacxt1q4gl3-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/2b2gnzyekowc3-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/26hxjiwna67v1-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/cbb6thpmrk8i1-UA/image;s=644x461",
     *          "https://apollo-ireland.akamaized.net:443/v1/files/e6hwy3g6ujje3-UA/image;s=644x461"
     *      ],
     *      "details":[
     *          {
     *              "measure":"Объявление от",
     *              "value":"Бизнес"
     *          },
     *          {
     *              "measure":"Вид аудиотехники",
     *              "value":"Магнитолы"
     *          },
     *          {
     *              "measure":"Состояние",
     *              "value":"Б/у"
     *          }
     *      ],
     *      "createdAt":"2020-02-08T10:53:08.606Z",
     *      "_id":"5e3e931423e2900e0422a96f"
     * }
     *
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
     * HTTP/1.1 500 Internal Server Error
     * {
     *     "errors": "CastError: Cast to ObjectId failed for value \"1\" at path \"_id\" for model \"OFFERS\""
     * }
     */
    async createOffer(req, res, next) {
        const offer = req.body;
        try {
            await offerService.importOffer(offer);
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({status: "success"});
    }

    /**
     * @api {delete} /offers/offer/:id deleteOffer
     * @apiGroup Offers
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
    async deleteOffer(req, res, next) {
        const { id } = req.params;
        try {
            await OffersModel.deleteOne({_id: id}).exec();
        } catch (e) {
            console.log(e);
            next(e);
        }

        return res.json({status: 'success'});
    }
}

export default new OffersController();