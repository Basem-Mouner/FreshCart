import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
 
  const [cart, setCart] = useState(null);
  

  function addProuductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  function updateCartItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        { headers }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((error) => error);
  }

  function deleteProductItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }

  function deleteUserCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((error) => error);
  }

  function checkoutCart(cartId, url, formvalue) {
    return (axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formvalue,
        },
        { headers }
      )
      .then((res) => res)
      .catch((error) => error));
  }

  function startInfoCart() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then(({ data }) => {
        console.log(data);
        setCart(data);
      })
      .catch((error) => {});
  }

  useEffect(() => {
    startInfoCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        addProuductToCart,
        updateCartItemCount,
        deleteProductItem,
        deleteUserCart,
        checkoutCart,
        setCart,
        cart,
        headers,
        startInfoCart,
        
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
