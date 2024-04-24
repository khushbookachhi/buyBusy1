import { useEffect } from "react";
import { useValue as productValue} from "../../context/productState";
import { useValue } from "../../context/userAuthentication";
import { useLocation } from 'react-router-dom';
import Loader from "../../components/loader/Loader";

function MyOrder(){
    const {myOrders,loading,setPath,fetchMyOrdersData}=productValue();
    const {setUser}=useValue();
    const location=useLocation();
    useEffect(()=>{
      const storedUser=localStorage.getItem('user');
      if(storedUser){
          setUser(storedUser);
          fetchMyOrdersData();
      }
     // eslint-disable-next-line 
  },[])
  useEffect(()=>{
    setPath(location.pathname);
    // eslint-disable-next-line
  },[setPath]);
  
    return(
        <>
       <div className="container-fluid d-flex flex-column align-items-center my-4">
        <h2>Your Orders</h2>
{loading?<Loader/>:
<div className="container">
       {myOrders? myOrders.map((product,index)=>{
   return (<div className="container d-flex flex-column align-items-center my-2" key={index}>
 <p className="text-center fs-4 fw-bold text-dark-emphasis">Ordered On:- {product.orderDate}</p>
 <table className="table table-bordered text-center p-0" style={{"width":"60vw"}}>
<thead className="border border-bottom-0">
<tr>
<th scope="col">Title</th>
<th scope="col">Price</th>
<th scope="col">Quantity</th>
<th scope="col">Total Price</th>
</tr>
</thead>

   { product.cartItems.map((cartItem,index)=>{
   return  <tbody key={index}>
    <tr>
    <td>{cartItem.title.split(/\s+/).slice(0, 6).join(' ')}...</td>
    <td>{cartItem.price}</td>
<td>{cartItem.quantity}</td>
<td>{cartItem.price*cartItem.quantity}</td>
</tr>
</tbody>
    })}
    <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>{product.totalPrice}</td>
</tr>
</tbody>
</table>
</div>)
       }):null}
       
        </div>}
        
        
       </div>
        </>
    )
}
export default MyOrder;