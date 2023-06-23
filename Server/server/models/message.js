import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from '../enums/status';

var messageModel = new Schema(
    {
        name: {
            type: String
        },
        userId: { type: Schema.Types.ObjectId, ref: "property-Info" },
        cardId: { type: Schema.Types.ObjectId, ref: "user" },
        email: {
            type: String
        },
        mobileNumber: {
            type: Number
        },
        message: {
            type: String
        },
    },
    { timestamps: true }
);
messageModel.index({ location: "2dsphere" })
messageModel.plugin(mongooseAggregatePaginate)
messageModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("message-Info", messageModel);