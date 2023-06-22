import mongoose from 'mongoose'
import mongodb from'mongodb'

const main = async ()=>{
  const dbPassword = process.env['DB_PASSWORD']
    const dbName = process.env['DB_NAME']
    const dbUser = process.env['DB_USER']
    const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster.ezpbhtm.mongodb.net/${dbName}?retryWrites=true&w=majority`
  //console.log(uri)

  try {
        // Connect to the MongoDB cluster
        await mongoose.connect(uri, { bufferCommands: true, useNewUrlParser: true, useUnifiedTopology: true });
    } catch (e) {
        console.error(e);
    }
}

const connectDB = main().catch(console.error);

module.exports = connectDB