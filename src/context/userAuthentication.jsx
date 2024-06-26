
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useState,useContext, useEffect } from "react";
import {toast } from 'react-toastify';
// Create a context for user authentication
const userContext = createContext();

// Custom hook to access the user authentication context
function useValue() {
    const value = useContext(userContext);
    return value;
}
// Component responsible for managing user authentication state and functionality
function CustomUserContext({children}){
     // State variables for user information
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [user,setUser]=useState(null);
    // Firebase Auth instance
    const auth = getAuth();
   
useEffect(()=>{
    console.log("user Id authentication",user);
},[user])
 // Function to validate input for sign-up
    function isValidInput(name,email,password){
     const emailRegex =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

     const passwordFormat=!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password));
     
     if(name.length && emailRegex.test(email) &&( password.length>=8 && !passwordFormat)){
        return true
     }else{
        return false;
     }
    }
    // Function to handle sign-up form submission
     function signUpOnSubmit(navigate){
        const isValid=isValidInput(name,email,password);
        if(isValid){
            console.log(name," ",email," ",password);
            createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential)=>{
                console.log(name,userCredential.user);
              updateProfile(userCredential.user,{name:name})
             
              .then(()=>{
                console.log("user signed up successfully");
              toast.success("User Signed Up Successfully");
                setName(""); setEmail(""); setPassword("");
              })
             .catch((error)=>{
                console.log(error.message); 
             })
            })
            .catch((error) => {
                const errorMessage = error.message;
               toast.error(errorMessage);
              });
              setTimeout(() => {
                navigate('/signin');
              },2000);
             
        }else{
            toast.error("Invalid inputs");
        }
       
     }
    // Function to handle authentication state change
     function checkAuthState(){
        console.log("checkAuthState is called");
        onAuthStateChanged(auth,(userInfo)=>{
            if(userInfo){
                console.log("user signed In");
                localStorage.setItem('user',JSON.stringify(userInfo.uid));
                setUser(userInfo.uid);
            }else{
                console.log("user signed out");
                localStorage.removeItem('user');
                setUser(null);
            }
        })
       
     }
      // Function to handle sign-in form submission
     function signInOnSubmit(navigate){
       
       signInWithEmailAndPassword(auth,email,password)
       .then((userInfo)=>{
        checkAuthState();
        toast.success("User Signed In Successfully!");
        navigate('/');
       })
       .catch((error)=>{
        toast.error(error.message);
       })
      
     }
       // Function to handle sign-out
     function signOutHandled(){
      
        signOut(auth).then(()=>{
            checkAuthState();
            toast.success("Signed Out Successful.");
        }).catch((error)=>{
            toast.error(error.message);
        })
     }
      // Function to trigger sign-out
     function handleSignOut(){
        signOutHandled();
     }
      // Provide context value to children components
     return(
        <userContext.Provider value={{name,setName,email,setEmail,password,setPassword,
        signUpOnSubmit,signInOnSubmit,handleSignOut,user,setUser}}>
        {children}
        </userContext.Provider>
     )
}
// Export context, hook, and component for use in other components
export {userContext,useValue};
export default CustomUserContext;