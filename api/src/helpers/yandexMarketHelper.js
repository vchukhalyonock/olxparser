import yml from 'yandex-market-language';
import {
    toString,
    truncate,
    toNumber
} from 'lodash';
import currencies,
{
    currencyAssoc,
    DEFAULT_CURRENCY_ID
} from "../constants/currencies";

export const YMLConverter = (importRequest, offersList) => {

    const convertData = convertOffers(offersList);

    const YMLJson = {
        name: importRequest.email,
        company: importRequest.phone,
        url: importRequest.olxAccountUrl,
        currencies,
        'delivery-options': [],
        categories: convertData.categories,
        offers: convertData.offers
    };

    return yml(YMLJson).end({ pretty: true });
};

const convertOffers = (offerList) => {
    const categoriesList = [];
    const offersList = [];
    let parentId = undefined;

    for (let offerIndex = 0; offerIndex < offerList.length; offerIndex++) {
        const offer = offerList[offerIndex];
        const heading = categoriesList.find(elem => elem.id === toString(offer.headingId));
        if(heading) {
            parentId = heading.id;
        } else {
            categoriesList.push({
                id: toString(offer.headingId),
                name: offer.headingString
            });
        }

        offersList.push(convertOffer(offer, parentId));
    }

    return {
        offers: offersList,
        categories: categoriesList
    };
};


const detailsConvertor = (details) => {
    const detailsResult = [];
    for (let i = 0; i < details.length; i++) {
        const {
            measure,
            value
        } = details[i];
        for(let j = 0; j < value.length; j++) {
            detailsResult.push({
                name: measure,
                value: value[j]
            })
        }
    }

    return detailsResult;
};


const currencyFounder = (currency) => currencyAssoc.reduce(
        (acc ,item) => {
            if(item.names.includes(toString(currency).toLowerCase())) {
                acc = item.id;
            }
            return acc;
        },
        DEFAULT_CURRENCY_ID
    );


const convertOffer = (offer, categoryId) => ({
        id: truncate(offer.offerId, {length: 20, omission: ''}),
        available: true,
        url: offer.url,
        price: offer.price ? toNumber(offer.price.amount.replace(/\s/g, "")) : 0,
        currencyId: currencyFounder(offer.price ? offer.price.volume : DEFAULT_CURRENCY_ID),
        categoryId: toString(categoryId),
        name: truncate(offer.title, {length: 120}),
        description: offer.description,
        param: detailsConvertor(offer.details),
        picture: offer.images.filter((item, index) => index < 10)
    });
