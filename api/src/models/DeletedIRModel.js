import mongoose from "mongoose";
import { mongoConnection } from "../db";

const Schema = mongoose.Schema;

const DeletedIRSchema = new Schema({
   importRequestId: {
       type: String,
       index: true,
       unique: true
   }
});

export default mongoConnection.model('DeletedIR', DeletedIRSchema);
