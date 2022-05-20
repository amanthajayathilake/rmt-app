import mongoose from "mongoose";

const submissionTypeSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
    }, 
    folder: {
        type: String, required: true,
    },
    description: {
        type: String, required: false
    },
    published: {
        type: Boolean, default: false
    }
});

const submissionType = mongoose.model('submissionType', submissionTypeSchema);

export default submissionType;