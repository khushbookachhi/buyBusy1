import {useNavigate } from 'react-router-dom';
import { useValue } from '../../context/userAuthentication';
import style from './SignUp.module.css'; 

function SignUp(){
     // Accessing setName, setEmail, setPassword, and signUpOnSubmit functions from user authentication context
     const { setName, setEmail, setPassword, signUpOnSubmit } = useValue();
     // Hook for programmatic navigation
     const navigate = useNavigate();
return(
   <>
   <div className={`${style.signin} container my-5`}>
   <h1 className='fw-bold my-5'>Sign Up</h1>
     {/* Sign-up form */}
   <form action='/' className='container' onSubmit={(e)=>{e.preventDefault(); signUpOnSubmit(navigate)}}>
   <div className="mb-3">
       {/* Input field for name */}
   <input type="text" className="form-control border-primary border-1" placeholder='Enter Name' required
   onChange={(e)=>{setName(e.target.value);}}/>
 </div>
 <div className="mb-3">
    {/* Input field for email */}
   <input type="email" className="form-control border-primary border-1" placeholder='Enter Email' required
    onChange={(e)=>{setEmail(e.target.value);}}/>
 </div>
 <div className="mb-3">
    {/* Input field for password */}
   <input type="password" className="form-control border-primary border-1" placeholder='Enter Password' required
    onChange={(e)=>{setPassword(e.target.value);}}/>
 </div>
  {/* Submit button */}
 <button type="submit" className={` ${style.button} btn btn-primary`}>Sign Up</button>
</form>

   </div>
   </>
)
}
export default SignUp;