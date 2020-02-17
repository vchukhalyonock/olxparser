import { OffersModel } from "../models";
import headingService from "./HeadingService";

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
}

export default new OfferService();
