import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
    id: {
        type: String, required: true, unique: true,
    },

    evaluationType: {
        type: String, required: true,
    },

    marks: {
        type: String, requried: true,
    }
})

export default evaluationSchema;