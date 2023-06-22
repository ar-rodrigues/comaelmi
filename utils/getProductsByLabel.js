import { v4 as uuidv4 } from 'uuid';

function getProductsByLabel(products) {
  const labels = [];

  products.forEach((product) => {
    const { label } = product;
    const id = uuidv4();

    const existingLabel = labels.find((x) => x.label === label);
    if (existingLabel) {
      existingLabel.offeredProducts.push(product);
    } else {
      labels.push({
        id,
        label,
        offeredProducts: [product],
      });
    }
  });

  return labels;
}

export { getProductsByLabel };
