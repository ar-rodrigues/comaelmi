export default function generateHospitalMatrix(orders) {
  const hospitalMatrix = [];

  // Extract unique hospital names
  const hospitals = [...new Set(orders.map(order => order.name))];

  // Iterate over each hospital
  hospitals.forEach(hospital => {
    const hospitalOrders = orders.filter(order => order.name === hospital);
    
    // Extract unique product names and dates from the hospital's orders
    const productNames = [...new Set(hospitalOrders.flatMap(order => order.cartList.map(item => item.item.description)))];
    const dates = [...new Set(hospitalOrders.map(order => order.date))];

    // Build the matrix for the hospital
const matrix = productNames.map(productName => {
  const row = { productName, dates: [] };
  dates.forEach(date => {
    const ordersOnDate = hospitalOrders.filter(order => order.date === date);
    const quantity = ordersOnDate.reduce((total, order) => {
      const item = order.cartList.find(item => item.item.description === productName);
      return total + (item ? item.quantity : 0);
    }, 0);
    row.dates.push({ [date]: quantity });
  });
  return row;
});

    // Add the hospital's matrix to the result array
    hospitalMatrix.push({
      hospital,
      matrix
    });
  });

  return hospitalMatrix;
}
