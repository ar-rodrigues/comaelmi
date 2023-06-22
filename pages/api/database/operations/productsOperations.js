import mongoose from 'mongoose'
import mongodb from'mongodb'
import connectDB from '../connectDB';
import productsSchema from '../schemas/productsSchema'

// Creates the model with the schema 
let PRODUCTS;

if (mongoose.models.PRODUCTS) {
  PRODUCTS = mongoose.model('PRODUCTS');
} else {
  PRODUCTS = mongoose.model('PRODUCTS', productsSchema);
}


// add product to dtatabase
const addProduct = async (productData) => {
  try {
    const product = await PRODUCTS.create(productData)
    console.log('Product added successfully!');
    return product
  } catch (error) {
    console.error('Error adding product:', error);
  }
  return product;
};

// Find all products function
const getAllProducts = async (query) => {
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

  // Find all products matching the dynamic query, skip and limit the results, and select the fields to show
  const allProducts = await PRODUCTS.find(dynamicQuery)
                                     .select(`_id id description type label presentation price image`)
                                     .limit(query?.limit ? parseInt(query.limit) : 0);

  return allProducts;
};

// Edit a product in the database
const editProduct = async (productId, updatedData) => {
  try {
    const product = await PRODUCTS.findById(productId);
    if (!product) {
      console.log('Product not found');
      throw new Error('Product not found'); 
    }

    product.set(updatedData);
    await product.save();
    console.log('Product updated successfully!');
  } catch (error) {
    console.error('Error editing product:', error);
    throw error; 
  }
};

// Delete a product in the database
const deleteProduct = async (productId) => {
  try {
    const result = await PRODUCTS.deleteOne({ _id: productId });
    if (result.deletedCount === 0) {
      console.log('Product not found');
      throw new Error('Product not found');
    }
    console.log('Product deleted successfully!');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};



module.exports =  { addProduct, getAllProducts, editProduct, deleteProduct }


