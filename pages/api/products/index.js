import { getAllProducts } from '../database/operations/productsOperations'
//import { getServerSession } from "next-auth/next"
//import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  //const session = await getServerSession(req, res, authOptions)
  const {query} = req
  
  try {
        const allProducts = await getAllProducts(query);
        res.status(200).json(allProducts);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to update product' });
      }

  
}