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
    const {cartItems,addTotalPrice,loading,totalPrice,path,setPath}=productValue();
    const {user,setUser}=useValue();
    const location=useLocation();
    const [isEmpty,setIsEmpty]=useState(false);
    

    useEffect(()=>{
      const storedUser=localStorage.getItem('user');
      if(storedUser){
          setUser(storedUser);
      }
  },[setUser])
  
    useEffect(()=>{
        setPath(location.pathname);
        // eslint-disable-next-line
      },[setPath]);

      useEffect(()=>{
        addTotalPrice(cartItems);
        // eslint-disable-next-line 
    },[cartItems])
   useEffect(()=>{
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
     
        {totalPrice && !loading?<TotalPrice cartItems={cartItems} userId={user} totalPrice={totalPrice}/>:null}
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