import React from "react";
import { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Navbar />

      <div className="w-[95%] mx-auto pt-20  min-h-screen">
        <Outlet />
      </div>

      <Online>
        <span className="text-lime-500"> Online state</span>
      </Online>

      <Offline>
        <span className="text-red-800">network Offline</span>{" "}
      </Offline>
      
      <Footer />
    </>
  );
}
