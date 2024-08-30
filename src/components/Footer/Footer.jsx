import React from "react";
import { useEffect, useState } from "react";
import style from "./Footer.module.css";
export default function Footer() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="bg-gray-300 dark:bg-slate-600 p-5   w-full ">
        <h2 className="font-semibold text-2xl text-black/80 dark:text-white ">
          Get the Fresh Cart app
        </h2>
        <h3 className=" font-light text-black/70 dark:text-white ">
          we will send you a link, open it on your phone to download the app
        </h3>
        <div className="flex flex-wrap justify-between items-center mt-3 ">
          <div className="relative mb-6 w-full lg:w-9/12  ">
            <div className=" absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border outline-none   border-green-600 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Email"
            />
          </div>
          <button
            type="button"
            class="self-start me-4  lg:w-2/12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3   dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Share App Link
          </button>
        </div>

        <div>


          
        </div>
      </div>
    </>
  );
}
