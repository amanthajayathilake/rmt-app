import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String, required: true, unique: true,
    }, 
    profileImageUrl: {
        type: String, required: false
    },
    name: {
        type: String, required: true,
    },
    role: {
        type: String, required: true,
    },
    email: {
        type: String, required: true,
    },
    phone: {
        type: String, required: false,
    },
    password: {
        type: String, required: true,
    },
    interestArea: {
        type: String, required: false,
    }
    
});

const user = mongoose.model('user', userSchema);

export default user;