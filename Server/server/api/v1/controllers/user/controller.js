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
import speakeasy from "speakeasy";
import userType from "../../../../enums/userType";
const secret = speakeasy.generateSecret({ length: 10 });
import { userServices } from "../../services/user";
import {messageServices} from "../../services/message"
const {
  UpdateProfile,
  checkUserExists,
  emailMobileExist,
  createUser,
  findUser,
  updateUser,
  countUser,
  ListUser
} = userServices;

const {CreateMessage} = messageServices;
import { propertyService } from "../../services/property"
const { AddNewProperty, checkPropertyExists, PropertyList, findProperty } = propertyService
export class userController {
  /**
   * @swagger
   * /user/userSignUp:
   *   post:
   *     tags:
   *       - USER
   *     description: userSignUp
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userSignUp
   *         description: userSignUp
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/userSignup'
   *     responses:
   *       200:
   *         description: User created successfully
   *       409:
   *         description: This email already exists ./ This mobile number already exists.
   *       400:
   *         description:  Password and confirm password does not match
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async Register(req, res, next) {
    const validationSchema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      countryCode: Joi.string().optional(),
      mobileNumber: Joi.string().required(),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().optional(),
      images: Joi.string().optional(),
      userType: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      const {
        firstName,
        surName,
        countryCode,
        mobileNumber,
        email,
        password,
        dateOfBirth,
        confirmPassword,
        otp,
        otpExpireTime,
        images,
        userType,
      } = validatedBody;
      var userInfo = await checkUserExists(mobileNumber, email);
      if (userInfo) {
        if (userInfo.email == email) {
          throw apiError.conflict(responseMessage.EMAIL_EXIST);
        } else {
          throw apiError.conflict(responseMessage.MOBILE_EXIST);
        }
      } else {
        if (password != req.body.confirmPassword) {
          throw apiError.badRequest(responseMessage.NOT_MATCH);
        }
        validatedBody.otp = commonFunction.getOTP();
        validatedBody.otpExpireTime = Date.now() + 180000;
        validatedBody.password = bcrypt.hashSync(validatedBody.password);
        // validatedBody.refferalCode = commonFunction.makeReferral();
        // await commonFunction.sendMail(email, validatedBody);
        // await commonFunction.sendSms(validatedBody.countryCode + validatedBody.mobileNumber, validatedBody.otp);
        var result = await createUser(validatedBody);
        console.log(result);
        return res.json(new response(result, responseMessage.USER_CREATED));
      }
    } catch (error) {
      console.log("error ==========> 79", error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/verifyOTP:
   *   post:
   *     tags:
   *       - USER
   *     description: verifyOTP
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: verifyOTP
   *         description: verifyOTP
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/verifyOTP'
   *     responses:
   *       200:
   *         description: OTP verified successfully.
   *       404:
   *         description: User not found..
   *       400:
   *         description: OTP expired. / Incorrect OTP.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async verifyOTP(req, res, next) {
    var validationSchema = {
      email: Joi.string().required(),
      otp: Joi.string().required(),
    };
    try {
      var validatedBody = await Joi.validate(req.body, validationSchema);
      const { email, otp } = validatedBody;
      var userResult = await findUser({
        $or: [{ email: email }, { mobileNumber: email }],
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        if (Date.now() > userResult.otpExpireTime) {
          throw apiError.badRequest(responseMessage.OTP_EXPIRED);
        }
        if (userResult.otp != otp) {
          throw apiError.badRequest(responseMessage.INCORRECT_OTP);
        }
        var updateResult = await updateUser(
          { _id: userResult._id },
          { otpVerified: true, isReset: true }
        );
        var token = await commonFunction.getToken({
          _id: updateResult._id,
          email: updateResult.email,
          userType: updateResult.userType,
        });

        let refreshToken = await commonFunction.getRefeshToken({
          _id: userResult._id,
          email: userResult.email,
          userType: userResult.userType,
        });
        res.json({ userResult, token, refreshToken });
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/resendOTP:
   *   post:
   *     tags:
   *       - USER
   *     description: resendOTP
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: resendOTP
   *         description: resendOTP
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/resendOTP'
   *     responses:
   *       200:
   *         description: OTP has been sent successfully on register email.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async resendOTP(req, res, next) {
    var validationSchema = {
      email: Joi.string().required(),
    };
    try {
      var validatedBody = await Joi.validate(req.body, validationSchema);
      const { email, otpExpireTime, otp } = validatedBody;
      var userResult = await findUser({
        $or: [{ email: email }, { mobileNumber: email }],
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let otp = await commonFunction.getOTP();
        let otpExpireTime = Date.now() + 180000;
        if (userResult.email == email) {
          await commonFunction.sendEmailOtp(email, otp);
        }
        if (userResult.mobileNumber == email) {
          await commonFunction.sendSms(
            userResult.countryCode + userResult.mobileNumber,
            otp
          );
        }
        var updateResult = await updateUser(
          { _id: userResult._id },
          { otp: otp, otpExpireTime: otpExpireTime, otpVerified: false }
        );
        return res.json(new response(updateResult, responseMessage.OTP_SEND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/forgotPassword:
   *   post:
   *     tags:
   *       - USER
   *     description: forgotPassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: forgotPassword
   *         description: forgotPassword
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/forgotPassword'
   *     responses:
   *       200:
   *         description: OTP has been sent successfully on register email.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async forgotPassword(req, res, next) {
    var validationSchema = {
      email: Joi.string().required(),
    };
    try {
      var validatedBody = await Joi.validate(req.body, validationSchema);
      const { email } = validatedBody;
      var userResult = await findUser({
        $or: [{ email: email }, {}],
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let otp = await commonFunction.getOTP();
        let otpExpireTime = Date.now() + 180000;
        if (userResult.email == email) {
          // await commonFunction.sendEmailOtp(email, otp);
          console.log("Email sent..!!");
        }
        // if (userResult.mobileNumber == email) {
        //   await commonFunction.sendSms(
        //     userResult.countryCode + userResult.mobileNumber,
        //     otp
        //   );
        // }
        var updateResult = await updateUser(
          { _id: userResult._id },
          { otp: otp, otpExpireTime: otpExpireTime, isReset: true }
        );
        return res.json(new response(updateResult, responseMessage.OTP_SEND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/resetPassword/{token}:
   *   put:
   *     tags:
   *       - USER
   *     description: resetPassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: path
   *         required: true
   *       - name: resetPassword
   *         description: resetPassword
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/resetPassword'
   *     responses:
   *       200:
   *         description: Password has been changed successfully.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async resetPassword(req, res, next) {
    var validationSchema = {
      newPassword: Joi.string().required(),
    };
    try {
      var validatedBody = await Joi.validate(req.body, validationSchema);
      const { token } = req.params;
      var result = await jwt.verify(token, config.get("jwtsecret"));
      var userResult = await findUser({
        _id: result._id,
        userType: { $in: [userType.USER] },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      var updateResult = await updateUser(
        { _id: userResult._id },
        { isReset: true, password: bcrypt.hashSync(validatedBody.newPassword) }
      );
      return res.json(new response(updateResult, responseMessage.PWD_CHANGED));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /user/changePassword:
   *   put:
   *     tags:
   *       - USER
   *     description: changePassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: oldPassword
   *         description: oldPassword
   *         in: formData
   *         required: true
   *       - name: newPassword
   *         description: newPassword
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Password has been changed successfully.
   *       400:
   *         description: Invalid password.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async changePassword(req, res, next) {
    const validationSchema = {
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    };
    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.USER] },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      if (bcrypt.compareSync(validatedBody.oldPassword, userResult.password)) {
        var updated = await updateUser(
          { _id: userResult._id },
          { password: bcrypt.hashSync(validatedBody.newPassword) }
        );
        return res.json(new response(updated, responseMessage.PWD_CHANGED));
      }
      throw apiError.badRequest(responseMessage.PWD_NOT_MATCH);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/userLogin:
   *   post:
   *     tags:
   *       - USER
   *     description: login
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: email/mobilenumber
   *         in: formData
   *         required: true
   *       - name: password
   *         description: password
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Login successfully.
   *       402:
   *         description: Incorrect login credential provided.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */

  //-----------------------------LOGIN -------------------------

  async userLogin(req, res, next) {
    let validationSchema = {
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    };
    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      const { email, password } = validatedBody;
      console.log("-----------------------Req.body-", email);
      let userResult = await findUser({ email: email });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      if (userResult.otpVerified == false) {
        throw apiError.invalid(responseMessage.INCORRECT_LOGIN);
      }
      if (!bcrypt.compareSync(validatedBody.password, userResult.password)) {
        throw apiError.invalid(responseMessage.INCORRECT_LOGIN);
      }
      let token = await commonFunction.getToken({
        _id: userResult._id,
        email: userResult.email,
        userType: userResult.userType,
      });
      let refreshToken = await commonFunction.getRefeshToken({
        _id: userResult._id,
        email: userResult.email,
        userType: userResult.userType,
      });
      res.json({ userResult, token, refreshToken });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/getProfile:
   *   get:
   *     tags:
   *       - USER
   *     description: getProfile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: User token
   *         in: header
   *         required: true
   *     responses:
   *       200:
   *         description: Profile details found successfully.
   *       404:
   *         description: User not found.
   *       501:
   *         description: Something went wrong.
   *       500:
   *         description: Internal server error.
   */
  async getProfile(req, res, next) {
    try {
      let userResult = await findUser({ _id: req.userId });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/editProfile:
   *   put:
   *     tags:
   *       - USER
   *     description: update Profile for particular user that he want to update in future
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: mobileNumber
   *         description: mobileNumber
   *         in: formData
   *         required: false
   *       - name: firstName
   *         description: firstName
   *         in: formData
   *         required: false
   *       - name: firstName
   *         description: firstName
   *         in: formData
   *         required: false
   *       - name: lastName
   *         description: lastName
   *         in: formData
   *         required: false
   *       - name: country
   *         description: country
   *         in: formData
   *         required: false
   *       - name: countryCode
   *         description: countryCode
   *         in: formData
   *         required: false
   *       - name: companyName
   *         description: companyName
   *         in: formData
   *         required: false
   *       - name: tinNumber
   *         description: tinNumber
   *         in: formData
   *         required: false
   *       - name: gstNumber
   *         description: gstNumber
   *         in: formData
   *         required: false
   *       - name: state
   *         description: state
   *         in: formData
   *         required: false
   *       - name: address
   *         description: address
   *         in: formData
   *         required: false
   *       - name: city
   *         description: city
   *         in: formData
   *         required: false
   *       - name: zipCode
   *         description: zipCode
   *         in: formData
   *         required: false
   *       - name: dateOfBirth
   *         description: dateOfBirth
   *         in: formData
   *         required: false
   *       - name: profilePic
   *         description: profilePic
   *         in: formData
   *         type: file
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async editProfile(req, res, next) {
    const validationSchema = {
      email: Joi.string().allow("").optional(),
      mobileNumber: Joi.string().allow("").optional(),
      firstName: Joi.string().allow("").optional(),
      lastName: Joi.string().allow("").optional(),
      country: Joi.string().allow("").optional(),
      countryCode: Joi.string().allow("").optional(),
      companyName: Joi.string().allow("").optional(),
      tinNumber: Joi.string().allow("").optional(),
      gstNumber: Joi.string().allow("").optional(),
      state: Joi.string().allow("").optional(),
      address: Joi.string().allow("").optional(),
      city: Joi.string().allow("").optional(),
      zipCode: Joi.string().allow("").optional(),
      dateOfBirth: Joi.string().allow("").optional(),
      profilePic: Joi.string().allow("").optional(),
    };
    try {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
      const validatedBody = await Joi.validate(req.body, validationSchema);
      const { firstName, lastName, mobileNumber, dateOfBirth, address } =
        validatedBody;
      let userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      var result = await UpdateProfile(
        { _id: userResult._id },
        {
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          dateOfBirth: dateOfBirth,
          address: address,
        }
      );
      return res.json(new response(result, responseMessage.USER_UPDATED));
    } catch (error) {
      console.log("error", error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/uploadImage:
   *   post:
   *     tags:
   *       - USER
   *     description: uploadImage
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: image
   *         description: image
   *         in: formData
   *         type: file
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */

  async uploadImage(req, res, next) {
    try {
      var result = await commonFunction.getImageUrl(req.files);
      return res.json(new response(result, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  async sendMessageToSeller(req, res, next) {
    const validationSchema = {
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      mobileNumber: Joi.optional(),
      message: Joi.string().optional(),
    };
    try {
      let validatedBody = await Joi.validate(req.body, validationSchema);
      const { name, email, mobileNumber, message } = validatedBody;
      let userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      console.log("-----------------------------------------------params--", req.params);
      console.log("-----------------------------------------------userId--", req.userId);
      const { _id } = req.params;
      let property_Result = await findProperty({ _id: _id, status: status.ACTIVE });
      if (!property_Result) {
          throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND)
      }
      validatedBody.cardId = property_Result._id;
      validatedBody.userId = userResult._id;
      const result = await CreateMessage(validatedBody);
      return res.json(new response(result, responseMessage.MESSAGE_CRATED));
    } catch (error) {
      return next(error);
    }
  }

  async agentsList(req, res, next) {
    try {
      let userResult = await ListUser({status: { $ne: status.DELETE }});
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }


  async agentsCount(req, res, next) {
    try {
      let userResult = await countUser({_id: req.userId, status: { $ne: status.DELETE }, userType : userType.SELLER});
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  async agents(req, res, next) {
    try {
      let userResult = await findUser({_id: req.userId, status: { $ne: status.DELETE }, userType : userType.SELLER});
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }
}

export default new userController();
