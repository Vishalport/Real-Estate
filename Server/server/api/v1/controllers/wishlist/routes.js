import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';

export default Express.Router()

    .use(auth.verifyToken)
    .post("/addWishList/:_id", controller.addWishList)
    .post("/removeWishList/:_id", controller.removeWishList)
    .get("/List", controller.List)
