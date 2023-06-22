import { addOrder } from '../database/operations/ordersOperations'
//import { getServerSession } from "next-auth/next"
//import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  //const session = await getServerSession(req, res, authOptions)
  const orderObj = req.body
  try {
        const newOrder = await addOrder(orderObj);
        res.status(200).json(newOrder);
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to add order' });
      }

  
}