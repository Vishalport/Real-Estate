import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';

export default Express.Router()

    .post('/userLogin', controller.userLogin)
    .post('/Register', controller.Register)
    .post('/verifyOTP', controller.verifyOTP)
    .post('/resendOTP', controller.resendOTP)
    .post('/forgotPassword', controller.forgotPassword)
    .put('/resetPassword/:token', controller.resetPassword)
    .get('/agentsList', controller.agentsList)
    .use(auth.verifyToken)
    .post('/sendMessageToSeller/:_id', controller.sendMessageToSeller)
    .get('/getProfile', controller.getProfile)
    .put('/changePassword', controller.changePassword)
    .put('/editProfile', controller.editProfile)
