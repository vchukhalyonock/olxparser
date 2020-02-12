import {
    HeadingModel,
    OffersModel
} from "../models";

class HeadingService {
    async isExist(headingName, id = null) {
        let heading;
        if(id) {
            heading = await HeadingModel
                .findOne({
                    heading: headingName,
                    _id: {
                        $ne: id
                    }
                })
                .exec();
        } else {
            heading = await HeadingModel
                .findOne({heading: headingName})
                .exec();
        }
        return !!heading;
    }

    async hasOffers(headingId) {
        const offers = await OffersModel
            .find({
                headingId
            })
            .exec();
        let offersIds = null;
        if(offers && offers.docs) {
            offersIds = offers.docs.map(offer => offer._id);
        }

        return offersIds;
    }
}

export default new HeadingService();
