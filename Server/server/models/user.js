import Mongoose, { Schema, Types} from "mongoose";
const { ObjectId } = require('mongoose').Types;
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import status from '../enums/status';
import bcrypt from 'bcryptjs';

var userModel = new Schema(
  {
    email: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    countryCode: {
      type: String
    },
    mobileNumber: {
      type: String
    },
    password: {
      type: String
    },
    dateOfBirth: {
      type: String
    },
    otp: {
      type: String
    },
    otpVerified: {
      type: Boolean,
      default: true
    },
    isReset: {
      type: Boolean,
      default: true
    },
    userType: {
      type: String,
      default: userType.USER
    },
    status: {
      type: String,
      default: status.ACTIVE
    },
    userName: {
      type: String
    },
    address: {
      type: String
    },
    otpExpireTime: {
      type: Number
    },
    images: {
      type: String,
      default: "xxxxxxxx"
    },
    wishList: [{
      type : ObjectId, ref: "property-Info"
    }],
  },
  { timestamps: true }
);
userModel.index({ location: "2dsphere" })
userModel.plugin(mongooseAggregatePaginate)
userModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("user", userModel);

Mongoose.model("user", userModel).find({ userType: userType.ADMIN }, async (err, result) => {
  if (err) {
    console.log("DEFAULT ADMIN ERROR", err);
  }
  else if (result.length != 0) {
    console.log("Default Admin. 😀😀")
  }
  else {

    let obj = {
      userType: userType.ADMIN,
      firstName: "vishal",
      lastName:"kumar",
      userName: "vishalport",
      countryCode: "+91",
      mobileNumber: "9931627686",
      email: "vishal.kumar@moondive.co",
      dateOfBirth: "24/04/1996",
      password: bcrypt.hashSync("Moondive@1"),
      address: "Delhi, India",
      profilePic:"",
    };
    Mongoose.model("user", userModel).create(obj, async (err1, result1) => {
      if (err1) {
        console.log("Default admin  creation error", err1);
      } else {
        console.log("Default admin created 😀😀");
      }
    });
  }
});