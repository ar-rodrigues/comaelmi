import { useState, useEffect } from 'react';
import Link from 'next/link';

import Layout from '../components/layout';
import AddProduct from '../components/addProduct';
import Product from '../components/product';
import ListOfProducts from '../components/listOfProducts';
import ShopCart from '../components/ui-user/shopCart'
import { v4 as uuidv4 } from 'uuid';
import deleteProduct from '../utils/deleteProduct'



import useSWR, {mutate} from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const id = uuidv4();
  const { data: products, error:fetchError } = useSWR('/api/products', fetcher);
  const [showAdd, setShowAdd] = useState(false)
  const [error, setError] = useState(false)
  const [cartList, setCartList] = useState([])
  const [showCartList, setShowCartList] = useState(false);
  const [orderData, setOrderData] = useState({id: id, name: "Hospital", date: "", observation:"" , cartList: cartList})


  

  useEffect(() => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      cartList: cartList,
    }));
  }, [cartList]);

  if (fetchError) {
    return <div>Error loading products</div>;
  }

  if (!products) {
    return <div className="flex flex-col mt-[50vh] text-center place-contentcenter "><h1 className="">CARGANDO PRODUCTOS...</h1></div>;
  }

  

  return (
    <Layout showAdd={showAdd} setShowAdd={setShowAdd} className="">
      <main className="container flex flex-col place-content-center place-items-center justify-center gap-9">
        
        <button className="btn btn-wide">
          <Link href="/admin">
            Interface Administrativa
          </Link>
        </button >
        

        <button className="btn btn-wide">
          <Link href="/hospital/sur">
            Interface Hospital
          </Link>
        </button >
        

      
      </main>
    </Layout>
  );
}
