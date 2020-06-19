import { OffersModel } from "../models";
import { OFFER_STATUS } from "../models/OffersModel";
import headingService from "./HeadingService";
import config from "../config";
import {
    isOfferExists,
    exportOffer
} from "../helpers/callCenterHelper";

const conf = config.callCenter;

class OfferService {

    async importOffer(offer) {
        const newOffer = {
            ...offer,
            createdAt: new Date(),
            headingId: null,
            headingString: ''
        };
        const headingObj = await headingService.addHeadingOrGetId(newOffer.heading);
        if(headingObj) {
            newOffer.headingId = headingObj.id;
            newOffer.headingString = headingObj.headingString
        }

        const offerModel = new OffersModel(newOffer);
        await offerModel.save();
    }

    async removeOfferFromCCExportList(offerId) {
        return OffersModel
            .updateOne({_id: offerId}, { ccExport: false })
            .exec();
    }

    async setExportErrors(offerId, errors) {
        await this.setOfferStatus(offerId, OFFER_STATUS.FAILED);
        return OffersModel
            .updateOne({ _id: offerId }, { exportErrors: errors })
            .exec();
    }

    async setOfferStatus(offerId, status) {
        return OffersModel
            .updateOne({ _id: offerId }, { ccExportStatus: status })
            .exec();
    }

    async removeOffersFromCCExportListByImortRequestId(importRequestId) {
        return OffersModel
            .updateMany({ importRequestId }, { ccExport: false })
            .exec();
    }

    async addOffersToCCExportList(ids = []) {
        return OffersModel
            .updateMany({_id: { $in : ids}}, { ccExport: true })
            .exec();
    }

    async addAllOffersToCCExportList(importRequestId) {
        return OffersModel
            .updateMany({importRequestId}, { ccExport: true })
            .exec();
    }

    async exportToCallCenter() {
        const offerToExport = await this.getAllOffersToExport();
        for(let i = 0; i < offerToExport.length; i++) {
            const offer = offerToExport[i];
            let response;
            if(!await isOfferExists(offer.url)) {
                response = await exportOffer(offer);
                console.log(response);
            } else {
                response = {
                    errors: { error: "Offer already exists in Call Center database" }
                };
            }
            if(response.errors) {
                await this.setExportErrors(offer.id, response.errors);
            }
            await this.setOfferStatus(offer.id, (response && response.errors) ? OFFER_STATUS.FAILED : OFFER_STATUS.EXPORTED);
            await this.removeOfferFromCCExportList(offer.id);
        }
    }

    async getAllOffersToExport() {
        const offers = await OffersModel.paginate(
            { $or: [
                    { ccExport: true },
                    { ccExportStatus: OFFER_STATUS.NEW }
                ]
            },
            {
                limit: conf.onceImportNumber,
                offset: 0
            });
        return offers.docs;
    }
}



export default new OfferService();
