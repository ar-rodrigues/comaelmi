const matrixPipeline = [
  // Stage 1: Group by "name" and "date" to combine cart items within the same date for each name
  {
    $group: {
      _id: { name: "$name", date: "$date" },
      cartList: { $push: "$cartList" }
    }
  },
  // Stage 2: Unwind the "cartList" array to create separate documents for each cart item
  { $unwind: "$cartList" },
  // Stage 3: Unwind the "cartList" array again to create separate documents for each cart item with its quantity
  { $unwind: "$cartList" },
  // Stage 4: Group by "name" and "date" to combine cart items with the same date and name
  {
    $group: {
      _id: { name: "$_id.name", date: "$_id.date" },
      products: {
        $push: {
          item: "$cartList.item",
          quantity: "$cartList.quantity"
        }
      }
    }
  },
  // Stage 5: Project to reshape the document and remove temporary fields
  {
    $project: {
      _id: 0,
      name: "$_id.name",
      dates: [
        {
          date: "$_id.date",
          products: "$products"
        }
      ]
    }
  },
  // Stage 6: Group by "name" to combine all dates for each name
  {
    $group: {
      _id: "$name",
      dates: { $push: { $arrayElemAt: ["$dates", 0] } }
    }
  },
  // Stage 7: Project to finalize the desired output format
  {
    $project: {
      _id: 0,
      name: "$_id",
      dates: 1
    }
  }
]

export default matrixPipeline;
