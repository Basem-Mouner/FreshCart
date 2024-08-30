import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from './displayRecentCardProducts.module.css'
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function DisplayRecentCardProducts(props) {
const [counter, setCounter] = useState(0);
     let { imageCover, price, id, title,category,ratingsAverage } = props.productDetails;
  let { addProuductToCart, cart, setCart } = useContext(CartContext);
  let {wishlist,setWishlist,getLoggedWishlist, addProuductToWishlist,deleteWishlistItem, wishData,iswishlist, setIsWishlist } = useContext(WishlistContext);
  const [isLoading, setIsLoading] = useState(false);
  const [wishFlag, setWishFlag] = useState(0);
  

  // { wishData?.map((item)=>{item==id?console.log('yes'):console.log('no')}) }

  //  console.log(wishData);
  
  
  async function addProduct(productId) {
     setIsLoading(true);
     let response = await addProuductToCart(productId);

    console.log(response);
    

    if (response.data.status == "success") {
      setIsLoading(false);
      setCart(response.data);
    
       toast.success(response.data.message, {
         duration: 1000,
         position: "center-center",
       });
     } else {
       setIsLoading(false);
       toast.error(response.data.message, {
         duration: 1000,
         position: "center-center",
       });
     }
         
  }
  
async function addWishlist(productId) {
  
  let response = await addProuductToWishlist(productId);

  console.log(response);
  setIsWishlist(response?.data?.data);
  localStorage.setItem("wishlistData", JSON.stringify(response?.data?.data));
  
  if (response?.data.status == "success") {
    
      console.log(wishData);

    toast.success(response.data.message, {
      duration: 1000,
      position: "center-center",
    });
  } else {
    toast.error(response.data.message, {
      duration: 1000,
      position: "center-center",
    });
  }
  }
  

   async function getWishlistItems() {
     let { data } = await getLoggedWishlist();
     console.log(data);
     setWishlist(data);
     setWishlistDetails(data.data);
   }

   async function daleteWishItem(productId) {
    let res = await deleteWishlistItem(productId);
    console.log(res.data.data);
     getWishlistItems();
    setIsWishlist(res?.data?.data);
      
  localStorage.setItem("wishlistData", JSON.stringify(res?.data?.data));

  }

  
    
  useEffect(() => {


  }, []);
    

    return (
      <>
        <div className="card w-full sm:w-6/12 md:w-4/12 lg:w-2/12 p-2 relative overflow-hidden">
          <Link to={`/productdetails/${id}/${category.name}`}>
            <div className=" rounded-lg p-1 relative shadow-md shadow-green-500  hover:scale-[1.03] duration-700 overflow-hidden">
              <img src={imageCover} className="w-full " alt={title} />
              <h6 className=" text-emerald-700 font-light absolute top-0 left-6">
                {category.name}
              </h6>
              <article className="text-[13px] dark:text-white">
                {title.split(" ").slice(0, 3).join(" ")}
              </article>
              <div className="flex justify-between">
                <h4 className=" text-lime-800 dark:text-lime-300"> {price} EGY</h4>
                <h6 className=" text-black font-light dark:text-lime-300">
                  {ratingsAverage}
                  <i className="fa-solid fa-star text-[#ffd43b] ml-1"></i>
                </h6>
              </div>
              {/* <h4 className=" text-lime-800"> quantity: {quantity}</h4> */}
              {/* No.fav{iswishlist?.length} */}
            </div>
          </Link>
          <button
            onClick={() => addProduct(id)}
            className="p-1  text-white bg-green-500/80 cart_btn rounded-full md:ml-5 sm:ml-8 ml-12 hover:bg-green-800 "
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i class="fa-solid fa-cart-plus"></i>
            )}
          </button>

          <button
            onClick={
              wishData?.includes(id)
                ? () => daleteWishItem(id)
                : () => addWishlist(id)
            }
            className="p-3 absolute top-[-10px] right-[-10px]  "
          >
            {wishData?.length > 0 && wishData?.includes(id) ? (
              <i class="fa-solid fa-heart text-red-600 text-2xl "></i>
            ) : (
              <i class="fa-solid fa-star text-yellow-200 text-xl hover:text-2xl hover:text-yellow-400"></i>
            )}
          </button>
        </div>
      </>
    );
}
