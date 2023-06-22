import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import Product from './product.js';
import ProductItem from './ui-user/productItem';



export default function ListOfProducts({products, deleteProduct,error, setError, cartList, setCartList}) {
  const {pathname:admin} = useRouter()
  
  return (
    <div className="flex flex-wrap	gap-3 place-content-center item-center content-center">
      {
        products.map(product=>{
          return (
            <div key={product._id} >
              { admin === "/admin" ?
                  // List of products in the admin database
                  <Product productData={product} error={error} setError={setError} deleteProduct={deleteProduct} />
                :
                  // List of products for the user
                  <ProductItem product={product} cartList={cartList} setCartList={setCartList} />
}
            </div>
          )
        })
      }
      
    </div>
  );
}
