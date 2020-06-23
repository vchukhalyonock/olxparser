import {
    findKey,
    words
} from "lodash";
import rest from "../utils/rest";
import { METHODS } from "../constants/methods";
import { CALLCENTER_BASE_URL } from "../constants/urls";
import { CallcenterImportRequestModel } from "../models";

const operatorsCodes = [
    "039",
    "067",
    "068",
    "096",
    "097",
    "098",
    "050",
    "066",
    "095",
    "099",
    "063",
    "093",
    "091",
    "092",
    "094"
];

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
    return rest(
        `${CALLCENTER_BASE_URL}/api/classified/store`,
        METHODS.POST,
        bundle
    );
}

const currencyReplacer = currency => {
    const matrix = {
        usd: {
            variants: ['$', 'usd']
        },
        eur: {
            variants: ['€', 'eur']
        },
        uah: {
            variants: ['грн', 'uah']
        }
    }

    const pointlessCurrency = currency.replace('.', '').toLowerCase();
    return findKey(matrix, o => {
        return o.variants.includes(pointlessCurrency);
    });
}


const getOperatorCodePositionIndex = phones => {
    for(let i = 0; i < operatorsCodes.length; i++) {
        let codePositionIndex = phones.indexOf(operatorsCodes[i]);
        if(codePositionIndex > -1) {
            return codePositionIndex;
        }
    }
    return -1;
}

const normalizePhones = phones => {
    let onlyDigitalPhones = phones.replace(/[^+\d]/g, '');
    const phonesArray = [];
    let codePositionIndex = getOperatorCodePositionIndex(onlyDigitalPhones);
    while(codePositionIndex > -1) {
        const phone = onlyDigitalPhones.slice(codePositionIndex, codePositionIndex + 10);
        phonesArray.push(phone);
        onlyDigitalPhones = onlyDigitalPhones.slice(codePositionIndex + 10);
        codePositionIndex = getOperatorCodePositionIndex(onlyDigitalPhones);
    }
    return phonesArray;
}

const convertToExportBundle = (importRequest, offer) => ({
    name: offer.title,
    url: offer.url,
    session_id: importRequest.sessionId,
    price: offer.price.amount.replace(' ', ''),
    currency: currencyReplacer(offer.price.volume),
    description: offer.description,
    city: offer.city,
    params: offer.details.map(detail => ({ name: detail.measure, value: detail.value.join(",") })),
    images: offer.srcImages,
    phones: normalizePhones(offer.phone),
    user_name: offer.userName.trim()
});

