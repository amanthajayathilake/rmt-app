import mongoose from "mongoose";
import researchTopicSchema from "./researchTopic.js";
import evaluationSchema from "./evaluation.js";

const studentGroupSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true, 
        unique: true,
    },
    
    researchTopic: researchTopicSchema, //SubDoc reaserchTopic

    studentsId: [String],

    supervisorId: {
        type: String, 
        default:"Not Assigned",
    },

    coSupervisorId: {
        type: String,
        default:"Not Assigned",
    },

    topicEvaluationPanelId: {
        type: String,
        default:"Not Assigned",
    },

    presentationEvaluationPanelId: {
        type: String,
        default:"Not Assigned",
    },
    
    status: {
        type: String,
        default:"Topic Not Registered"
    },
    
    evaluation: [evaluationSchema],//SubDoc evaluation

    panelEvaluateFeedbacks: {
        type: String,
        default: "Pending",
        required: false
    }

});

const studentGroup = mongoose.model('studentGroup', studentGroupSchema);

export default studentGroup;