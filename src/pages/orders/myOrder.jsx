import { useEffect } from "react";
import { useValue as productValue} from "../../context/productState";
import { useValue } from "../../context/userAuthentication";
import { useLocation } from 'react-router-dom';
import Loader from "../../components/loader/Loader";

function MyOrder(){
     // Accessing myOrders state and related functions from product state context
     const { myOrders, loading, setPath, fetchMyOrdersData } = productValue();
     // Accessing setUser function from user authentication context
     const { setUser } = useValue();
     // Accessing current location from react-router-dom
     const location = useLocation();
    useEffect(()=>{
    // Retrieve user data from local storage and fetch user's orders data
      const storedUser=localStorage.getItem('user');
      if(storedUser){
          setUser(storedUser);
          fetchMyOrdersData();
      }
     // eslint-disable-next-line 
  },[])
  useEffect(()=>{
    // Update the current path when location changes
    setPath(location.pathname);
    // eslint-disable-next-line
  },[setPath]);
  
    return(
        <>
  <div className="container-fluid d-flex flex-column align-items-center my-4">
     <h2>Your Orders</h2>
         {/* Display loading spinner if data is being fetched */}
{loading?<Loader/>:
<div className="container">
   {/* Map over user's orders and display order details */}
       {myOrders? myOrders.map((product,index)=>{
   return (<div className="container d-flex flex-column align-items-center my-2" key={index}>
    {/* Display order date */}
 <p className="text-center fs-4 fw-bold text-dark-emphasis">Ordered On:- {product.orderDate}</p>
     {/* Display order details in a table */}
 <table className="table table-bordered text-center p-0" style={{"width":"60vw"}}>
<thead className="border border-bottom-0">
<tr>
<th scope="col">Title</th>
<th scope="col">Price</th>
<th scope="col">Quantity</th>
<th scope="col">Total Price</th>
</tr>
</thead>
{/* Map over cart items within the order and display each item */}
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
      {/* Display total price for the order */}
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