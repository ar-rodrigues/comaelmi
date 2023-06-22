import { getAllOrders } from '../database/operations/ordersOperations'
//import { getServerSession } from "next-auth/next"
//import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  //const session = await getServerSession(req, res, authOptions)
  const {query} = req
  
  try {
        const allOrders = await getAllOrders(query);
        res.status(200).json(allOrders);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to get orders' });
      }

  
}