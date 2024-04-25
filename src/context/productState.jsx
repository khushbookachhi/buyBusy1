import { createContext,useContext, useEffect, useState } from "react";
import {toast } from 'react-toastify';
import data from '../data/products.json';// Importing initial product data
import { arrayRemove, arrayUnion, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";// Firestore functions
import { db } from "../fireBaseInit";// Firestore database instance
import { useValue as userValue } from "./userAuthentication";// Importing user authentication context and hook
// Context for managing product-related state and functionality
const productsContext = createContext();

// Custom hook to access the product context
function useValue() {
    const value = useContext(productsContext);
    return value;
}
// Component responsible for managing product-related state and functionality
function CustomProductContext({children}){
  // State variables for product data, cart items, orders, total price, loading state, etc.
    const [products,setProducts]=useState(data);
    const [cartItems,setCartItems]=useState([]);
    const [myOrders,setMyOrders]=useState([]);
    const {user,setUser}=userValue();// Accessing user state and setter from user authentication context
    const [totalPrice,setTotalPrice]=useState(0);
    const [path,setPath]=useState("");
    const [loading, setLoading] = useState(true);
    const [processing,setProcessing]=useState(new Array(products.length).fill(false));
    const [purchase,setPurchase]=useState(false);
     // useEffect to handle loading state when path changes
    useEffect(()=>{
        if(path){
          console.log(path);
          setLoading(true);
        }
        // eslint-disable-next-line
        },[path])
         // useEffect to set user state from localStorage on component mount
    useEffect(()=>{
        const storedUser=localStorage.getItem('user');
        if(storedUser){
            setUser(storedUser);
        }
    },[setUser])
   // useEffect to simulate loading state and then set it to false after a delay
    useEffect(() => {
            const timeout = setTimeout(() => {
          setLoading(false); 
        }, 1200);
        return () => clearTimeout(timeout); 
      }, [loading]);

    // Function to set processing state to true for a specific product index 
      const handleProcessTrue=(index)=>{
      setProcessing(prevState=>{
        const newState=[...prevState];
        if (index >= 0 && index < newState.length) { // Check index bounds
            newState[index] = true;
          } else {
            console.error("Invalid index:", index);
          }
        return newState;
      })}
      // Function to set processing state to false for a specific product index
      const handleProcessFalse=(index)=>{
            setProcessing(prevState=>{
                const newState=[...prevState];
                if (index >= 0 && index < newState.length) { // Check index bounds
                    newState[index] = false;
                  } else {
                    console.error("Invalid index:", index);
                  }
                return newState;
              })
         
      }
    // Function to fetch cart items data from Firestore
    const fetchCartItemsData = async () => {
      // Fetch cart items only if user is authenticated
      if (user) {
        const docRef = doc(db, "cartItems", user); //get ref from firestore
        try {
          const docSnap = await getDoc(docRef);  //get docsnap from firestore
          if (docSnap.exists()) {
            const products = docSnap.data().products;   //got products
            setCartItems(prevItems=>{   //set products to cartitems
                return products;
            });
            console.log("fetchCartItemsData data:", cartItems);
           
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
      // Function to fetch my orders data from Firestore
      const fetchMyOrdersData = async () => {
        // Fetch my orders only if user is authenticated
      if (user) {
        const docRef = doc(db, "myOrders", user);  //get ref from firestore
        try {
          const docSnap = await getDoc(docRef); 
          if (docSnap.exists()) {
            const products = docSnap.data().products;
            setMyOrders(prevItems=>{
                return products;   // set products  in myOrder array
            });
            console.log("fetchMyOrdersData data:", cartItems);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
   // useEffect to fetch cart items and my orders data when user changes 
    useEffect(() => {
       if(user){
        fetchCartItemsData();
        fetchMyOrdersData();
       }
       // eslint-disable-next-line
      }, [user]);

      // Function to handle search functionality based on target value
    function handleSearch(targetValue){
if(data.length && targetValue){
  const filteredProducts = data.filter((product) =>
  product.title.toLowerCase().includes(targetValue.toLowerCase())
);
setProducts(filteredProducts);
  
}else{
  setProducts(data);
}
    }

      // Function to handle filter functionality based on filter state and checked categories
    function handleFilter(filterState,checkedState){
      let filteredData = [...data];
      if(filterState>0){
       filteredData=filteredData.filter((product)=>
      product.price<=filterState
    );
      }
     const selectedCategories=Object.entries(checkedState)
     .filter(([key,value])=>value)
     .map(([key])=>key.toLowerCase());
      if(selectedCategories.length>0){
        filteredData=filteredData.filter(product=>
          selectedCategories.includes(product.category.toLowerCase()));
      }
     
      setProducts(filteredData);
    } 
    //function to add products in cart 
   async function addToCart(product,userId,index){
    if(userId){
      try {
        await fetchCartItemsData();    // Fetch current cart items data
        let productIndex=-1;
 // Check if the product already exists in the cart
        if(cartItems){
         productIndex=cartItems.findIndex(elem=>elem.id===product.id);
        }
       // Set processing state to true for the current product index
        handleProcessTrue(index);
        if(productIndex!==-1){      // If the product exists, increase its quantity
            cartItems[productIndex].quantity++;
            console.log("product existed!",cartItems);
            await updateDoc(doc(db,"cartItems",userId),
             {products:cartItems});
             toast.success("Increased Product Quantity!");
        }else{ 
           // If the product is new, add it to the cart with quantity 1
            const productWithQuantity={...product,quantity:1};
            if(cartItems && cartItems.length>0){
                // If cart is not empty, update the cart with the new product
                await updateDoc(doc(db,"cartItems",userId),
                {products:arrayUnion(productWithQuantity)});
            }else{
               // If cart is empty, set the cart with the new product
                await setDoc(doc(db,"cartItems",userId),
                {products:arrayUnion(productWithQuantity)});
            }
            toast.success("Product Added Successfully!");
            console.log("check Firestore");
          // Fetch updated cart items data
            await fetchCartItemsData();
           
        }
        setTimeout(()=>{
         handleProcessFalse(index);
         },500) 

      } catch (error) {
        toast.error(error.message);
      }
    }
    
    }
    //function to remove product from cart
    async function removeFromCart(product,userId,index){
   // Check if the user is authenticated
     if(userId){
        const docRef = doc(db, 'cartItems', userId); // Get a reference to the Firestore
        try {
            const currentIndex = index;
            handleProcessTrue(currentIndex);
            // Simulate a delay before executing the removal operation
            setTimeout(async () => {
                await updateDoc(docRef, {   // Remove the product from the cart items array in Firestore
                  products: arrayRemove(product)
                });
                
                //  // Mark the completion of the removal process
                handleProcessFalse(currentIndex);
        
                console.log("removing product");
                await fetchCartItemsData();  // Fetch updated cart items data after the removal
              },700);
               // Display a success toast message indicating that the product was removed successfully
              toast.success("Product Removed Successfully!")
          } catch (error) {
            console.error('Error removing element from array:', error);
            toast.error(error.message); //log the error and display it as a toast message
          }
     }
    }
    // function to increase quantity of the cart's product
    async function increaseQuantity(product, userId) {
      // Check if the user is authenticated
      if (userId) {
          // Initialize productIndex to -1
          let productIndex = -1;
          // Check if cartItems exist
          if (cartItems) {
              // Find the index of the product in the cartItems array
              productIndex = cartItems.findIndex(elem => elem.id === product.id);
          }
          // If the product is found in the cart
          if (productIndex !== -1) {
              // Increment the quantity of the product in the cart by one
              cartItems[productIndex].quantity++;
              // Log a message indicating that the product quantity has increased
              console.log("Product quantity increased!");
              // Update the cartItems array in Firestore with the updated quantity
              await updateDoc(doc(db, "cartItems", userId), { products: cartItems });
              // Fetch updated cart items data after the increase in quantity
              await fetchCartItemsData();
          }
      }
  }
   // function to decrease quantity of the cart's product  
   async function decreaseQuantity(product, userId) {
    // Check if the user is authenticated
    if (userId) {
        // Initialize productIndex to -1
        let productIndex = -1;
        // Check if cartItems exist
        if (cartItems) {
            // Find the index of the product in the cartItems array
            productIndex = cartItems.findIndex(elem => elem.id === product.id);
        }
        // If the product is found in the cart and its quantity is greater than 1
        if (productIndex !== -1 && cartItems[productIndex].quantity > 1) {
            // Decrease the quantity of the product in the cart by one
            cartItems[productIndex].quantity--;
            // Update the cartItems array in Firestore with the updated quantity
            await updateDoc(doc(db, "cartItems", userId), { products: cartItems });
            // Fetch updated cart items data after the decrease in quantity
            await fetchCartItemsData();
        } 
        // If the product quantity becomes 1, remove the product from the cart
        else if (cartItems[productIndex].quantity === 1) {
            await removeFromCart(product, userId, productIndex);
        }
    }
}
// function to add total price of products in cart
    function addTotalPrice(cartItems){  
        setTotalPrice(0);   //set total price 0 after every time it adds price
        if(cartItems){     // If cartItems exist
           // Iterate through each item in the cart
        cartItems.map((item) => {
          // Update the total price by adding the product of quantity and price of each item
          return setTotalPrice((prevItems) => {
              return prevItems + (item.quantity * item.price);
          });
      });
        }
      
    }
    //function to get current date after ordering 
    function getOrderDate(){
        const d=new Date();
        let month=d.getMonth()+1;
        let date=d.getDate();
        return d.getFullYear().toString()+"-"+(month<10?"0"+month.toString():month.toString())+"-"
        +(date<10?"0"+date.toString():date.toString());
    }
    // function to remove all cartitems after ordering
    async function removeAllCartItems(userId){
        const docRef = doc(db, 'cartItems', userId); // get reference from firestore
 
        // Remove the 'capital' field from the document
        await updateDoc(docRef, {
            products: deleteField()
        });
        
    }
    //function to purchase prdduct from cartitems
   async function purchaseProduct(cartItems,userId,navigate){
    //check user auth
    if(userId){
        const orderDate=getOrderDate();  //get current date
        const createdOn=Date.now();
        const docRef = doc(db, "myOrders",userId); //get ref. from firestore
         // Get a snapshot of the document from Firestore
        const docSnapshot = await getDoc(docRef);
        setTimeout(async()=>{
            if(docSnapshot.exists()){
                // Update the document with the new order information
                await updateDoc(doc(db,"myOrders",userId),
                {products:arrayUnion({orderDate,cartItems,totalPrice,createdOn})});
            }else{
                // Create a new document with the order information
                await setDoc(doc(db,"myOrders",userId),
                {products:arrayUnion({orderDate,cartItems,totalPrice,createdOn})});
            }
           
        },700);
       
        console.log("total purchase items added!");
        await fetchMyOrdersData();  // Fetch the user's updated orders data
        setTimeout(async() => {
          // Remove all items from the user's cart
            await removeAllCartItems(userId);
            setTotalPrice(0);
            setCartItems([]);     // Clear the cart items array
             // Toggle the purchase state to trigger a re-render
            setPurchase(prevState=>!prevState);
            navigate('/myOrders');
        },500);
       
    }
    }
return(
    <productsContext.Provider value={{products,handleSearch,handleFilter,addToCart,removeFromCart,
    increaseQuantity,decreaseQuantity,cartItems,myOrders,purchaseProduct
    ,addTotalPrice,totalPrice,path,setPath,loading,setLoading,processing,purchase,setPurchase,fetchMyOrdersData}}>
        {children}
    </productsContext.Provider>
)
}
export {productsContext,useValue};
export default CustomProductContext;