import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { mongoConnection } from '../db';

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
    createdAt: Date
});

OfferSchema.plugin(mongoosePaginate);

export default mongoConnection.model('Offer', OfferSchema);
