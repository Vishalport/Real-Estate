import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .get('/ListRentProperty', controller.ListRentProperty)
    .get('/ListSellProperty', controller.ListSELLProperty)
    .get('/viewproperty/:_id', controller.viewproperty)
    .get('/countProperty/:_id', controller.countProperty)
    .get('/searchProperty', controller.searchProperty)
    .use(auth.verifyToken)
    .post('/addNewProperty', controller.addNewProperty)
    .get('/totalProperty', controller.totalProperty)
    .get('/PropertyList', controller.PropertyList)
    .put('/edit/:_id', controller.edit)
    .put('/deleteProperty/:_id', controller.deleteProperty)
    .get('/enquiried-property', controller.edit)