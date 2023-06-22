import { addProduct } from '../database/operations/productsOperations'
//import { getServerSession } from "next-auth/next"
//import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  //const session = await getServerSession(req, res, authOptions)
  const productObj = req.body
  //console.log(product)
  try {
        const newProduct = await addProduct(productObj);
        res.status(200).json(newProduct);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to update product' });
      }

  
}