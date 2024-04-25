import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useValue as productValue } from "../../context/productState";
import style from './cart.module.css'
import { useValue } from "../../context/userAuthentication";
import Card from "../../components/card/Card";
import TotalPrice from '../../components/totalPrice/TotalPrice';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';

  
function Cart(){
    // Accessing product state context
    const { cartItems, addTotalPrice, loading, totalPrice, path, setPath } = productValue();
    // Accessing user authentication context
    const { user, setUser } = useValue();
    // Accessing the current location object from react-router-dom
    const location = useLocation();
    // State to manage if the cart is empty or not
    const [isEmpty, setIsEmpty] = useState(false);
    

    useEffect(()=>{
       // Retrieve user data from local storage if available
      const storedUser=localStorage.getItem('user');
      if(storedUser){
          setUser(storedUser);
      }
  },[setUser])
  
    useEffect(()=>{
        // Update the current path when location changes
        setPath(location.pathname);
        // eslint-disable-next-line
      },[setPath]);

      useEffect(()=>{
       // Calculate and add total price when cart items change
        addTotalPrice(cartItems);
        // eslint-disable-next-line 
    },[cartItems])
   useEffect(()=>{
     // Check if cart is empty and show error toast if it is
    if(!cartItems.length){
      setIsEmpty(true);
    }else{
      setIsEmpty(false);
    }
    if(isEmpty){
      toast.error("Cart is empty !");
    }
   },[cartItems.length,isEmpty])
    return(
        <>
        <div className='container d-flex justify-content-center'>{loading?<Loader/>:null}</div>
      <div className="container-fluid d-flex justify-content-around bg-white">
       {/* Display total price if available and not loading */}
        {totalPrice && !loading?<TotalPrice cartItems={cartItems} userId={user} totalPrice={totalPrice}/>:null}
         {/* Display cart items */}
        <div className={`${style.product_container} d-flex py-5 my-2 bg-white`}>
          {!loading && cartItems?cartItems.map((item,index)=>{
               return (
                <Card
                key={item.id}
               product={item}
                userId={user}
                path={path}
                index={index}
                />
               )
          }):null}
 
        </div>
       
       </div>
        </>
    )
}
export default Cart;