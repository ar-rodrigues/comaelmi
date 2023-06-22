import {mutate} from 'swr'
const deleteProduct = async(productId)=>{
    try {
      const response = await fetch(`/api/delete?id=${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
      if(response.ok){
        console.log("Product deleted successfully")
        mutate('/api/products');
      } else {
        console.log("Failed to delete product")
        setError(true)
        setTimeout(()=>{
          setError(false)
        }, 5000)
      }
      
    } catch(error) {
      console.error("Failed to delete product", error);
    }
  }

export default deleteProduct