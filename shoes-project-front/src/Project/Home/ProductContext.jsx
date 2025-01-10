import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
// import { passContext } from '../RegisterAnsLogin/RegisterContext'

export const productContext = createContext()
function ProductContext({children}) {
    const [product,setProduct]=useState([])
    const [cart, setCart] = useState([]);
    const [orders,setOrders]=useState([])
    const [search,setSearch]=useState('')
    // const {user}=useContext(passContext)
    useEffect(()=>{
        const fecthProduct = async () =>{
        try{
                const response = await axios.get("http://localhost:5000/products");
                setProduct(response.data);
            }catch(error){
                alert("product data", error)
        }
    }
    fecthProduct();
},[])



useEffect(() => {
    const fetchCart = async () => {
      if(localStorage.getItem("id")){
      try {
        const id = localStorage.getItem("id");
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setCart(response.data.cart);
      } catch (error) {
        console.log("Error fetching cart data:", error.message);
      }
    }
    };

    fetchCart();
  }, [user]);

  const addCart = async (items) => {
    try {
      const id = localStorage.getItem("id");
      console.log("id", id);

      const updatedcart = [...cart];
      const existingItem = updatedcart.find((item) => item.id == items.id)

      if(existingItem){
        existingItem.quantity += 1
        // console.log("existing",existingItem);
        
      }
      else{
        updatedcart.push({...items, quantity: 1})
      }
    
      await axios.patch(`http://localhost:5000/users/${id}`, {
        cart: updatedcart
      });
    setCart(updatedcart)
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeCart = async (itemId) => {
    try {
      const id = localStorage.getItem("id");
      const updatedCart = cart.filter((item) => item.id !== itemId);
      await axios.patch(`http://localhost:5000/users/${id}`, {
        cart: updatedCart,
      });
      console.log("udate", updatedCart);

      setCart(updatedCart);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    const fecthOrders= async () =>{
      if(localStorage.getItem("id")){
      try{
       const id = localStorage.getItem("id");
       const respons = await axios.get(`http://localhost:5000/users/${id}`);
       setOrders(respons.data.orders)
      
      }catch(error){
       console.error(error.message);
      }
    }else{
      setOrders([])
    }
  }
    fecthOrders();
  },[])



  return (
   <productContext.Provider value={{product, addCart, cart, removeCart, setCart, orders, search, setSearch}}>
      {children}
   </productContext.Provider>
  )
}

export default ProductContext