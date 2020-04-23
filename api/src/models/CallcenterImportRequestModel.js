import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { mongoConnection } from '../db';

const Schema = mongoose.Schema;

export const CALLCENTER_REQUEST_STATUS = {
    NEW: 'NEW',
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
    ERROR: 'ERROR'
};

const CallcenterImportRequestSchema = new Schema({
    olxUrl: String,
    sessionIs: String,
    limit: Number,
    errorMessage: String,
    status: String,
    requestedAt: Date,
    processedAt: Date
});

CallcenterImportRequestSchema.index({ olxUrl: 1 }, { unique: true });

CallcenterImportRequestSchema.plugin(mongoosePaginate);

export default mongoConnection.model('CallcenterImportRequest', CallcenterImportRequestSchema);
