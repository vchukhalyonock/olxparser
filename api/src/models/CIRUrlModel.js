import mongoose from 'mongoose';
import { mongoConnection } from '../db';

const Schema = mongoose.Schema;

const CIRUrlSchema = new Schema({
   importRequestId: String,
   url: String
});

export default mongoConnection.model("CIRUrl", CIRUrlSchema);
