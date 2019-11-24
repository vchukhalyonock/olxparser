import Controller, { VERB } from "../core/Controller";
import {
    OffersModel,
    ImportRequestModel
} from "../models";
import { OFFERS_URL } from "../constants/urls";
import Error from "../core/Error";

class OffersController extends Controller {
    get routes() {
        return [
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

    async getOffers(req, res, next) {
        const {
            query: {
                limit ,
                offset
            },
            params: {
                importRequestId
            }
        } = req;

        let offers = null;
        let total = 0;
        try {
            offers = await OffersModel.paginate({importRequestId}, {limit, offset});
            total = await OffersModel.countDocuments().exec();
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