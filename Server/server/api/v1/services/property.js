import propertyModel from "../../../models/property";
import status from "../../../enums/status";
import propertyType from "../../../enums/property"
import userModel from "../../../models/user";
const propertyService = {
    AddNewProperty: async (insertObj) => {
        return await propertyModel.create(insertObj)
    },
    checkPropertyExists: async (name, floor) => {
        let query = {
            $and: [
                { status: { $ne: status.DELETE } },
                {
                    $or: [
                        { name: name },
                        { floor: floor }
                    ]
                }
            ]
        }
        let query1 = { status: status.ACTIVE, name: name, floor: floor }
        return await propertyModel.findOne(query1)
    },

    PropertyList: async (instantObj) => {
        return await propertyModel.find(instantObj)
    },

    ListProperty: async (instantObj) => {
        return await propertyModel.find(instantObj)
    },

    findWishListCard : async (instantObj) => {
        return await propertyModel.find(instantObj)
    },

    findProperty: async (instantObj) => {
        return await propertyModel.findOne(instantObj).populate("userId")
    },

    addWishList: async (query, updateObj) => {
        return await userModel.findByIdAndUpdate(query, updateObj, { new: true });
    },

    countProperty: async (instantObj) => {
        return await propertyModel.count(instantObj)
    },

    editProperty: async (query, updateObj) => {
        return await propertyModel.findOneAndUpdate(query, updateObj, { new: true });
    },
}

module.exports = { propertyService }