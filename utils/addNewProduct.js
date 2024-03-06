import { v4 as uuidv4 } from 'uuid';


const addNewProduct = async (productData, reset, setPriceValue) => {
  const id = uuidv4();
  productData.price = parseFloat(productData.price.replace("MX$", ""))
  try {
    const response = await fetch('/api/new-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, ...productData}),
    });

    if (response.ok) {
      // Product added successfully
      // Reset the form fields
      reset();
      // Reset the price input manually
      setPriceValue('');
      // Show a confirmation message to the user
      alert('Producto agregado con exito!');
    } else {
      // Error occurred while adding product
      console.error('Error al agregar producto:', response.statusText);
      // Show an error message to the user
      alert('No se pudo agregar el producto. Por favor intente otra vez.');
    }
  } catch (error) {
    // Exception occurred while making the API call
    console.error('Error al agregar producto:', error);
    // Show an error message to the user
    alert('No se pudo agregar el producto. Por favor intente otra vez.');
  }
};


export default addNewProduct;