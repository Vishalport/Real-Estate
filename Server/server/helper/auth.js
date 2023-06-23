import config from "config";
import jwt from "jsonwebtoken";
import userModel from "../models/user";
import apiError from './apiError';
import responseMessage from '../../assets/responseMessage';

module.exports = {
  verifyToken(req, res, next) {
    if (req.headers.token) {
      jwt.verify(req.headers.token, config.get('jwtsecret'), (err, result) => {
        if (err) {
          throw apiError.unauthorized();
        }
        else {
          console.log(result)
          userModel.findOne({ _id: result._id }, (error, result2) => {
            // console.log("16============",result2); 
            if (error) {
              return next(error)
            }
            else if (!result2) {
              // throw apiError.notFound(responseMessage.USER_NOT_FOUND);
              return res.status(404).json({
                responseCode:404,
                responseMessage:"USER NOT FOUND"
              })
            }
            else {
              if (result2.status == "BLOCKED") {
                return res.status(403).json({
                  responseCode:403,
                  responseMessage:"You Have been blocked by admin ."
                })}
              else if (result2.status == "DELETE") {
                return res.status(401).json({
                  responseCode:401,
                  responseMessage:"Your account has been deleted by admin ."
                })}
              else {
                req.userId = result._id;
                req.userDetails = result
                next();
              }
            }
          })
        }
      })
    } else {
      throw apiError.badRequest(responseMessage.NO_TOKEN);
    }
  },

}