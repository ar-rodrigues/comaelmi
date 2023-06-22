import { useState } from 'react';
const noImage = '/noImage.jpg'

import CartList from './cartList'

export default function ShopCart({ cartList, setCartList, showCartList, setShowCartList, orderData, setOrderData }) {

  const handleQuantity = (listItem, e) => {
  setCartList((prevState) =>
    prevState.map((item) =>
      item.item._id === listItem._id
        ? {
            ...item,
            quantity:
              e.target.value === "-"
                ? Math.max(item.quantity - 1, 0)
                : e.target.value === "+"
                ? item.quantity + 1
                : Number(e.target.value),
          }
        : item
    ).filter((item) => item.quantity > 0) 
  );
};

  
  return (
    <div className="grid grid-col-1 place-content-center">
      
      {showCartList && <CartList cartList={cartList} setCartList={setCartList} showCartList={showCartList} setShowCartList={setShowCartList} handleQuantity={handleQuantity} orderData={orderData} setOrderData={setOrderData} />}

      {!showCartList &&
      <div>
        <button
        onClick={() => setShowCartList(!showCartList)}
        className="btn btn-circle absolute z-50 bottom-10 right-10 w-20 h-30 bg-[#29D884] border-none hover:bg-primary-focus"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"
          />
        </svg>
        <span className="absolute bottom-1 right-5 text-white bg-black w-5 rounded-full">
          {cartList?.length > 0 ? cartList.length : null}
        </span>
      </button>
      </div>
      }
    </div>
  );
}
