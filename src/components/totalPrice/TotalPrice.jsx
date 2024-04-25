
import { useNavigate } from 'react-router-dom';
import style from './totalPrice.module.css';
import { useValue } from '../../context/productState';

function TotalPrice({ cartItems, userId, totalPrice }) {
    // Accessing purchaseProduct, purchase, and setPurchase functions from productState context
    const { purchaseProduct, purchase, setPurchase } = useValue();
    
    // Hook to navigate to a different route
    const navigate = useNavigate();

    return (
        <>
            {/* Total Price component */}
            <div className={`${style.totalPrice} card text-center mx-2 mb-3`} style={{"width": "17rem", "height": "5rem"}}>
                <div className="card-body bg-primary-subtle rounded-2">
                    {/* Display total price */}
                    <h5 className="card-title fs-5 fw-bold text-dark-emphasis">Total Price: <span>&#8377;{totalPrice}/-</span></h5>
                    {/* Button to initiate purchase */}
                    <button className="btn btn-primary fs-4 my-3 px-2 py-0"
                        onClick={(e) => {
                            e.preventDefault();
                            // Toggle the purchase state and call purchaseProduct function
                            setPurchase(prevState => !prevState);
                            purchaseProduct(cartItems, userId, navigate);
                        }}
                    >
                        {/* Button text changes based on purchase state */}
                        {purchase ? "Purchasing" : "Purchase"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default TotalPrice;
