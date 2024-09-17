import mongoose from 'mongoose';

// Define the Contact schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create the Contact model
const ContactModel = mongoose.model('Contact', contactSchema);

export default ContactModel;
