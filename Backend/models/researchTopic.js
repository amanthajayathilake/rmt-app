import mongoose from "mongoose";


const researchTopicSchema = new mongoose.Schema({
    
    topic: {
        type: String, 
        required: true,
    },

    area: {
        type: String, 
        required: true,
    },

    supervisorIsAccepted: {
        type: String,
        default: "Not Accepted"
    },

    coSupervisorIsAccepted: {
        type: String,
        default: "Not Accepted"
    }
    
});

export default researchTopicSchema;
