import messageModel from "../../../models/message";
import status from '../../../enums/status';
import userType from "../../../enums/userType";


const messageServices = {
    CreateMessage: async (query) => {
        return await messageModel.create(query);
    },
}

module.exports = { messageServices };