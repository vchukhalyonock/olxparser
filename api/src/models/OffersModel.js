import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { mongoConnection } from '../db';

const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    importRequestId: String,
    caption: String,
    description: String,
    link: String,
    heading: Array,
    price: String,
    images: Array,
    createdAt: Date
});

OfferSchema.plugin(mongoosePaginate);

export default mongoConnection.model('Offer', OfferSchema);
