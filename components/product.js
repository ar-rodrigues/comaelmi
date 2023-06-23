import { useState, useEffect, useRef } from "react";
import Alert from "./alert";
import saveProduct from '../utils/saveProduct';
import EditProductForm from './editProductForm';

const noImage = "/noimage.jpg";

export default function Product({ productData, deleteProduct, error, setError }) {
  const [product, setProduct] = useState(productData);
  const [edit, setEdit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationRef = useRef(null);

  const { _id: id, description, type, label, presentation, price, image } = product;

  const handleChange = (e) => {
    const { value, name } = e.target;

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
    <div className="">
      <div className={`relative bg-white px-4 pt-5 pb-4 shadow-xl ring-1 ring-gray-900/5`}>
        {/* Show products properties */}
        <div className={`grid grid-cols-5 items-center space-x-4 pb-8 ${edit ? "hidden" : "block"}`}>
          <div className="col-span-1 mr-2 ml-2">
            <img
              className="w-10 h-10 rounded-full"
              width={100}
              height={100}
              alt={`image of ${description}`}
              src={image ? image : noImage}
              quality={50}
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-2 col-span-4">
            <h1 className="text-sm mb-3 font-medium text-gray-900 dark:text-black sm:break-all">
              {description}
            </h1>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {label}
            </p>
          </div>
        </div>

        <div className={`flex-col align-items-center justify-content-center`}>
          <div className={`${edit ? "flex-col align-center justify-center" : "hidden"}`}>
            <EditProductForm product={product} handleChange={handleChange} setEdit={setEdit} />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-2">
            <div className={`grid ${showConfirmation ? "grid-cols-2 gap-1" : null}`} ref={confirmationRef}>
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

            {error && <Alert message="Error: Producto no fue editado" />}
          </div>
        </div>
      </div>
    </div>
  );
}
