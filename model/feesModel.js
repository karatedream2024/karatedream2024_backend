import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({

    amount:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    payment_type: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    })

    const feedetails = new mongoose.Schema({
        studentId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        fees:[feesSchema]
    }, {timestamps: true})

    const feesModel = mongoose.model('fees', feedetails);
    export default feesModel