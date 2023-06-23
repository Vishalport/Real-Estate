import userModel from "../../../models/user";
import status from '../../../enums/status';
import userType from "../../../enums/userType";


const userServices = {
  userCheck: async (userId) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { $or: [{ email: userId }, { mobileNumber: userId }] }] }
    return await userModel.findOne(query);
  },
  checkUserExists: async (mobileNumber, email) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { $or: [{ email: email }, { mobileNumber: mobileNumber }] }] }
    return await userModel.findOne(query);
  },
  
  emailMobileExist: async (email, mobileNumber) => {
    let query = { $and: [{ status: { $ne: status.DELETE }, userType: { $in: [userType.ADMIN, userType.SUBADMIN] } }, { $or: [{ email: email }, { mobileNumber: mobileNumber }] }] }
    return await userModel.findOne(query);
  },

  emailMobileExist: async (mobileNumber, email, id) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { _id: { $ne: id } }, { $or: [{ email: email }, { mobileNumber: mobileNumber }] }] }
    return await userModel.findOne(query);
  },

  checkSocialLogin: async (socialId, socialType) => {
    return await userModel.findOne({ socialId: socialId, socialType: socialType });
  },

  createUser: async (insertObj) => {
    return await userModel.create(insertObj);
  },

  findUser: async (query) => {
    return await userModel.findOne(query);
  },

  ListUser: async (query) => {
    return await userModel.find(query);
  },

  countUser: async (query) => {
    return await userModel.count(query);
  },
  
  findCount: async (query) => {
    return await userModel.count(query);
  },

  updateUser: async (query, updateObj) => {
    return await userModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  updateUserById: async (query, updateObj) => {
    return await userModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  insertManyUser: async (obj) => {
    return await userModel.insertMany(obj);
  },
  createAddress: async (validatedBody) => {
    return await userModel(validatedBody).save()
  },
  
  editEmailMobileExist: async (email, mobileNumber, userId) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { _id: { $ne: userId } }, { $or: [{ email: email }, { mobileNumber: mobileNumber }] }] }
    return await userModel.findOne(query);
  },


  makeUserVender: async (query, updateObj) => {
    return await userModel.findOneAndUpdate(query, updateObj, { new: true });
  },
  
  UpdateProfile: async (query, updateObj) => {
    return await userModel.findOneAndUpdate(query, updateObj, { new: true });
  },
}

module.exports = { userServices };