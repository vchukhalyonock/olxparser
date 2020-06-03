import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { mongoConnection } from '../db';

export const OFFER_TYPE = {
    CUSTOMER: 'customer',
    CALLCENTER: 'callcenter'
};

const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    heading: Array,
    details: Array,
    description: String,
    phone: String,
    price: Object,
    title: String,
    url: String,
    images: Array,
    srcImages: Array,
    importRequestId: String,
    headingId: Number,
    headingString: String,
    city: {
        type: String,
        default: ''
    },
    region: {
        type: String,
        default: ''
    },
    offerId: {
        type: String,
        default: ''
    },
    offerType: {
        type: String,
        default: OFFER_TYPE.CUSTOMER
    },
    createdAt: Date,
    ccExport: {
        type: Boolean,
        default: false
    },
    userName: {
        type: String,
        default: ''
    },
    exportErrors: {
        type: Object,
        default: {}
    }
});

OfferSchema.plugin(mongoosePaginate);

export default mongoConnection.model('Offer', OfferSchema);
