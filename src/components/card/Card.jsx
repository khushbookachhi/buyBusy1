
import { useValue as productValue } from '../../context/productState';
import plus from '../../icons/plus.png';
import minus from '../../icons/minus.png';
import style from './card.module.css';

function Card({product,userId,path,index}){
     // Accessing addToCart, removeFromCart, increaseQuantity, decreaseQuantity, and processing functions from product state context
    const{addToCart,removeFromCart,increaseQuantity,decreaseQuantity,processing}=productValue();
  
return(
    <>
    <div className="card position-relative border border-0 shadow  rounded" style={{"width": "18rem","height":"35rem"}}>
                    {/* Product image */}
                 <img src={product.image} className={`${style.card_img} my-3 mb-0 card-img-top`} alt="..."/>
                 <div className={`${style.CardBody} card-body`}>
                     {/* Product title */}
                     <h6 className="card-title fw-semibold fs-5">{product.title.split(/\s+/).slice(0, 6).join(' ')}...</h6>
                      {/* Product price */}
                     <h5 className={`${style.price}  my-5`}>&#8377; {product.price}</h5>
                     {/* Quantity control */}
                     {path?<div className={`${style.quantity}`}>
                         {/* Minus button */}
                        <img src={minus} alt='minus' onClick={()=>{decreaseQuantity(product,userId)}}/> 
                        <span>&nbsp;{product.quantity}&nbsp;</span> 
                         {/* plus button */}
                        <img src={plus} alt='plus' onClick={()=>{increaseQuantity(product,userId)}}/></div>:null}
                         {/* Add to cart or remove from cart button */}
                   {<button className={`btn ${style.btn2} ${path?"btn-danger":"btn-primary px-5"} btn-lg`}
                      onClick={()=>{!path?addToCart(product,userId,index):removeFromCart(product,userId,index)}}>
                          {/* Conditional rendering based on processing state */}
                        {path?processing[index]?"Removing":"Remove From Cart":processing[index]?"Adding":"Add To Cart"}</button>}
                 </div>
                </div>
    </>
)
}
export default Card;