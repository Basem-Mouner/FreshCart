import React from "react";
import { useEffect, useState } from "react";
import style from './Categories.module.css'
import useCategory from "../../Hooks/useCategory";
import { Helmet } from "react-helmet";
import img1 from "../../assets/grocery-banner.png";
import { Circles } from "react-loader-spinner";

export default function Categories() {
 
  
   let { data, isError, error, isLoading, isFetched } = useCategory();
    
   console.log(data);
  if (isLoading) {
      
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-neutral-800/10 w-full">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );

  }
  

  if (!isLoading) {

 return (
   <>
     <Helmet>
       <meta charSet="utf-8" />
       <title>Categories</title>
       <link rel="canonical" href="http://mysite.com/example" />
     </Helmet>
     <div className="flex flex-wrap ">
       {data?.map((cat) => (
         <div
           key={cat._id}
           className="p-2 w-full  md:w-4/12 sm:w-6/12 lg:w-3/12"
         >
           <div className="   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:drop-shadow-lg   hover:scale-[1.01]">
             <a href="#">
               <img
                 className="rounded-t-lg w-full h-[400px]"
                 src={cat.image}
                 alt
               />
             </a>
             <div className="p-5">
               <h2 className="mb-3 text-center text-2xl font-semibold  text-green-700 dark:text-green-400">
                 {cat.name}
               </h2>

               <a
                 href="#"
                 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               >
                 All {cat.name} products
                 <svg
                   className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                   aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 14 10"
                 >
                   <path
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M1 5h12m0 0L9 1m4 4L9 9"
                   />
                 </svg>
               </a>
             </div>
           </div>
         </div>
       ))}
     </div>
   </>
 );
  }
    

   
}
