import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from "./components/nav/Nav";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/signup/SignUp";
import CustomUserContext from "./context/userAuthentication";
import CustomProductContext from "./context/productState";
import Products from "./pages/products/products";
import MyOrder from "./pages/orders/myOrder";
import Cart from "./pages/cart/Cart";
function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Nav />,
      children: [
        {index:true,element:<Products/>},
        {path:'/signin',element:<SignIn/>},
        {path:'/signup',element:<SignUp/>},
        {path:'/myOrders',element:<MyOrder/>},
        {path:'/cart',element:<Cart/>},
      ]
    }
  ])
  return (
    <>
    <CustomUserContext>
      <CustomProductContext>

      <RouterProvider router={browserRouter} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
                      newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
                      draggable pauseOnHover />
      </CustomProductContext>
   
    </CustomUserContext>
     
    </>
  );
}

export default App;
