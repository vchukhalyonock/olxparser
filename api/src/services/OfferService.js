import { OffersModel } from "../models";
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
            if(!await isOfferExists(offer.url)) {
                await exportOffer(offer);
            }
            await this.removeOfferFromCCExportList(offer.id);
        }
    }

    async getAllOffersToExport() {
        return OffersModel.paginate(
            { ccExport: true },
            {
                limit: conf.onceImportNumber,
                offset: 0
            });
    }
}



export default new OfferService();
