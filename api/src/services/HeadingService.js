import {
    HeadingModel,
    OffersModel
} from "../models";
import { isArray } from "lodash";

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

    getCity(heading) {
        const re = /^\S+\s+(\S+)/g;
        const matches = re.exec(heading);
        if(matches && matches.length > 1) {
            return matches[1];
        } else {
            return null;
        }
    }

    makeStringFromArrayHeading(heading) {
        if(!isArray(heading) || heading.length === 0) {
            return null;
        }

        const city = this.getCity(heading[0]);
        const convertedHeading = city
            ? heading.map(item => item.replace(city, "").trim())
            : heading;
        convertedHeading.shift();
        return convertedHeading.join("/");
    }

    async addHeadingOrGetId(heading) {
        const headingString = this.makeStringFromArrayHeading(heading);
        const headingFromDb = await HeadingModel
            .findOne({heading: headingString})
            .exec();

        if(headingFromDb) {
            return {
                id: headingFromDb._id,
                headingString: headingString
            }
        } else {
            const headingModel = new HeadingModel({ heading: headingString, createdAt: new Date() });
            await headingModel.save();
            const headingFromDb = await HeadingModel
                .findOne({heading: headingString})
                .exec();
            if(headingFromDb) {
                return {
                    id: headingFromDb._id,
                    headingString: headingString
                }
            }
        }

        return null;
    }
}

export default new HeadingService();
