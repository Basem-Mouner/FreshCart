import React from "react";
import { useEffect, useState } from "react";
import style from './Products.module.css'
import useProduct from "../../Hooks/useProduct";
import { DNA } from "react-loader-spinner";
import DisplayRecentCardProducts from "../displayRecentCardProducts/displayRecentCardProducts";
import { Helmet } from "react-helmet";
export default function Products() {
    const [counter, setCounter] = useState(0);
  let { data, isError, error, isLoading, isFetched } = useProduct();
  
  
    useEffect(() => {
        
        return () => {
            
        }
    }, []);
    
  
   if (isLoading) {
     return (
       <>
         <div className="flex justify-center items-center h-screen bg-neutral-800/10 w-full">
           <DNA height="300" width="300" />
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

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>product</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <div className="container mx-auto my-5 dark:bg-slate-800">
          <div className="flex flex-wrap">
            <>
              {data?.map((product, index) => 
                <DisplayRecentCardProducts
                  key={product.id}
                  index={index}
                  productDetails={product}
                />
              )}
            </>
          </div>
        </div>
      </>
    );
}
