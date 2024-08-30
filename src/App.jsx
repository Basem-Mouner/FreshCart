import { useState } from 'react'

import './App.css'
import { createBrowserRouter, createHashRouter, HashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProductDetails from './components/productDetails/productDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import Wishlist from './components/Wishlist/Wishlist';
import WishlistContextProvider from './Context/WishlistContext';
import VerifyCode from './components/VerifyCode/VerifyCode';
import Checkcode from './components/Checkcode/Checkcode';
import ResetPassword from './components/ResetPassword/ResetPassword';



let quary = new QueryClient({
  defaultOptions: {}
});
 
function App() {


 

  let routing = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },

        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "checkcode", element: <Checkcode /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={quary}>
        <UserContextProvider>
          <CounterContextProvider>
            <CartContextProvider>
              <WishlistContextProvider>
                <RouterProvider router={routing}></RouterProvider>
                <Toaster />
                <ReactQueryDevtools />
              </WishlistContextProvider>
            </CartContextProvider>
          </CounterContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App
