import mongodb from 'mongodb'
import mongoose from 'mongoose'
import connectDB from '../connectDB'
import {Schema} from  'mongoose'



// Creates a new schema that uses id as a short url
// The url passed as longUrl
// And the date in which was created
const ordersSchema = new Schema({
  id: String,
  name: String,
  date: String,
  observation: String,
  cartList: Array,
});



module.exports = ordersSchema