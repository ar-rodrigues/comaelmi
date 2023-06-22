import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import generateMatrices from '../../../utils/generateMatrices'
import formatDates from '../../../utils/formatDates'

import Layout from '../../../components/layout';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { query: { id } } = useRouter();
  const { data: orders, error:fetchError } = useSWR('/api/orders', fetcher);
  const [matrix, setMatrix] = useState(null);

  useEffect(() => {
    if (orders) {
      const generateMatrix = async () => {
        const result = await generateMatrices(orders);
        setMatrix(result);
      };

      generateMatrix();
    }
  }, [orders, matrix]);

  
const orderDates = [...new Set(orders?.map(order => order.date))].sort((a, b) => new Date(a) - new Date(b));
  


  if (fetchError) {
    return <div>Error loading orders</div>;
  }

  if (!orders) {
    return <div className="flex flex-col mt-[50vh] text-center place-contentcenter "><h1 className="">CARGANDO ORDERS...</h1></div>;
  }

  return (
    <Layout className="place-content-center text-center" userName={id}>
      <div className="flex flex-col gap-6 mt-4">
      {matrix?.map((x) => (
  <div className="overflow-x-auto" key={x.hospital}>
    <div className="mb-3 text-center">
      <h1 className="badge badge-lg badge-outline pt-4 pb-4">{x.hospital?.toUpperCase()}</h1>
    </div>
    <table className="table table-xs table-pin-rows table-pin-cols">
      <thead>
  <tr>
    <th></th>
    <th>Producto</th>
    {orderDates.map((date) => (
      <th key={date}>{formatDates(date)}</th>
    ))}
  </tr>
</thead>
      <tbody>
        {x.matrix.map((product, index) => (
          <tr key={product.productName}>
            <th>{index + 1}</th>
            <td>{product.productName?.toUpperCase()}</td>
            {product.dates.map((dateObj) => {
              const date = Object.keys(dateObj)[0];
              const quantity = dateObj[date];
              return <td key={date}>{quantity}</td>;
            })}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <td>Producto</td>
          {orderDates.map((date) => (
      <th key={date}>{formatDates(date)}</th>
    ))}
        </tr>
      </tfoot>
    </table>
  </div>
))}

      </div>
    </Layout>
  );
}


/** 
  // Check for missing dates in the matrix
const missingDates = matrix?.reduce((missing, entityData) => {
  const entityMissingDates = orderDates.filter(date => !entityData.matrix[0][date]);
  return missing.concat(entityMissingDates);
}, []);

  

console.log(missingDates);
  */