import mongoose from "mongoose";
import {v4} from 'uuid';

const messageSchema = new mongoose.Schema({
        id: {
            type: String,
            default: v4
        },
        content: {
            type: String,
            required: true,
        },
        sender: {
            type: String, 
            requried: true,
        }
    },
    {
        timestamps: true,
    }
)

export default messageSchema;