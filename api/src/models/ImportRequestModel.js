import mongoose from 'mongoose';
import { mongoConnection } from '../db';

const Schema = mongoose.Schema;

export const REQUEST_STATUS = {
    NEW: 'NEW',
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
    STATUSES: 'ERROR'
};

const ImportRequestSchema = new Schema({
    email: String,
    olxAccountUrl: String,
    comments: String,
    status: String,
    requestedAt: Date,
});

export default mongoConnection.model('ImportRequest', ImportRequestSchema);
