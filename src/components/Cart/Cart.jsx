import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from './Cart.module.css'
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


export default function Cart() {
const [cartDetails, setCartDetails] = useState(null);

  let { getLoggedUserCart, updateCartItemCount,deleteProductItem,deleteUserCart,cart,setCart} = useContext(CartContext);
  // console.log(cart);




  async function getCartItems() {
    let {data} = await getLoggedUserCart();
    console.log(data.data);
    setCartDetails(data.data);
  }
  
 async function updateCartItem(productId,count) {
   let {data} = await updateCartItemCount(productId, count);
    console.log(data.data);
    setCartDetails(data.data);
  
  }
  

  async function daleteItem(productId) {
    let { data } = await deleteProductItem(productId);
    console.log(data.data);
    setCart(data);
    setCartDetails(data.data);
  }

   async function daleteCart() {
     let {data} = await deleteUserCart();
    
     setCartDetails(data.data);
     setCart(null)
     
   }

   
  
  
   function deleteItemAlert(id) {
     
     const swalWithBootstrapButtons = Swal.mixin({
       customClass: {
         confirmButton: "btn btn-success",
         cancelButton: "btn btn-danger",
       },
       buttonsStyling: true,
     });
     swalWithBootstrapButtons
       .fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonText: "Yes, delete it!",
         cancelButtonText: "No, cancel!",
         reverseButtons: false,
       })
       .then((result) => {
         if (result.isConfirmed) {
           swalWithBootstrapButtons
             .fire({
               title: "Deleted!",
               text: "product has been deleted.",
               icon: "success",
             })
             .then(() => {
              daleteItem(id);
             });
         } else if (
           /* Read more about handling dismissals below */
           result.dismiss === Swal.DismissReason.cancel
         ) {
           swalWithBootstrapButtons.fire({
             title: "Cancelled",
             text: "Your imaginary product  is safe :)",
             icon: "error",
           });
         }
       });
  }
  

   function deleteCartAlert() {
     const swalWithBootstrapButtons = Swal.mixin({
       customClass: {
         confirmButton: "btn btn-success",
         cancelButton: "btn btn-danger",
       },
       buttonsStyling: true,
     });
     swalWithBootstrapButtons
       .fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonText: "Yes, delete it!",
         cancelButtonText: "No, cancel!",
         reverseButtons: false,
       })
       .then((result) => {
         if (result.isConfirmed) {
           swalWithBootstrapButtons
             .fire({
               title: "Deleted!",
               text: "product has been deleted.",
               icon: "success",
             })
             .then(() => {
               daleteCart();
             });
         } else if (
           /* Read more about handling dismissals below */
           result.dismiss === Swal.DismissReason.cancel
         ) {
           swalWithBootstrapButtons.fire({
             title: "Cancelled",
             text: "Your imaginary product  is safe :)",
             icon: "error",
           });
         }
       });
   }
    
 useEffect(() => {
   getCartItems();
 }, []);
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>cart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <div className="relative w-full md:w-3/4 mx-auto   overflow-x-auto  sm:rounded-lg text-center">
          <h2 className="text-3xl text-green-600 font-semibold p-4 text-center ">
            Shopping Cart
          </h2>
          <table className="w-full mx-auto py-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  <span className="">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 hidden md:block">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.products.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white hidden md:block">
                    {product.product.title}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          updateCartItem(product.product.id, product.count - 1);
                        }}
                        className="inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span className=""> {product.count}</span>
                      </div>
                      <button
                        onClick={() => {
                          updateCartItem(product.product.id, product.count + 1);
                        }}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <span className=""> {product.price} EGP</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        deleteItemAlert(product.product.id);
                      }}
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <h3 className="font-light text-center p-5 dark:text-white">
              total cart price :
              {cartDetails?.totalCartPrice ? cartDetails.totalCartPrice : 0} EGP
            </h3>

            {cart?.numOfCartItems > 0 ? (
              <Link to={"/checkout"}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 21"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  Buy now
                </button>
              </Link>
            ) : null}
          </div>
          {cart?.numOfCartItems > 0 ? (
            <button
              onClick={() => {
                deleteCartAlert();
              }}
              className=" py-2 px-7 bg-green-400 hover:bg-green-600 rounded-lg font-semibold"
            >
              Clear Cart<i class="fa-solid fa-cart-plus ml-3"></i>
            </button>
          ) : null}
        </div>
      </>
    );

}
