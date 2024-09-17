import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    image: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    fatherName: {
        type: String,
        // required: true 
    },
    gender: {
        type: String,
        // required: true
    },
    dob: {
        type: Date,
        // required: true
    },
    joiningDate: {
        type: Date,
        // required: true
    },
    student_number:{
        type: String,
        // required: true
    },
    parent_number:{
        type: String,
        // required: true
    },

    belt: {
        type: String,
        // required: true
    },
    blood_group: {
        type: String,
        // required: true
    },
    dojo: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    occupation: {
        type: String,
        // required: true   
    },

    status: {
        type: Boolean,
        // default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel