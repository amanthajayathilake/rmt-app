import mongoose from "mongoose";

const markingSchemeSchema = new mongoose.Schema({
    name: {
        type: String, required: false
    },
    description: {
        type: String, required: false,
    },
    markingAllocations: [{
        allocation: String,
        mark: String
    }],
    published: {
        type: Boolean, default: false,
    }
});

const markingScheme = mongoose.model('markingScheme', markingSchemeSchema);

export default markingScheme;