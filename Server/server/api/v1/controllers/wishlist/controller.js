import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from "../../../../helper/apiError";
import response from "../../../../../assets/response";
import bcrypt from "bcryptjs";
import responseMessage from "../../../../../assets/responseMessage";
import commonFunction from "../../../../helper/util";
import jwt from "jsonwebtoken";
import status from "../../../../enums/status";
import { propertyService } from "../../services/property"
const { AddNewProperty, checkPropertyExists, PropertyList, findProperty, addWishList, findWishListCard } = propertyService
import { userServices } from "../../services/user";
const { UpdateProfile, checkUserExists, emailMobileExist, createUser, findUser, updateUser, } = userServices;

export class wishlistController {

  async addWishList(req, res, next) {
    try {
      console.log("----------------testing Line at 20 on server----------------", req.userId);
      console.log("----------------testing Params-- at 20 on server----------------", req.params._id);
      let userResult = await findUser({ _id: req.userId });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let propertyResult = await findProperty({ _id: req.params._id });
      if (!propertyResult) {
        throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND);
      }
      let addToWishList = await addWishList({ _id: userResult._id }, { $addToSet: { wishList: propertyResult._id } });
      if (!addToWishList) {
        throw apiError.conflict(responseMessage.NOT_WISHLIST)
      }
      return res.json(new response({}, responseMessage.WISHLIST));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async removeWishList(req, res, next) {
    try {
      let userResult = await findUser({ _id: req.userId });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let propertyResult = await findProperty({ _id: req.params._id });
      if (!propertyResult) {
        throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND);
      }
      let addToWishList = await addWishList({ _id: userResult._id }, { $pull: { wishList: propertyResult._id } });
      if (!addToWishList) {
        throw apiError.conflict(responseMessage.NOT_WISHLIST)
      }
      return res.json(new response({}, responseMessage.WISHLIST_REMOVED));
    } catch (error) {
      console.log(error);
      return next(error)
    }
  }

  async List(req, res, next) {
    try {
        let userResult = await findUser({ _id: req.userId, status: { $ne: status.DELETE }, });
        if (!userResult) { throw apiError.notFound(responseMessage.USER_NOT_FOUND); }
        let wishList = userResult.wishList
        let wishList_Result = await findWishListCard({ _id: userResult.wishList});
        // .skip(page-1).limit(3).sort({createdAt : -1});
        if (!wishList_Result) { throw apiError.notFound(responseMessage.WISHLIST_NOT_FOUND) }
        return res.json(new response(wishList_Result, responseMessage.WISHLIST_FOUND));
    } catch (error) {
        console.log(error);
        return next(error);
    }
}


}

export default new wishlistController();
