
import {useNavigate } from 'react-router-dom';
import style from './totalPrice.module.css';
import { useValue } from '../../context/productState';

function TotalPrice({cartItems,userId,totalPrice}){
    const {purchaseProduct,purchase,setPurchase}=useValue();
    const navigate=useNavigate();
    return(
        <>
        <div className={`${style.totalPrice} card text-center mx-2 mb-3` }style={{"width": "17rem","height":"5rem"}}>
  <div className="card-body bg-primary-subtle rounded-2">
    <h5 className="card-title fs-5 fw-bold text-dark-emphasis">Total Price:- <span>&#8377;{totalPrice}/-</span></h5>
    <button className="btn btn-primary fs-4 my-3 px-2 py-0"
    onClick={(e)=>{e.preventDefault();setPurchase(prevState=>!prevState);purchaseProduct(cartItems,userId,navigate)}}
    >{purchase?"Purchasing":"Purchase"}</button>
  </div>
</div>
        </>
    )
}
export default TotalPrice;