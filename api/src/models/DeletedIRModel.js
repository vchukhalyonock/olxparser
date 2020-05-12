import mongoose from "mongoose";
import { mongoConnection } from "../db";
import { OFFER_TYPE } from "./OffersModel";

const Schema = mongoose.Schema;

const DeletedIRSchema = new Schema({
   importRequestId: {
       type: String,
       index: true,
       unique: true
   },
    offerType: {
        type: String,
        default: OFFER_TYPE.CUSTOMER
    }
});

export default mongoConnection.model('DeletedIR', DeletedIRSchema);
