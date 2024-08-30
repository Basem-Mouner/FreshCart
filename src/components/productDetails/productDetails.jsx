import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from "./productDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";


export default function ProductDetails() {
  const [ProductDetails, setProductDetails] = useState(null);
  const [relatedCategory, setRelatedCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { addProuductToCart, setCart } = useContext(CartContext);
  let { id, category } = useParams();
  console.log(category);


async function addProduct(productId) {
     setIsLoading(true);
     let response = await addProuductToCart(productId);

     console.log(response);

    if (response.data.status == "success") {
      setIsLoading(false);
      setCart(response.data);
       toast.success(response.data.message, {
         duration: 1000,
         position: "center-center",
       });
     } else {
       setIsLoading(false);
       toast.error(response.data.message, {
         duration: 1000,
         position: "center-center",
       });
     }
     
     
   }



    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
   var settings1 = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 6,
     slidesToScroll: 3,

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
    getProductDetails(id);
    getrelatedCategory(category);
    return () => {};
  }, [id,category]);

  async function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        // console.log(data.data);
        setProductDetails(data.data);
      })
      .catch();
  }

  async function getrelatedCategory(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProduct = data.data;
        console.log(allProduct);
        let related = allProduct.filter((product) => product.category.name === category);
          console.log(related);
        setRelatedCategory(related);
      
      })
      .catch();
  }

  return (
    <>
      <div className="row">
        <div className="w-1/4">
          <Slider {...settings}>
            {ProductDetails?.images.map((src) => (
              <img src={src} alt={ProductDetails?.title} className="w-full" />
            ))}
          </Slider>

          {/* <img src={ProductDetails?.imageCover}alt={ProductDetails?.title}className="w-full"/> */}
        </div>
        <div className="w-3/4 p-6 text-center">
          <h1 className="text-gray-950 font-normal text-lg">
            {ProductDetails?.title}
          </h1>
          <p className="mt-4 font-light text-gray-600">
            {ProductDetails?.description}
          </p>
          <div className="flex justify-between mt-2">
            <h4 className=" text-lime-800"> {ProductDetails?.price} EGY</h4>
            <h6 className=" text-black font-light">
              {ProductDetails?.ratingsAverage}
              <i className="fa-solid fa-star text-[#ffd43b]"></i>
            </h6>
          </div>

          <button onClick={() => addProduct(id)}  className="mt-4 px-10 py-2 text-white bg-green-500 hover:bg-green-900 w-5/6  rounded-full">
           {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i class="fa-solid fa-cart-plus"></i>}
          </button>
        </div>
      </div>

      <div className="my-10">
        <Slider {...settings1}>
          {relatedCategory.map((product, index) => (
            <div key={product.id} index={index} className="card  p-2 relative">
              <Link
                to={`/productdetails/${product?.id}/${product?.category.name}`}
              >
                <div className=" rounded-lg p-1 relative shadow-md shadow-sky-500  hover:scale-[1.03] duration-700 overflow-hidden">
                  <img
                    src={product?.imageCover}
                    className="w-full "
                    alt={product?.title}
                  />
                  <h6 className=" text-emerald-500 font-light absolute top-0 left-5">
                    {product?.category.name}
                  </h6>
                  <article className="text-[12px]">
                    {product?.title?.split(" ").slice(0, 2).join(" ")}
                  </article>
                  <div className="flex justify-between">
                    <h4 className=" text-lime-800"> {product?.price} EGY</h4>
                    <h6 className=" text-black font-light">
                      {product?.ratingsAverage}
                      <i className="fa-solid fa-star text-[#ffd43b]"></i>
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
