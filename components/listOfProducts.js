import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import Product from './ui-admin/product.js';
import ProductItem from './ui-user/productItem';

export default function ListOfProducts({ products, deleteProduct, error, setError, cartList, setCartList }) {
  const { pathname: admin } = useRouter();

  // Check if products is an array
  if (!Array.isArray(products)) {
    // Return null or an appropriate fallback if products is not an array
    return null;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          {admin === "/admin" ? (
            <div>
              <Product productData={product} error={error} setError={setError} deleteProduct={deleteProduct} />
            </div>
          ) : (
            <div>
              <ProductItem product={product} cartList={cartList} setCartList={setCartList} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
