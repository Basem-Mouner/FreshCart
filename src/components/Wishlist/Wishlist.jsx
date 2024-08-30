import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from './Wishlist.module.css'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Wishlist() {
const [wishlistDetails, setWishlistDetails] = useState(null);
  let { getLoggedWishlist, deleteWishlistItem, setWishlist,wishlist,iswishlist, setIsWishlist} = useContext(WishlistContext);

  const [counter, setCounter] = useState(0);
  
  

    
  async function getWishlistItems() {
    let { data } = await getLoggedWishlist();
    console.log(data);
    setWishlist(data); // ALL OBJECT CONTAIN ARRAY OF WISHLIST
    setWishlistDetails(data.data); //ARRAY DATA ONLY
  }
  

  async function daleteWishItem(productId) {
    let res = await deleteWishlistItem(productId);
    console.log(res.data.data);
     getWishlistItems();
    setIsWishlist(res?.data?.data);
      
  localStorage.setItem("wishlistData", JSON.stringify(res?.data?.data));

  }

  function deleteWishAlert(id) {
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
              daleteWishItem(id)
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
      getWishlistItems();
    }, []);
    

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>favorite</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <div className="relative w-full md:w-3/4 mx-auto   overflow-x-auto  sm:rounded-lg text-center">
          <h2 className="text-3xl text-green-600 font-semibold p-4 text-center ">
            Wishlist
          </h2>
          <table className="w-full mx-auto py-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 hidden md:block">
                  Product
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
              {wishlistDetails?.map((product) => (
                <tr
                  key={product.id}
                  className=" bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-300 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <Link
                      to={`/productdetails/${product?.id}/${product?.category?.name}`}
                    >
                      <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full hover:scale-[1.1]"
                        alt={product.title}
                      />
                    </Link>
                  </td>
                  <td className="  px-6 py-4 font-semibold text-gray-900 dark:text-white hidden md:block">
                    {product.title}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <span className=""> {product.price} EGP</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        deleteWishAlert(product.id);
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
        </div>
      </>
    );
}
