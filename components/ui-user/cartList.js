import {useState} from 'react'
import SvgX from "../svg-icons/svgX"
import SvgCart from "../svg-icons/svgCart"

const noImage = './noImage.jpg'
import Order from "./order"

export default function CartList({setShowCartList, showCartList, cartList, setCartList, handleQuantity, orderData, setOrderData }){
    

  return (
    <div className="flex flex-col p-5 place-content-center card bg-base-100 shadow-xl m-3 transition-all duration-5000 ease-in-out transform translate-x-0 slide-in-right">
      
      {
        //CLOSE BUTTON
      }
      <div className="row-span-1 col-span-3 flex place-content-center mb-8 pb-4 gap-2">
        <button  onClick={(e)=>(e.preventDefault(), setShowCartList(!showCartList))}>
          <SvgX width={40} height={40} fill={"none"} strokeWidth={2} strokeLinejoin={"round"} strokeLinecap={"round"} classProp={"stroke-current shrink-0 h-6 w-6 mb-2"} />
      
        </button>
      
      </div>

      

      {
        //IF CART IS EMPTY
      }

    {cartList.length < 1 && 
      <div className="grid grid-col-1 grid-row-3 text-center place-content-center items-center m-3 gap-2" >
        <h1>Carrito Vacio</h1>
        <p>Agregue itenes a tu carrito</p>
        <div>
          <button onClick={() => setShowCartList(!showCartList)} 
            className="btn btn-circle w-20 h-30 bg-[#29D884] border-none " 
            >
            <SvgCart width={24} height={24} fill={"white"} />
          </button>
        </div>
      
      </div>
      }

      {
        //LIST OF ITEMS IN THE CART
      }
      <div>
        {cartList.map((listItem) => {
          const { _id: id, description, label, image } = listItem.item;

          return (
            <div key={id} className={`grid grid-cols-6 place-content-center content-center items-center justify-center space-x-4 pb-8`}>
              
              <div className="flex place-content-center col-span-1">
                <img
                  className="w-10 h-10 rounded-full shrink"
                  width={60}
                  height={60}
                  alt={`image of ${description}`}
                  src={image ? image : noImage}
                  quality={50}
                  loading="lazy"
                  />
              </div>
              
              <div className="flex-1 min-w-2 col-span-3">
                
                <h1 className="text-sm mb-3 font-medium text-gray-900 dark:text-black sm:break-all"> {description} </h1>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{label}</p>
              </div>
              
              <div className="flex-1 flex shrink place-content-center col-span-2 pr-3 items-center	">
                <button onClick={(e)=>handleQuantity(listItem.item, e)} className="btn btn-circle 
btn-sm	" value="-">-</button>
                <input type="number" className="w-10 h-10 m-2 rounded-full text-center" value={listItem.quantity} onChange={(e) => handleQuantity(listItem.item, e)} />
                <button onClick={(e)=>handleQuantity(listItem.item, e)} className="btn btn-circle btn-sm	" value="+">+</button>
              </div>
            </div>
          );
    })}
      
      </div>
      
      {
        //ORDER BUTTON
      }
      <div className="">
        {cartList.length > 0 && <Order orderData={orderData} setOrderData={setOrderData} cartList={cartList} setCartList={setCartList} />}
      </div>
    </div>
  )
}