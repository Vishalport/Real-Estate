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
const { AddNewProperty, checkPropertyExists, PropertyList, editProperty, findProperty, countProperty, ListProperty } = propertyService
import { userServices } from "../../services/user";
import { allow } from "joi/lib/types/lazy";
const { UpdateProfile, checkUserExists, emailMobileExist, createUser, findUser, updateUser, } = userServices;
import propertyModel from "../../../../models/property"

export class propertyController {

    async addNewProperty(req, res, next) {
        const validationSchema = {
            name: Joi.string().required(),
            // userid: Joi.string.required(), 
            price: Joi.string().required(),
            address: Joi.string().required(),
            bedrooms: Joi.string().required(),
            bathrooms: Joi.string().required(),
            carpark: Joi.string().required(),
            size: Joi.string().required(),
            type: Joi.string().required(),
            action: Joi.string().required(),
            floor: Joi.string().required(),
            images: Joi.string().required(),
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { name, price, address, bathrooms, bedrooms, carpark, size, type, floor, images } = validatedBody
            let userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            console.log("userResult----------------", userResult._id);
            var propertyInfo = await checkPropertyExists(name, floor)
            if (propertyInfo) { throw apiError.conflict(responseMessage.PROPERTY_ALREADY_ADD) }
            validatedBody.userId = userResult._id;
            const newProperty = await AddNewProperty(validatedBody)
            return res.json(new response(newProperty, responseMessage.PROPERTY_ADD))
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }


    async ListRentProperty(req, res, next) {
        try {
            let ListProperty = await PropertyList({ action: "RENT", status: status.ACTIVE });
            if (!ListProperty) {
                throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND)
            }
            return res.json(new response(ListProperty, responseMessage.PROPERTY_FOUND));
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }


    async ListSELLProperty(req, res, next) {
        try {
            let ListProperty = await PropertyList({ action: "SELL", status: status.ACTIVE });
            if (!ListProperty) {
                throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND)
            }
            return res.json(new response(ListProperty, responseMessage.PROPERTY_FOUND));
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    async Updateproperty(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
            return next(error);
        }
    }

    async PropertyList(req, res, next) {
        try {
            const page = req.params.page ? req.page.page : 1;
            let userResult = await findUser({ _id: req.userId, status: { $ne: status.DELETE }, });
            if (!userResult) { throw apiError.notFound(responseMessage.USER_NOT_FOUND); }
            let property_Result = await ListProperty({ userId: userResult._id, status: status.ACTIVE })
            if (!property_Result) { throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND) }
            return res.json(new response(property_Result, responseMessage.PROPERTY_FOUND));
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }

    async countProperty(req, res, next) {
        try {
            let property_Result = await countProperty({ _id: req.params._id, status: status.ACTIVE })
            if (!property_Result) { throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND) }
            return res.json(new response(property_Result, responseMessage.PROPERTY_FOUND));
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }


    async viewproperty(req, res, next) {
        try {
            console.log("--------------------------req.params", req.params);
            const { _id } = req.params;
            let property_Result = await findProperty({ _id: _id, status: status.ACTIVE });
            if (!property_Result) {
                throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND)
            }
            return res.json(new response(property_Result, responseMessage.PROPERTY_FOUND));
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    async totalProperty(req, res, next) {
        try {
            let userResult = await findUser({
                _id: req.userId,
                status: { $ne: status.DELETE },
            });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let totalProperty = await countProperty({ userId: userResult._id, status: status.ACTIVE });
            if (!totalProperty) {
                throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND)
            }
            return res.json(new response(totalProperty, responseMessage.PROPERTY_FOUND));
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }


    async edit(req, res, next) {
        const validationSchema = {
            name: Joi.string().allow("").optional(),
            price: Joi.string().allow("").optional(),
            address: Joi.string().allow("").optional(),
            bedrooms: Joi.string().allow("").optional(),
            bathrooms: Joi.string().allow("").optional(),
            carpark: Joi.string().allow("").optional(),
            size: Joi.string().allow("").optional(),
            type: Joi.string().allow("").optional(),
            action: Joi.string().allow("").optional(),
            floor: Joi.string().allow("").optional(),
            images: Joi.string().allow("").optional(),
        };
        try {
            if (req.body.email) {
                req.body.email = req.body.email.toLowerCase();
            }
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { name, price, address, bathrooms, bedrooms, carpark, size, type, floor, images } = validatedBody
            let userResult = await findUser({
                _id: req.userId,
                status: { $ne: status.DELETE },
            });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            console.log("----------------------------------params", req.params);
            var result = await editProperty(
                { _id: req.params._id },
                {
                    name: name,
                    price: price,
                    address: address,
                    bathrooms: bathrooms,
                    bedrooms: bedrooms,
                    carpark: carpark,
                    size: size,
                    type: type,
                    floor: floor,
                    images: images,
                }
            );
            return res.json(new response(result, responseMessage.USER_UPDATED));
        } catch (error) {
            console.log("error", error);
            return next(error);
        }
    }


    async deleteProperty(req, res, next) {
        try {
            let userResult = await findUser({
                _id: req.userId,
                status: { $ne: status.DELETE },
            });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            var result = await editProperty(
                { _id: req.params._id }, { status: status.DELETE }
            );
            return res.json(new response(result, responseMessage.USER_UPDATED));
        } catch (error) {
            console.log("error", error);
            return next(error);
        }
    }


    async enquiriedProperty(req, res, next) {
        try {
            let userResult = await findUser({
                _id: req.userId,
                status: { $ne: status.DELETE },
            });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let messageList = await findMessageList({})
            if (!messageList) {
                throw apiError.notFound("No message Found");
            }
            return res.json(new response(messageList, "Message Found"));
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    async searchProperty(req, res, next) {
        try {
            console.log("-----UI Request : ", req.query);
            const { action, type, priceRange } = req.query
            let price = {
                $gte: parseInt(priceRange[0]),
                $lte: parseInt(priceRange[1]),
            }
            let property_Result = await ListProperty({ action: action, type: type })
            if (!property_Result) {
                throw apiError.notFound(responseMessage.PROPERTY_NOT_FOUND)
            }
            console.log("Searched property -- ", property_Result);
            return res.json(new response(property_Result, responseMessage.PROPERTY_FOUND));
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }
};

export default new propertyController();
