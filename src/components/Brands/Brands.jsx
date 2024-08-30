import React from "react";
import { useEffect, useState } from "react";
import style from './Brands.module.css'
import { Circles } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import useBrands from "../../Hooks/useBrands";

export default function Brands() {
  const [counter, setCounter] = useState(0);
  
  let { data, isError, error, isLoading, isFetched } = useBrands();
  console.log(data);

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
       <title>Brands</title>
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
                 className="rounded-t-lg w-full "
                 src={cat.image}
                 alt
               />
             </a>
             <div className="p-5">
               <h2 className="mb-3 text-center text-2xl font-semibold  text-gray-700 dark:text-green-400">
                 {cat.name}
               </h2>              
             </div>
           </div>
         </div>
       ))}
     </div>
   </>
 );
  }

   
}
