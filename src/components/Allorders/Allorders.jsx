import React from "react";
import { useEffect, useState } from "react";
import style from './Allorders.module.scss'
import { Link } from "react-router-dom";

import axios from "axios";


export default function Allorders() {
  const [counter, setCounter] = useState(0);
  

  // async function getUserOrder(cartid) {
    
  //   let res = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/orders/user/${cartid}`
  //   );
  //   console.log(res);


  // }
  
    useEffect(() => {
     
      return () => {};
    }, []);
    

    return (
      <>
        // <h1 className={`${style.bg_success_1} ${style.text_success}`}>well</h1>
        <h1 className="text-2xl m-7">you are finsh payment </h1>
        <span className="text-sky-300">click here to continue shopping </span>
        <Link
          to="/"
          className="bg-green-400 p-1 text-green-900 mx-4 hover:underline"
        >
          click here
        </Link>
      </>
    );
}
