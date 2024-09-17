import mongoose from "mongoose";

const dojoSchema = new mongoose.Schema({
    dojoName: {
        type: String,
        required: true
    },
    location_link: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    incharge:{
        type: String,
        required: true
    },
    aboutdojo: {
        type: String,
        required: true
    }
    })
    const dojoModel = mongoose.model('Dojo', dojoSchema);
    export default dojoModel