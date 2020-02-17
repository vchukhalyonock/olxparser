import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import mongoPaginate from "mongoose-paginate-v2";
import { mongoConnection } from "../db";

const Schema = mongoose.Schema;

const HeadingSchema = new Schema({
    heading: {
        type: String,
        index: true,
        unique: true
    },
    createdAt: Date
});

autoIncrement.initialize(mongoConnection);

HeadingSchema.plugin(autoIncrement.plugin, 'Heading');
HeadingSchema.plugin(mongoPaginate);

export default mongoConnection.model('Heading', HeadingSchema);
