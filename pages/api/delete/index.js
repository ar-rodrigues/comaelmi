import { deleteProduct } from '../database/operations/productsOperations'
//import { getServerSession } from "next-auth/next"
//import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  //const session = await getServerSession(req, res, authOptions)
  const { query: { id }, method , body} = req;
  const update = body;
  console.log(`api endpoit: ${id}`)

  console.log("API route URL:", req.url);
  
  if (method === 'DELETE') {
    try {
      const deletedProduct = await deleteProduct(id, update);
      res.status(200).json({message: `Product ${id} was deleted`, response: deletedProduct});
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to update product' });
    }
}

  
}