import CurrencyInput from 'react-currency-input-field';

const inputClass="input input-bordered input-sm mb-2 bg-slate-200 text-black font-medium"


export default function EditProductForm({product, handleChange, setEdit}){
  const {_id:id, description, label, type, price, image} = product

  return (
    <form className="flex form-control">
      <button onClick={(e)=>(e.preventDefault(), setEdit(false))}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </button>
      <input
        id={`${id}`}
        className={`${inputClass}`}
        type="text"
        name="description"
        placeholder="descripción"
        defaultValue={description}
        onChange={(e)=>handleChange(e,id)}
      />
      <input 
        id={`${id}`} 
        className={`${inputClass}`}
        type="text" 
        name="label" 
        placeholder="marca"
        defaultValue={label} 
        onChange={(e)=>handleChange(e,id)}
        />
      <select
        id={`${id}`} 
        name="type"
        className={`${inputClass}`}
        placeholder="Seleccione"
        onChange={(e)=>handleChange(e,id)}
        defaultValue={type}
      >
        <option value="Abarrote">Abarrote</option> 
        <option value="Carnes">Carnes</option> 
        <option value="Frutas y Verduras">Frutas y Verduras</option> 
        <option value="Lácteos">Lácteos</option> 
      </select>
      
      <CurrencyInput
        id={`${id}`} 
        className={`${inputClass}`}
        type="numeric"
        name="price"
        placeholder="1,230.90"
        prefix="MX$"
        decimalSeparator="." 
        groupSeparator=","
        decimalsLimit={2}
        onValueChange={(e) => handleChange(e,id)}
        defaultValue={price}
        />
      
            
          </form>
  )
}