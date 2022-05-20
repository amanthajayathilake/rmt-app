import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
    }, 
    folder: {
        type: String, required: false, default: "templates"
    },
    description: {
        type: String, required: false
    },
    key: {
        type: String, required: true
    },
    published: {
        type: Boolean, default: false
    }
});

const template = mongoose.model('template', templateSchema);

export default template;