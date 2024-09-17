import mongoose from "mongoose";

const dojoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true  }

}, { timestamps: true } );

const dojoModel = mongoose.model('Dojo', dojoSchema);
export default dojoModel