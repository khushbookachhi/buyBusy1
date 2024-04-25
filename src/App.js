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
   // Create a browser router configuration with routes and nested navigation
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Nav />, // Render the Nav component at the root level
      children: [
        { index: true, element: <Products /> }, // Render the Products component at the root path
        { path: '/signin', element: <SignIn /> }, // Render the SignIn component at /signin path
        { path: '/signup', element: <SignUp /> }, // Render the SignUp component at /signup path
        { path: '/myOrders', element: <MyOrder /> }, // Render the MyOrder component at /myOrders path
        { path: '/cart', element: <Cart /> }, // Render the Cart component at /cart path
      ]
    }
  ])
  return (
    <>
      {/* Wrap the entire application with CustomUserContext and CustomProductContext */}
    <CustomUserContext>
      <CustomProductContext>
  {/* Provide the router configuration to the RouterProvider */}
      <RouterProvider router={browserRouter} />
       {/* Render the ToastContainer to display toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
                      newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
                      draggable pauseOnHover />
      </CustomProductContext>
   
    </CustomUserContext>
     
    </>
  );
}

export default App;
