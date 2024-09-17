import mongoose from 'mongoose';

// Define the Event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },
    leader: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prizes: {
        
            first_winner: {
                type: String,
                required: true
            },
            second_winner: {
                type: String,
                required: true
            },
            third_winner: {
                type: String,
                required: true
            },
        
        },
    quote: {
        type: String,
        required: true
    },
    downloadLinkText: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Create the Event model
const EventModel = mongoose.model('Event', eventSchema);

export default EventModel;
