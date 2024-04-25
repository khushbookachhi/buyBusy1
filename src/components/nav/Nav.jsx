import { Link, Outlet } from 'react-router-dom';
import style from './Nav.module.css';
import house from '../../icons/house-color-icon.png';
import signin from '../../icons/signin.png';
import bag from '../../icons/bag.png';
import cart from '../../icons/cart.png';
import signout from '../../icons/exit.png';
import { useValue } from '../../context/userAuthentication';
import { useEffect } from 'react';
function Nav(){
    // Accessing user state and setUser function from user authentication context
    const {user,setUser,handleSignOut}=useValue();
    
   // Effect hook to set user from localStorage on component mount
    useEffect(()=>{
        const storedUser=localStorage.getItem('user');
        if(storedUser){
            setUser(storedUser);
        }
    },[setUser])
    return(
        <>
        {/* Navigation bar */}
        <nav className="navbar py-3 px-5 shadow rounded">
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand text-primary fs-4" to="/">
                    Busy Buy
                </Link>
                {/* Navigation links */}
                <div className={style.navLinks}>
                    {/* Home link */}
                    <Link className='mx-3' to="/" >
                        <img className='mx-2' src={house} alt="house" style={{"width":"2rem"}}/>
                        <h5>Home</h5>
                    </Link>
                    {/* My Orders link (visible if user is signed in) */}
                    {user && (
                        <Link className='mx-3' to="/myOrders" >
                            <img className='mx-1' src={bag} alt="bag" style={{"width":"2rem"}}/>
                            <h5>My Orders</h5>
                        </Link>
                    )}
                    {/* Cart link (visible if user is signed in) */}
                    {user && (
                        <Link className='mx-3' to="/cart" >
                            <img className='mx-1' src={cart} alt="cart" style={{"width":"2rem"}}/>
                            <h5>Cart</h5>
                        </Link>
                    )}
                    {/* Sign in or Logout link */}
                    {!user ? (
                        // Sign in link (visible if user is not signed in)
                        <Link className='mx-3' to="/signin">
                            <img className='mx-1' src={signin} alt="signin" style={{"width":"2rem"}}/>
                            <h5>SignIn</h5>
                        </Link>
                    ) : (
                        // Logout link (visible if user is signed in)
                        <Link className='mx-3' onClick={handleSignOut}>
                            <img className='mx-1' src={signout} alt="signout" style={{"width":"2rem"}}/>
                            <h5>Logout</h5>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
        {/* Outlet for nested routes */}
        <Outlet/>
    </>
    )
}
export default Nav;