// models/RegistrationModel.js
import mongoose from 'mongoose';

// Define the Registration schema
const registrationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {  
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    academyName: {
        type: String,
        required: true
    },
    beltRank: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create the Registration model
const RegistrationModel = mongoose.model('Registration', registrationSchema);

export default RegistrationModel;
