import config from "config";
import Joi from "joi";
import jwt from 'jsonwebtoken';
//import twilio from 'twilio';
import Sender from 'aws-sms-send';
// import htmlTemplate from "./htmlTemplate"; 
var aws_topic = 'arn:aws:sns:us-east-1:729366371820:coinbaazar';
var config2 = {
  AWS: {
    accessKeyId: config.get('AWS.accessKeyId'),
    secretAccessKey: config.get('AWS.secretAccessKey'),
    region: config.get('AWS.region')
  },
  topicArn: aws_topic,
};
var sender = new Sender(config2);

import nodemailer from 'nodemailer';
import cloudinary from 'cloudinary';
//import stackingModel from "../models/stackingModel"

cloudinary.config({
  cloud_name: config.get('cloudinary.cloud_name'),
  api_key: config.get('cloudinary.api_key'),
  api_secret: config.get('cloudinary.api_secret')
});

module.exports = {

  getOTP() {
    var otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  },

  getImageUrl(filePath) {
    console.log("-----FILE-   in util-------------------------", filePath)
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(filePath, function (error, result) {
        if (error) {
          console.log("---ERR---------------------", error)
          reject(error);
        } else {
          console.log("result===>>", result.secure_url);
          resolve(result.secure_url);
        }
      });
    });
  },


  // getImageUrl: async (files) => {
  //   var result = await cloudinary.v2.uploader.upload(files, { resource_type: "auto" })
  //   return result.secure_url;
  // },


  sendMail(email, body) {
    console.log("email boyd----------------------------", body);
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'amansinghfoujdar001@gmail.com',
          pass: 'brguqftysvopxibk'
        },
      });
      var mailOption = {
        from: '<no-reply@Moondive.co>',
        to: email,
        subject: "MoonDive account verification",
        // text: body, 
        html: `<div style="font-size:15px">
        <p>Hello ${body.firstName},</p>
        <p>wellcome to MoonDive Private Limited, we are here for your Account verification</p>
        <p>Please use the OTP : ${body.otp}
          to verify your Account.
        </p>
            If you did not request this, please ignore this email and please update your password if you have an account at MoonDive Private Limited. Have a Good day <hr/>
        </p>
        
          <p>
          Thanks & regards,<br/>
          MoonDive Private Limited<br/>
          <img src="https://static.wixstatic.com/media/e3d3d3_cb08a80ec6f7436d91ae2b5324757300~mv2.png/v1/fill/w_48,h_51,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e3d3d3_cb08a80ec6f7436d91ae2b5324757300~mv2.png"/>               
          </p>
      </div>`
      };
      transporter.sendMail(mailOption, (error, result) => {
        ////console.log()("error==>", error, "result==>", result);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  getToken: async (payload) => {
    var token = await jwt.sign(payload, config.get('jwtsecret'))
    return token;
  },

  getRefeshToken : async(payload)=> {
    var token = await jwt.sign(payload, config.get('jwtsecret'), { expiresIn: "24h" })
    return token;
  }
}
