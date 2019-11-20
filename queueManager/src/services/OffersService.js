import { OffersModel } from "../models";

class OffersService {
    async saveOffers(importRequestId, offers) {
        console.log("Save Offers");
        await OffersModel
            .deleteMany({importRequestId: importRequestId})
            .exec();

        for (let i = 0; i < offers.length; i++) {
            const offer = offers[i];
            offer.importRequestId = importRequestId;
            offer.createdAt = new Date();
            console.log("Saving offer:", offer);
            const offersModel = new OffersModel(offer);
            await offersModel.save();
        }
    }
}

export default OffersService;