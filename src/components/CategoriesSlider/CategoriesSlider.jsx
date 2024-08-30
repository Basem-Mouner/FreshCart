import React from "react";
import { useEffect, useState } from "react";
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from "axios";
import useCategory from "../../Hooks/useCategory";


export default function CategoriesSlider() {

  // const [categorySlider, setCategorySlider] = useState([]);
  

  let { data, isError, error, isLoading, isFetched } = useCategory();
  // console.log(data);

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 2,
      autoplay: true,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
  };
  
   useEffect(() => {
     //  getCategoriesSlider();

     return () => {};
   }, []);
    
  if (isLoading) {
    return (
      <>
        <div className="">
          <h2 className="p-3">show all categories :</h2>
          <div
            role="status"
            class="flex items-center justify-center my-4 mx-auto h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
          >
            <svg
              class="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }

   if (!isLoading) {
     return (
       <>
         <div className="py-6">
           <h2 className="p-3 dark:text-white">show all categories :</h2>
           <Slider {...settings}>
             {data?.map((cat) => (
               <div key={cat.id}>
                 <img src={cat.image} alt={cat.title} className="h-[200px] w-[200px]" />
                 <h3 className="font-light text-center dark:text-white">{cat.name}</h3>
               </div>
             ))}
           </Slider>
         </div>
       </>
     );
   }
  
  
  // async function getCategoriesSlider() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  //     .then(({ data }) => {
  //       console.log('here catageory');
  //       console.log(data.data);
  //     setCategorySlider(data.data)
  //     })
  //   .catch((res)=>{})
  // }

  
    

}
