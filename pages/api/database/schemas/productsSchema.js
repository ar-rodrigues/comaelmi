import mongodb from 'mongodb'
import mongoose from 'mongoose'
import connectDB from '../connectDB'
import {Schema} from  'mongoose'



// Creates a new schema that uses id as a short url
// The url passed as longUrl
// And the date in which was created
const productsSchema = new Schema({
  id: String,
  description: String,
  type: String,
  label: String,
  presentation: String,
  price: String,
  image: String,
});



module.exports = productsSchema