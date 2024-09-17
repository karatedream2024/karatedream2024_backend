import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    enquiry: {
        type: String,
        required: true 
    },
    About:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, { timestamps: true });

const TournamentModel = mongoose.model('Tournament', tournamentSchema);
export default TournamentModel;
