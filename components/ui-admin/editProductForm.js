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
              defaultValue={description}
              onFo
              onChange={(e)=>handleChange(e,id)}
            />
            <input 
              id={`${id}`} 
              className={`${inputClass}`}
              type="text" 
              name="label" 
              defaultValue={label} 
              onChange={(e)=>handleChange(e,id)}
              />
            <input 
              id={`${id}`} 
              className={`${inputClass}`}
              type="text" 
              name="type" 
              defaultValue={type} 
              onChange={(e)=>handleChange(e,id)}
              />
            <input
              id={`${id}`}
              className={`${inputClass}`}
              type="text"
              name="image"
              defaultValue={image}
              onChange={(e)=>handleChange(e, id)}
            />
          </form>
  )
}