import { MongoClient } from 'mongodb';

async function renameDatabase(oldDbName, newDbName) {
    const uri = process.env.MONGO_URI; // Your MongoDB connection string
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const oldDb = client.db(oldDbName);
        const newDb = client.db(newDbName);

        // List all collections in the old database
        const collections = await oldDb.listCollections().toArray();

        // Copy each collection to the new database
        for (let collection of collections) {
            const oldCollection = oldDb.collection(collection.name);
            const newCollection = newDb.collection(collection.name);
            const documents = await oldCollection.find().toArray();
            if (documents.length > 0) {
                await newCollection.insertMany(documents);
            }
        }

        // Drop the old database
        await client.db(oldDbName).dropDatabase();

        console.log(`Database renamed from ${oldDbName} to ${newDbName}`);
    } catch (error) {
        console.error('Error renaming database:', error);
    } finally {
        await client.close();
    }
}

// Usage
renameDatabase( 'KarateApp', 'FoodDeliveryApp');