import { MongoClient } from 'mongodb';
import pipeline from '../utils/matrixPipeline';

const dbPassword = process.env['DB_PASSWORD']
const dbName = process.env['DB_NAME']
const dbUser = process.env['DB_USER']
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster.ezpbhtm.mongodb.net/${dbName}?retryWrites=true&w=majority`

export default async function handler(req, res) {
  try {
    // Create a MongoDB client
    const client = new MongoClient(uri);

    // Define an async function to handle the MongoDB operations
    async function run() {
      // Connect to the MongoDB server
      await client.connect();

      // Access the database and collection
      const db = client.db('data');
      const collection = db.collection('orders');

      // Execute the aggregation pipeline
      const result = await collection.aggregate(pipeline).toArray();

      // Return the results as the API response
      res.status(200).json(result);
    }

    // Call the async function
    await run();

    // Close the MongoDB connection
    await client.close();
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
