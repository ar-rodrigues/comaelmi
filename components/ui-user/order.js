import {useState} from 'react'
import DatePicker from 'react-datepicker';
import Alert from '../alert'
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';


export default function Order({cartList, setCartList, orderData, setOrderData}){
  const [error, setError] = useState(false)

  console.log(error)
  const addOrder = async (orderData, setCartList)=>{
    if(!orderData.date){
      setError(true)
      setTimeout(() => { setError(false) }, 4000);
      return console.error("Date is not defined.");
    }
    try {
    const response = await fetch('/api/new-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      console.log("Order Added")
      alert('Orden agregada con exito!');
      setCartList([])
    } else {
      // Error occurred while adding order
      console.error('Error adding order:', response.statusText);
      // Show an error message to the user
      alert('No se pudo agregar la ordern. Por favor intente nuevamente.');
    }
  } catch (error) {
    // Exception occurred while making the API call
    console.error('Error adding oreder:', error);
    // Show an error message to the user
    alert('No se pudo agregar la ordern. Por favor intente nuevamente.');
  }
    
  }

  
  return (
    <div className="flex flex-col place-content-center content-center items-center mt-2 mb-5">

      <div>
        <textarea 
          onChange={(e)=> setOrderData({...orderData, observation: e.target.value}) }
          placeholder="Observaciones" 
          className="textarea textarea-bordered textarea-md w-full max-w-xs" >
        </textarea>
      </div>
      
      <div className="border-solid	border-black rounded-full m-2 text-center">
        <h1>Selecione la fecha para entrega:</h1>
        <DatePicker 
          className="border-solid	border-black rounded-full m-2  "
          required
          isClearable
          withPortal
          closeOnScroll={true}
          dateFormat="dd MMMM, yyyy"
          locale={es}
          placeholderText="21 junio, 2023"
          selected={orderData.date}
          onChange={(e) => setOrderData({...orderData, date: e})}
          minDate={new Date()} // Restrict past dates
          filterDate={(date) => date.getDay() === 1 || date.getDay() === 5} // Mondays = 0 ... Saturday = 6
          showDisabledMonthNavigation // Display the full calendar for navigation
/>
    {
      error && <Alert message={"Agregue una fecha"} />
    }
        
      </div>

        
      <button className="btn btn-wide" onClick={()=>addOrder(orderData, setCartList)} >Ordenar</button>
      
    </div>
  )
}