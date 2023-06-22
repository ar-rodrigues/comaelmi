import mongoose from 'mongoose'
import mongodb from'mongodb'
import connectDB from '../connectDB';
import ordersSchema from '../schemas/ordersSchema'

// Creates the model with the schema 
let ORDERS;

if (mongoose.models.ORDERS) {
  ORDERS = mongoose.model('ORDERS');
} else {
  ORDERS = mongoose.model('ORDERS', ordersSchema);
}


// add order to dtatabase
const addOrder = async (orderData) => {
  try {
    const order = await ORDERS.create(orderData)
    console.log('Order added successfully!');
    return order
  } catch (error) {
    console.error('Error adding order:', error);
  }
  return order;
};

// Find all orders function
const getAllOrders = async (query) => {
  //console.log(query)
  // Construct a dynamic query object to search for partial matches
  const dynamicQuery = {};
  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key) && query[key] == 'limit') {
      // Create a regular expression to match partial query for each key in query
      if (key === 'imgUrl' && query[key] === '') {
        dynamicQuery[key] = '';
      } else {
        dynamicQuery[key] = new RegExp('^' + query[key] + '.*', 'i');
      }
    }
  }

  // Find all order matching the dynamic query, skip and limit the results, and select the fields to show
  const allOrders = await ORDERS.find(dynamicQuery)
                                     .select(`_id name date cartList`)
                                     .limit(query?.limit ? parseInt(query.limit) : 0);

  return allOrders;
};

// Edit a order in the database
const editOrder = async (orderId, updatedData) => {
  try {
    const order = await ORDERS.findById(orderId);
    if (!order) {
      console.log('order not found');
      throw new Error('order not found'); 
    }

    order.set(updatedData);
    await order.save();
    console.log('order updated successfully!');
  } catch (error) {
    console.error('Error editing order:', error);
    throw error; 
  }
};

// Delete a order in the database
const deleteOrder = async (orderId) => {
  try {
    const result = await ORDERS.deleteOne({ _id: orderId });
    if (result.deletedCount === 0) {
      console.log('order not found');
      throw new Error('order not found');
    }
    console.log('order deleted successfully!');
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};



module.exports =  { addOrder, getAllOrders, editOrder, deleteOrder }


