import { useState, useEffect, useRef} from "react";
import Alert from "../alert"
import SvgCross from "../svg-icons/svgCross"


const noImage = "/noimage.jpg"
const input="input input-bordered input-sm mb-2 bg-slate-200 text-black font-medium"



export default function ProductItem(props) {
  const { product, cartList, setCartList } = props;
  const { _id: id, description, label, type, presentation, price, image } = product;
  const listItem = cartList?.find((item) => item.item._id === id) || 0;

  const [showButton, setShowButton] = useState(false);
  const showButtonRef = useRef(null);
  const [hidden, setHidden] = useState("");

  const handleQuantity = (listItem, e) => {
    setCartList((prevState) =>
      prevState
        .map((item) =>
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
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCart = (product, e) => {
    setCartList((prevState) => [
      ...prevState,
      { item: product, quantity: 1 }
    ]);
    setHidden("hidden");
  };

  useEffect(() => {
    if (listItem.quantity === 0) {
      setHidden("");
    }
  }, [listItem.quantity]);

  useEffect(() => {
    const handleMouseOver = () => {
      setShowButton(true);
    };

    const handleMouseOut = () => {
      setShowButton(false);
    };

    const handleClickOutside = (event) => {
      if (showButtonRef.current && !showButtonRef.current.contains(event.target)) {
        setShowButton(false);
      }
    };

    const showButtonRefCurrent = showButtonRef.current;

    showButtonRefCurrent?.addEventListener('mouseover', handleMouseOver);
    showButtonRefCurrent?.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      showButtonRefCurrent?.removeEventListener('mouseover', handleMouseOver);
      showButtonRefCurrent?.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  
  return (


    <div className=" flex flex-col place-content-center card bg-base-100 shadow-xl m-3 shrink ">

      <div className="transition-opacity duration-300" ref={showButtonRef}>

         {
           (showButton) &&
           <div className="btn flex-1 flex shrink place-content-center col-span-2 pr-3 items-center	absolute top-0 right-0 pl-1 card-actions mt-2 w-full">
                <button onClick={(e)=> {handleQuantity(product,e)}} className="btn btn-circle 
btn-sm bg-white bg-base-200" value="-">-</button>
                <input type="number" className="w-10 h-10 m-2 rounded-full text-center" value={listItem ? listItem.quantity : 0} onChange={(e) => {handleQuantity(product,e)}} />
                <button onClick={(e)=>{handleQuantity(product,e)}} className="btn btn-circle btn-sm	bg-base-200" value="+">+</button>
              </div>
         }
        
        {
          (showButton && !listItem) &&
          <div className={`card-actions mt-2 w-full absolute top-0 right-0 pl-1 `}>
          <button className="btn btn-block border-none text-white transition-opacity duration-300" onClick={()=>handleCart(product)}>
            Agregar
          </button>
        </div>
        }

        {
          !showButton &&
          <div className="card-actions justify-center absolute top-0 right-0 mt-2">
          <button className="btn btn-circle glass bg-[#29D884] transition-opacity duration-300">
            <SvgCross height={32} width={32} fill={"#FFF"} />
          </button>
        </div>
        }
      
      </div>
      
      <figure className="flex justify-center items-center content-center w-48 h-48 m-2"  >
        <img className="object-fill w-full h-full rounded" src={image ? image : noImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{description.toUpperCase()}</h2>
        <p>{label.toUpperCase()}</p>
        <p>{presentation.toUpperCase()}</p>
      </div>
    </div>
    
  );
}

