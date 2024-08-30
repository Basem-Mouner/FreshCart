import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { CounterContext } from "../../Context/CounterContext";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
export default function Home() {
  // let { counter, setCounter } = useContext(CounterContext);
let { getLoggedUserCart, setCart } = useContext(CartContext);
  let { userLogin, setUserLogin } = useContext(UserContext);

    // async function getCartItems() {
    //   let { data } = await getLoggedUserCart();
    //   console.log(data);
    //   setCart(data);
    // }
  useEffect(() => {
      
      // getCartItems();
    }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
