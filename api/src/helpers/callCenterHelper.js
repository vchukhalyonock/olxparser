import rest from "../utils/rest";
import { METHODS } from "../constants/methods";
import { CALLCENTER_BASE_URL } from "../constants/urls";
import { CallcenterImportRequestModel } from "../models";

export const isOfferExists = async (offerUrl) => {
    const response = await rest(
        `${CALLCENTER_BASE_URL}/api/classified/check`,
        METHODS.POST,
        { url: offerUrl }
    );

    if(response.status_code && +response.status_code === 200) {
        return !!response.classified;
    }
}


export const exportOffer = async (offer) => {
    const importRequest = await CallcenterImportRequestModel.findOne({ _id: offer.importRequestId });
    if(!importRequest) return;
    const bundle = convertToExportBundle(importRequest, offer);
    await rest(
        `${CALLCENTER_BASE_URL}/api/classified/store`,
        METHODS.POST,
        bundle
    );
}

const convertToExportBundle = (importRequest, offer) => ({
    id: offer._id, name: offer.title,
    url: offer.url,
    session_id: importRequest.sessionId,
    price: offer.price.amount,
    currency: offer.price.volume,
    description: offer.description,
    city: offer.city,
    params: offer.details.map(detail => ({ name: detail.measure, value: detail.value })),
    images: offer.images,
    phones: [offer.phone],
    user_name: offer.userName
});

