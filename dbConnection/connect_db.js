import mongoose from 'mongoose'
import * as dotenv from 'dotenv';

dotenv.config();



const MONGO_URI = 'mongodb+srv://vengateshmarvel:wtPKBbiHyWXDrlG9@cluster0.bplxkdj.mongodb.net/FoodDeliveryApp?retryWrites=true&w=majority&appName=Cluster0';


async function connectToDb() {

    const URI = process.env.MONGO_URI ?? ""

    try {
        await mongoose.connect(MONGO_URI);
        console.log('====================================');
        console.log("MongoDB is Conncted");
        // return test.init();
        console.log('====================================');

    } catch (error) {
        console.error(error)
    }
}

export default connectToDb