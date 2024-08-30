import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";



export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {

  let { headers } = useContext(CartContext);

 
 
  const [wishlist, setWishlist] = useState(null);
  const [iswishlist, setIsWishlist] = useState([]);
 let wishData = JSON.parse(localStorage.getItem("wishlistData"));
  function addProuductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((error) => error);
  }
  function getLoggedWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((error) => error);
  }

  function deleteWishlistItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }

  function startInfoWishlist() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then(({ data }) => {
        console.log(data.data.map((data) => data.id));
        
        localStorage.setItem("wishlistData", JSON.stringify(data.data.map((data) => data.id)));
        // setWishData(data.data.map((data) => data.id));
        setWishlist(data);
        // wishlist?.data.map((element) => { iswishlist.push(element._id); });
        
        setIsWishlist(JSON.parse(localStorage.getItem("wishlistData")));
        
      })
      .catch((error) => {});
  }

  useEffect(() => {
    startInfoWishlist();
  }, []);

  return (
    <>
      <WishlistContext.Provider
        value={{
          getLoggedWishlist,
          addProuductToWishlist,
          deleteWishlistItem,
          setWishlist,
          wishlist,
          iswishlist,
          setIsWishlist,
          wishData,
        }}
      >
        {props.children}
      </WishlistContext.Provider>
    </>
  );
}
