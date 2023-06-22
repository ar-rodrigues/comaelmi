import { editProduct } from '../database/operations/productsOperations'
//import { getServerSession } from "next-auth/next"
//import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  //const session = await getServerSession(req, res, authOptions)
  const { query: { id }, method , body} = req;
  const update = body;
  console.log(`api endpoit: ${id}`)

  console.log("API route URL:", req.url);
  
  if (method === 'PUT') {
    try {
      const updatedProduct = await editProduct(id, update);
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to update product' });
    }
}

  
}