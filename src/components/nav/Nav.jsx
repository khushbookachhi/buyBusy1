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
    const {user,setUser,handleSignOut}=useValue();
    
   
    useEffect(()=>{
        const storedUser=localStorage.getItem('user');
        if(storedUser){
            setUser(storedUser);
        }
    },[setUser])
    return(
        <>
 <nav className="navbar py-3 px-5 shadow rounded">
  <div className="container-fluid">
    <Link className="navbar-brand text-primary fs-4" to="/">
     Busy Buy
    </Link>
    <div className={style.navLinks}>
        <Link className='mx-3' to="/" >
            <img className='mx-2' src={house} alt="house" style={{"width":"2rem"}}/>
             <h5>Home</h5>
        </Link>
        {user?<Link className='mx-3' to="/myOrders" >
            <img className='mx-1' src={bag} alt="bag" style={{"width":"2rem"}}/>
             <h5>My Orders</h5>
        </Link>:null}
        {user?<Link className='mx-3' to="/cart" >
            <img className='mx-1' src={cart} alt="cart" style={{"width":"2rem"}}/>
             <h5>Cart</h5>
        </Link>:null}
       {!user?<Link className='mx-3' to="/signin">
            <img className='mx-1' src={signin} alt="signin" style={{"width":"2rem"}}/>
            <h5>SignIn</h5>
        </Link>:<Link className='mx-3' onClick={handleSignOut}>
        <img className='mx-1' src={signout} alt="signout" style={{"width":"2rem"}}/>
        <h5>Logout</h5>
    </Link>
        }
        
    </div>
  </div>
</nav>
<Outlet/>

        </>
    )
}
export default Nav;