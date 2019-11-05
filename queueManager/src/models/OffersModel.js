import mongoose from 'mongoose';
import { mongoConnection } from '../db';

const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    importRequestId: String,
    caption: String,
    description: String,
    link: String,
    heading: String,
    createdAt: Date
});

export default mongoConnection.model('Offer', OfferSchema);
