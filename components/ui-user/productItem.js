import { useState, useEffect, useRef } from "react";
import Alert from "../alert";

export default function ProductItem(props) {
  const { product, cartList, setCartList } = props;
  const { _id: id, description, label, type, presentation } = product;
  const listItem = cartList?.find((item) => item.item._id === id) || 0;


  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      // Remove the product from the cartList
      setCartList((prevState) =>
        prevState.filter((item) => item.item._id !== listItem.item._id)
      );
    } else {
      if (listItem) {
        setCartList((prevState) =>
          prevState.map((item) =>
            item.item._id === listItem.item._id
              ? {
                  ...item,
                  quantity: value,
                }
              : item
          )
        );
      } else {
        setCartList((prevState) => [
          ...prevState,
          { item: product, quantity: value },
        ]);
      }
    }
  };
  

  return (
    <div className="border border-gray-300 rounded p-4 w-full grid grid-cols-10 items-center">
      <div className="col-span-8 ml-3">
        <div>
          <h1 className="text-xl font-bold mb-2">{description.toUpperCase()}</h1>
        </div>
      
        <div>
          <h3 className="text-lg font-medium mb-2">{label.toUpperCase()}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <p className="text-sm">{type.toUpperCase()}</p>
        </div>
        
        <div>
          <p className="text-sm">{presentation.toUpperCase()}</p>
        </div>
      </div>
      <div className="col-span-2 mr-4">
        <div className="form-control w-full max-w-xs place-items-center">
          <label className="label">
            <span className="label-text">Cantidad</span>
          </label>
          <input 
            type="number" 
            value={ listItem?.quantity || {}} 
            placeholder="0"
            className="input input-sm input-bordered w-full max-w-xs"
            onChange={(e)=>handleChange(e)}
            />
        </div>
      </div>
      
    </div>
  );
}
