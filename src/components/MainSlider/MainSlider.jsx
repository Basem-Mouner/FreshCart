import React from "react";
import { useEffect, useState } from "react";
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../assets/grocery-banner.png";
// import img2 from "../../assets/blog-img-1.jpeg";
// import img3 from "../../assets/blog-img-2.jpeg";
import img4 from "../../assets/slider-image-3.jpeg";
import img5 from "../../assets/slider-2.jpeg";
import img6 from "../../assets/slider-image-2.jpeg";
import img7 from "../../assets/assortment-citrus-fruits.png";

export default function MainSlider() {
  const [counter, setCounter] = useState(0);
  let settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  useEffect(() => {
    return () => {};
  }, []);

 

  return (
    <>
      
      <div className="flex flex-wrap w-11/12 mx-auto">
        <div className="md:w-3/4 w-full">
          <Slider {...settings}>
            <img src={img1} className="w-full h-[18rem]  object-fill" />
            {/* <img src={img2} className="w-full h-[18rem]  object-fill" /> */}
            {/* <img src={img3} className="w-full h-[18rem]  object-fill" /> */}
            <img src={img4} className="w-full h-[18rem]  object-fill" />
            <img src={img5} className="w-full h-[18rem]  object-fill" />
            <img src={img6} className="w-full h-[18rem]  object-fill" />
          </Slider>
        </div>
        <div className="md:w-1/4 w-full">
          <img
            src={img6}
            className="h-[9rem] w-1/2 md:w-full object-fill inline-block md:block"
          />
          <img
            src={img4}
            className="h-[9rem]  w-1/2 md:w-full object-fill inline-block md:block"
          />
        </div>
      </div>
    </>
  );
}
