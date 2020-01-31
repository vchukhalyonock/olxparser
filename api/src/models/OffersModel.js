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
    importRequestId: String,
    createdAt: Date
});

OfferSchema.plugin(mongoosePaginate);

export default mongoConnection.model('Offer', OfferSchema);
