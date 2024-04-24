import {useNavigate } from 'react-router-dom';
import { useValue } from '../../context/userAuthentication';
import style from './SignUp.module.css'; 

function SignUp(){
    const {setName,setEmail,setPassword,signUpOnSubmit}=useValue();
    const navigate = useNavigate();
return(
   <>
   <div className={`${style.signin} container my-5`}>
   <h1 className='fw-bold my-5'>Sign Up</h1>
   <form action='/' className='container' onSubmit={(e)=>{e.preventDefault(); signUpOnSubmit(navigate)}}>
   <div className="mb-3">
   <input type="text" className="form-control border-primary border-1" placeholder='Enter Name' required
   onChange={(e)=>{setName(e.target.value);}}/>
 </div>
 <div className="mb-3">
   <input type="email" className="form-control border-primary border-1" placeholder='Enter Email' required
    onChange={(e)=>{setEmail(e.target.value);}}/>
 </div>
 <div className="mb-3">
   <input type="password" className="form-control border-primary border-1" placeholder='Enter Password' required
    onChange={(e)=>{setPassword(e.target.value);}}/>
 </div>
 
 <button type="submit" className={` ${style.button} btn btn-primary`}>Sign Up</button>
</form>

   </div>
   </>
)
}
export default SignUp;