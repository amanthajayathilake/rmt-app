import chat from "../models/chatGroup.js";
import http from "../utils/httpStatusCodes.js";
import { jsonResponse } from "../utils/serviceUtilities.js";
import { errorMessage } from "../utils/errorMessages.js";

//create chat group
const createChatGroup = (req, res) =>{
    const newChatGroup = chat(req.body);
    newChatGroup.save((error) =>{
        error ?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.CREATED)
                .json(jsonResponse(true, newChatGroup));
    });
}

//send messages
const sendMessages = (req, res) =>{
    const filter = {id: req.params.id || 'inavlidId' };
    const  getMessageData = {
        id:req.body.id,
        content: req.body.content,
        sender:req.body.sender
    }
    chat.findOneAndUpdate(filter, {$push: {messages :  getMessageData}}, (error, chatDetails) =>{
        error ?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
        !chatDetails?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, errorMessage.CHAT_NOT_FOUND)) :
                res.status(http.OK)
                    .json(jsonResponse(true,  getMessageData))
    })
}

//fetch chats
const getAllChatGroups = (req, res) =>{
    chat.find((error, chat) =>{
        error ?
            res.status(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, chat));
    })
}

//getOneChatGroup
const getChatGroup = (req, res) =>{
    const filter = {id: req.params.id || 'inavlidId' };
    chat.findOne(filter, (error, chatGroupDetails) =>{
        error ?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            !chatGroupDetails ?
                res.status(http.NOT_FOUND)
                    .json(jsonResponse(false, errorMessage.CHAT_NOT_FOUND)) :
                res.status(http.OK)
                    .json(jsonResponse(true, chatGroupDetails));
    })
}

//update chat group
const updateChatGroupDetails = (req, res) =>{
    const filter = {id: req.params.id || 'inavlidId' };
    const getChatGroupDetails = {
        id:req.body.id,
        userIds: req.body.userIds,
        chatName: req.body.chatName
    }
    chat.findOneAndUpdate(filter, getChatGroupDetails, (error, updatedGroupDetails) =>{
        !updatedGroupDetails ?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, errorMessage.CHAT_NOT_FOUND)) :
            error?
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, getChatGroupDetails));
    });
}

//delete chat group
const deleteChatGroup = (req, res) => {
    const filter = { id: req.params.id || 'inavlidId' };

    chat.findOneAndDelete(filter, (error, deletedChat) => {
        !deletedChat ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, deletedChat, errorMessage.CHAT_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, deletedChat));
    });       
}

export { 
    createChatGroup, 
    getAllChatGroups, 
    getChatGroup, 
    updateChatGroupDetails, 
    deleteChatGroup,
    sendMessages
};


