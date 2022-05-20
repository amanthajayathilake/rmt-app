//student should add below details(Add user ids of supervisors too)
import mongoose from "mongoose";
import messageSchema from "./message.js";

const chatSchema = new mongoose.Schema({
        id: {
            type: String, 
            required: true,
        },
        chatName: {
            type: String,
            unique: true,
            required: false
        },
        userIds: [String],
        messages: [messageSchema], required: false,
    },
        {
            timestamps: true,
        }
);

const chat = mongoose.model('chat', chatSchema);

export default chat;