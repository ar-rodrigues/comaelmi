import { useForm } from 'react-hook-form';
import { useState } from 'react';

import CurrencyInput from 'react-currency-input-field';
import { v4 as uuidv4 } from 'uuid';

import Alert from '../alert'
import addNewProduct from '../../utils/addNewProduct'

export default function AddProducts({showProducts,setShowProducts}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      type: ""
    }
    });

  const [priceValue, setPriceValue] = useState('');

  



  return (
    <div className="flex place-content-center relative bg-white px-4 pt-5 pb-4 shadow-xl ring-1 ring-gray-900/5">
      
      <form onSubmit={handleSubmit((data) => addNewProduct(data, reset, setPriceValue))} className="form-control w-full max-w-xs mr-5 ml-5">
        <label className="label" htmlFor="description">Descripción</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="description"
          {...register("description", { required: true, onChange: (e)=> (e.target.value = e.target.value.toLowerCase()) })}
          placeholder="Leche Condensada"
        />
        {errors.description && <Alert message="Agregue una descripción" />}

        <label className="label" htmlFor="type">Tipo</label>
        <select
          className="select select-bordered w-full max-w-xs"
          placeholder="Seleccione"
          {...register("type", { required: true, onChange: (e) =>         e.target.value.toLowerCase() })}
          defaultValue=""
        >
          <option disabled value="">Seleccione</option> 
          <option value="Abarrote">Abarrote</option> 
          <option value="Carnes">Carnes</option> 
          <option value="Frutas y Verduras">Frutas y Verduras</option> 
          <option value="Lácteos">Lácteos</option> 
        </select>
        {errors.type && (
  <Alert message="Seleccione el tipo de producto" />
)}
        
        <label className="label" htmlFor="label">Marca</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="label"
          {...register("label", { required: true, onChange: (e)=> (e.target.value = e.target.value.toLowerCase()) })}
          placeholder="Ilsafrigo"
        />
        {errors.label && <Alert message="Agregue una marca" />}

        <label className="label" htmlFor="presentation">Presentación</label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          id="presentation"
          {...register("presentation", { required: true, onChange: (e)=> (e.target.value = e.target.value.toLowerCase()) })}
          placeholder="1l"
        />
        {errors.presentation && <Alert message="Agregue una presentación" />}

        <label className="label" htmlFor="price">Precio</label>
        <CurrencyInput
          className="input input-bordered w-full max-w-xs"
          type="numeric"
          id="price"
          name="price"
          placeholder="1,230.90"
          prefix="MX$"
          decimalSeparator="." 
          groupSeparator=","
          decimalsLimit={2}
          onValueChange={(value, name) => setPriceValue(value)}
          value={priceValue}
          {...register("price", { required: true })}
        />
        {errors.price && <Alert message="Agregue un precio" />}


        <button className="btn btn-secondary mt-3">Enviar</button>
        <div className="flex justify-center mt-6">
        <button 
          onClick={(e)=>(e.preventDefault(), setShowProducts(!showProducts))}>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        </div>
      </form>
    </div>
  );
}
