import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import status from '../enums/status';

var propertyModel = new Schema(

  {
    name: {
      type: String
    },
    userId: { type: Schema.Types.ObjectId, ref: "user" }, 
    price: {
      type: String
    },
    address: {
      type: String
    },
    bedrooms: {
      type: String
    },
    bathrooms: {
      type: String
    },
    carpark: {
      type: String
    },
    size: {
      type: String
    },
    type: {
      type: String
    },
    action: {
      type: String
    },
    title: {
      type: String,
    },
    floor: {
      type: String
    },
    status: {
      type: String,
      default: status.ACTIVE
    },
    images: {
      type: String
    },
  },
  { timestamps: true }
);
propertyModel.index({ location: "2dsphere" })
propertyModel.plugin(mongooseAggregatePaginate)
propertyModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("property-Info", propertyModel);