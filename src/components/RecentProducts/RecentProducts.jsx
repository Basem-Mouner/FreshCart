import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import DisplayRecentCardProducts from "../displayRecentCardProducts/displayRecentCardProducts";
import { useQuery } from "@tanstack/react-query";
import useProduct from "../../Hooks/useProduct";
import { DNA } from "react-loader-spinner";
import { WishlistContext } from "../../Context/WishlistContext";
import { UserContext } from "../../Context/UserContext";


export default function RecentProducts() {
  let { wishlist, iswishlist, setIsWishlist } = useContext(WishlistContext);
  let { userLogin, setUserLogin } = useContext(UserContext);
  
  
  const [relatedProduct, setRelatedProduct] = useState(null);
  
//  startInfoCart();
  // console.log(wishlist);

  let { data, isError, error, isLoading } = useProduct();


    function searchfun() {
      // console.log(document.getElementById("search").value);
      setRelatedProduct(document.getElementById("search").value.toLowerCase());
    }

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen bg-neutral-800/10 w-full">
          <DNA height="300" width="300" />
        </div>
      </>
    );
  }
  if (!isLoading) {
    return (
      <>
        <div className="container mx-auto my-5 dark:bg-slate-800">
          <form className="max-w-lg mx-auto my-5">
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border-2 border-green-300 outline-none rounded-lg bg-green-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Search product name..."
                onKeyUp={() => searchfun()}
              />
            </div>
          </form>

          <div className="flex flex-wrap">
            <>
              {relatedProduct == null? data?.map((product, index) => (
                    <DisplayRecentCardProducts
                      key={product.id}
                      index={index}
                      productDetails={product}
                />
                
                  ))
                : data?.filter((element) =>
                      element.title.toLowerCase().includes(relatedProduct)
                    )
                    .map((product, index) => (
                      <DisplayRecentCardProducts
                        key={product.id}
                        index={index}
                        productDetails={product}
                      />
                    
                    ))}
            </>
          </div>
        </div>
      </>
    );
  }
  

  if (isError) {
    return (
      <>
        <div className="flex justify-center items-center h-screen bg-neutral-800/10 w-full">
          <h1>{error}</h1>
        </div>
      </>
    );
  }

  // const [recentProducts, setRecentProducts] = useState([]);

  function deleteProduct(id) {
    // console.log(id);
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
              // deep copy
              let newProducts = structuredClone(recentProducts);
              //   Update
              newProducts = newProducts.filter((product) => product.id != id);
              //   setState
              setRecentProducts(newProducts);
              //API CASE
              // deep copy
              let newapiProducts = structuredClone(apiProuduct);
              //   Update
              newapiProducts = newapiProducts.filter(
                (product) => product.id != id
              );
              //   setState
              setRecentProducts(newapiProducts);
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
  function updateProduct(index) {
    // console.log(index);

    // deep copy
    let newapiProducts = structuredClone(recentProducts);
    //   Update
    newapiProducts[index].quantity++;
    //   setState
    setRecentProducts(newapiProducts);
  }

  // ___________________________________________________
  //  function getRecentProducts() {
  //    axios.get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then(({ data }) => {
  //       console.log(data.data);
  //       setRecentProducts(data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // ____________________________________________________________
  useEffect(() => {
  
    
  }, []);

// let formik = useFormik({
//   initialValues: {
 
//     search: "",
    
//   },
//   onSubmit: handleRegister,
  
// });
//  function handleRegister() {
//   //  console.log(formik.values.search);
//   return formik.values.search;
// }


 
}
