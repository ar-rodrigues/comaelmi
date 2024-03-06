import { useState, useEffect, useRef } from "react";

import Alert from "../alert";
import saveProduct from '../../utils/saveProduct';
import EditProductForm from './editProductForm';

const noImage = "/noimage.jpg";

export default function Product({ productData, deleteProduct, error, setError }) {
  const [product, setProduct] = useState(productData);
  const [edit, setEdit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationRef = useRef(null);

  const { _id:id, description, type, label, presentation, price } = product;

  const handleChange = (e) => {
    let value, name
    e ?
      e.target ? 
      (value = e.target.value, name = e.target.name) :
      (value = e, name = "price") :
      (value = 0, name = "price")
    
      
    
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: typeof value === 'string' ? value.toLowerCase() : value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (confirmationRef.current && !confirmationRef.current.contains(event.target)) {
        setShowConfirmation(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
      <div className={`grid grid-cols-10 grid-rows-2 lg:grid-rows-1 bg-white px-4 p-5 shadow-xl ring-1 ring-gray-900/5`}>
        {/* Show products properties */}
        <div className={`grid grid-cols-3 col-span-9 row-span-2 ml-2 mr-2 items-center space-x-4 pb-8 ${edit ? "hidden" : "block"}`}>
          
          <div className="col-span-2">
            <h1 className="sm:break-all">
              {description.toUpperCase()}
            </h1>
            <h3 className="sm:break-all">
              {presentation.toUpperCase()}
            </h3>
          </div>
          <div className="col-span-1">
            <p className="sm:break-all">
                {label.toUpperCase()}
            </p>
            <p className="sm:break-all font-bold">
                {type.toUpperCase()}
            </p>
            <p className="sm:break-all italic">
                {"MX$"+price}
            </p>
          </div>
          
        
        </div>

        {/* EDIT FORM */}
          <div className={`${edit ? "col-span-9 row-span-2" : "hidden"}`}>
            <EditProductForm 
              product={product} 
              handleChange={handleChange} 
              setEdit={setEdit} 
            />
          
          </div>
        
        
        {/* BUTTONS */}
        <div className="flex flex-col gap-2 col-span-10 row-span-1 lg:col-span-1 place-content-center">
          {/* DELETE BUTTON */}
          <div className={`grid ${showConfirmation ? "grid-cols-2 gap-1" : ""} `} ref={confirmationRef}>
              <button
                className="flex-auto btn btn-secondary btn-sm btn-block text-white"
                onClick={() => (showConfirmation ? deleteProduct(id) : setShowConfirmation(true))}
              >
                {showConfirmation ? "Si" : "Deletar"}
              </button>
              {showConfirmation && (
                <button onClick={() => setShowConfirmation(false)} className="flex-auto btn btn-secondary btn-sm btn-block text-white">
                  No
                </button>
              )}
            
            </div>
          
          {/* EDIT BUTTON */}
          <div className="">
              <button
              className="flex-auto btn btn-primary btn-sm btn-block text-white"
              onClick={() =>
                !edit
                  ? (setEdit(true), setShowConfirmation(false))
                  : (saveProduct(id, product, setEdit, setError), setShowConfirmation(false))
              }
            >
              Editar
            </button>
            </div>
          
          
        </div>
        
        {/* ERROR  */}
        <div className="col-span-10 row-span-1">
          {error && <Alert message="Error: Producto no fue editado" />}
        </div>
      </div>
  );
}
