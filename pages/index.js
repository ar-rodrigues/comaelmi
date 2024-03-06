import { useState, useEffect } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import useSWR from 'swr';

import Layout from '../components/layout';




const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const id = uuidv4();
  const { data: products, error:fetchError } = useSWR('/api/products', fetcher);
  const [showAdd, setShowAdd] = useState(false)
  const [error, setError] = useState(false)
  const [cartList, setCartList] = useState([])
  const [showCartList, setShowCartList] = useState(false);
  const [orderData, setOrderData] = useState({id: id, name: "Cliente", date: "", observation:"" , cartList: cartList})


  

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
          <Link href="/cliente/sur">
            Interface Ordenes
          </Link>
        </button >
        

      
      </main>
    </Layout>
  );
}
