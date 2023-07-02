import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import useSWR from 'swr';

import deleteProduct from '../../utils/deleteProduct'

import Layout from '../../components/layoutUser';
import ListOfProducts from '../../components/listOfProducts';
import ShopCart from '../../components/ui-user/shopCart'




const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { query: { id:hospital } } = useRouter();
  const id = uuidv4();

  const { data: products, error:fetchError } = useSWR('/api/products', fetcher);
  const [error, setError] = useState(false)
  const [cartList, setCartList] = useState([])
  const [showCartList, setShowCartList] = useState(false);
  const [orderData, setOrderData] = useState({id: id, name: hospital, date: "", observation:"" , cartList: cartList}) 


  useEffect(() => {
    if (hospital) {
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        name: hospital,
        cartList: cartList,
      }));
    }
  }, [hospital, cartList]);

  if (fetchError) {
    return <div>Error loading products</div>;
  }

  if (!products) {
    return <div className="flex flex-col mt-[50vh] text-center place-contentcenter "><h1 className="">CARGANDO PRODUCTOS...</h1></div>;
  }


  return (
    <Layout 
      className=""
      userName={hospital?.charAt(0)?.toUpperCase() + hospital?.slice(1)} >
        
        <div>
        {
          !showCartList &&
          <ListOfProducts products={products} error={error} setError={setError} deleteProduct={deleteProduct} cartList={cartList} setCartList={setCartList} /> 
        }
        </div>

        <div>
          <ShopCart cartList={cartList} setCartList={setCartList} showCartList={showCartList} setShowCartList={setShowCartList} setOrderData={setOrderData} orderData={orderData}  />
        </div>
        
    </Layout>
  );
}
