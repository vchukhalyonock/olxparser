import mongoose from "mongoose";
import { mongoConnection } from '../db';

export const QM_STATUSES = {
    WAIT: 'wait',
    ACTIVE: 'active'
};

const Schema = mongoose.Schema;

const QStatusSchema = new Schema({
    status: String,
    ts: Date
});

export default mongoConnection.model('QStatus', QStatusSchema);
