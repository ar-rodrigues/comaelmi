import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import Layout from '../../components/layout';
import AddProduct from '../../components/ui-admin/addProduct';
import ListOfProducts from '../../components/listOfProducts';
import deleteProduct from '../../utils/deleteProduct'


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data: products, error:fetchError } = useSWR('/api/products', fetcher);
  const [showProducts, setShowProducts] = useState(true)
  const [error, setError] = useState(false)
  



  if (fetchError) {
    return <div className="flex flex-col mt-[50vh] text-center place-contentcenter "><h1 className="">ERROR CARGANDO PRODUCTOS</h1></div>;
  }

  if (!products) {
    return <div className="flex flex-col mt-[50vh] text-center place-contentcenter "><h1 className="">CARGANDO PRODUCTOS...</h1></div>;
  }

  

  return (
    <Layout userName={"Admin"} showProducts={showProducts} setShowProducts={setShowProducts} className="">
      <main className="items-center content-center">
        
        <div className="flex justify-center items-center m-5">
          <button className="btn btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={()=>setShowProducts(!showProducts)}>{ showProducts ? "Agregar Producto" : "Lista de productos" }
          </button>
        </div>
        
        <div className="">
          {
          showProducts 
          ?
        <ListOfProducts products={products} error={error} setError={setError} deleteProduct={deleteProduct} /> 
          : 
          <AddProduct showProducts={showProducts} setShowProducts={setShowProducts} />
        }
        </div>
      </main>
    </Layout>
  );
}
