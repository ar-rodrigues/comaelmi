const saveProduct = async (productId, updateData, setEdit, setError)=>{

  typeof updateData.price === "string" ? 
    updateData.price = parseFloat(updateData.price.replace("MX$", "")) :
    updateData.price
  
    try {
      //console.log(productId)
      const response = await fetch(`/api/update?id=${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        console.log("Product updated successfully");
        setEdit(false)
      } else {
        console.error("Failed to update product");
        setError(true)
        setTimeout(()=>{
          setError(false)
        }, 5000)
      }
    } catch (error) {
      console.error("Failed to update product", error);
    }
  }

export default saveProduct;