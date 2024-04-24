
// import { useEffect } from 'react';
import { useValue as productValue } from '../../context/productState';
import plus from '../../icons/plus.png';
import minus from '../../icons/minus.png';
import style from './card.module.css';

function Card({product,userId,path,index}){
    const{addToCart,removeFromCart,increaseQuantity,decreaseQuantity,processing}=productValue();
  
return(
    <>
    <div className="card position-relative border border-0 shadow  rounded" style={{"width": "18rem","height":"35rem"}}>
                 <img src={product.image} className={`${style.card_img} my-3 mb-0 card-img-top`} alt="..."/>
                 <div className={`${style.CardBody} card-body`}>
                     <h6 className="card-title fw-semibold fs-5">{product.title.split(/\s+/).slice(0, 6).join(' ')}...</h6>
                     <h5 className={`${style.price}  my-5`}>&#8377; {product.price}</h5>
                     {path?<div className={`${style.quantity}`}>
                        <img src={minus} alt='minus' onClick={()=>{decreaseQuantity(product,userId)}}/> 
                        <span>&nbsp;{product.quantity}&nbsp;</span> 
                        <img src={plus} alt='plus' onClick={()=>{increaseQuantity(product,userId)}}/></div>:null}
                   {<button className={`btn ${style.btn2} ${path?"btn-danger":"btn-primary px-5"} btn-lg`}
                      onClick={()=>{!path?addToCart(product,userId,index):removeFromCart(product,userId,index)}}>
                        {path?processing[index]?"Removing":"Remove From Cart":processing[index]?"Adding":"Add To Cart"}</button>}
                 </div>
                </div>
    </>
)
}
export default Card;