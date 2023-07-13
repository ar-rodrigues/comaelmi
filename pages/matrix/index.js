import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import formatDates from '../../utils/formatDates';
import Layout from '../../components/layout';
import useSWR from 'swr';
import { DataGrid } from '@mui/x-data-grid';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { query: { id } } = useRouter();
  const { data: ordersData, error: fetchError } = useSWR('/api/orders', fetcher);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (ordersData) {
      const updatedOrders = ordersData.map((order) => {
        const updatedOrder = order.cartList.map((item) => {
          const updatedItem = {
            _id: item.item._id,
            id: item.item.id,
            descripción: item.item.description,
            tipo: item.item.type,
            presentación: item.item.presentation,
            marca: item.item.label,
            cantidad: item.quantity,
          };
          return updatedItem;
        });
        return { ...order, cartList: updatedOrder };
      }).sort((a,b)=>new Date(b.date) - new Date(a.date));

      setOrders(updatedOrders);
    }
  }, [ordersData]);

  if (fetchError) {
    return <div>Error loading orders</div>;
  }

  if (!orders) {
    return (
      <div className="flex flex-col mt-[50vh] text-center place-contentcenter ">
        <h1 className="">CARGANDO ORDERS...</h1>
      </div>
    );
  }

  return (
    <Layout userName={id}>
      <div>
        {orders.map((client) => {
          const { name, date, cartList } = client;
          const columns = Object.keys(cartList[0]).filter(col=>col!=="_id").map((col) => ({
            field: col,
            headerName: col,
            flex: 1
          }));

          const rows = cartList.map((cartItem, index) => {
            return { id: cartItem.id, ...cartItem };
          });

          return (
            <div key={name}>
              <div>
                <h1>{name.toUpperCase()}</h1>
                <h3>{formatDates(date)}</h3>
              </div>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid columns={columns} rows={rows} pageSize={5} />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
