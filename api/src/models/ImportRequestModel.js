import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { mongoConnection } from '../db';

const Schema = mongoose.Schema;

export const REQUEST_STATUS = {
    NEW: 'NEW',
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
    ERROR: 'ERROR'
};

const ImportRequestSchema = new Schema({
    email: String,
    phone: String,
    olxAccountUrl: String,
    comments: String,
    errorMessage: String,
    status: String,
    requestedAt: Date,
    processedAt: Date
});

ImportRequestSchema.plugin(mongoosePaginate);

export default mongoConnection.model('ImportRequest', ImportRequestSchema);
