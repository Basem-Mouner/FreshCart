import React from "react";
import { useEffect, useState } from "react";
import style from "./VerifyCode.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";

import * as Yup from "yup";
export default function VerifyCode() {
const [apiError, setApiError] = useState("");
const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const [code, setCode] = useState("");
  console.log((code));

  // if (code.length >= 4) {
  //   verivication(code);
  // }


   let validationSchema = Yup.object().shape({
     email: Yup.string().email("invalid email").required("email is required"),
   });

   let formik = useFormik({
     initialValues: {
       email: "",
     },
     onSubmit: handleForgotPassword,
     validationSchema,
   });


  function verifyCode() {
    setCode(document.getElementById("code-1").value);
  }
  // async function verivication(code) {
  //   // setIsLoading(true);

  //   await axios
  //     .post(
  //       `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,

  //       { resetCode: code }
  //     )
  //     .then((apiResponse) => {
  //       // setIsLoading(false);
  //       if (apiResponse.data.status === "Success") {
         
  //         toast.success('wellcome back to your account', {
  //           duration: 4000,
  //           position: "center-center",
  //         });
  //         navigate("/");
  //       }
  //       console.log(apiResponse);
  //     })
  //     .catch((apiResponse) => {
  //       // setIsLoading(false);
  //       console.log(apiResponse.response.data.message);
  //       toast.error(apiResponse.response.data.message, {
  //         duration: 4000,
  //         position: "center-center",
  //       });
  //       //  console.log(apiResponse);
  //     });
  // }

async function handleForgotPassword() {
  setIsLoading(true);
  console.log(formik.values.email);
  
  await axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,

      { email:formik.values.email}
    )
    .then((apiResponse) => {
      setIsLoading(false);
      if (apiResponse.data.statusMsg === "success") {
        console.log(apiResponse.data.message);
        toast.success(apiResponse.data.message + "\nplease check your email", {
          duration: 4000,
          position: "center-center",
        });
        navigate("/checkcode");
      }
    })
    .catch((apiResponse) => {
      setIsLoading(false);
      console.log(apiResponse.response.data.message);
      toast.error(apiResponse.response.data.message, {
        duration: 4000,
        position: "center-center",
      });
    });
}


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ForgotPassword</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="max-w-xl py-6 mx-auto">
        <h2 className="mb-6 font-bold text-xl text-green-600">
          {" "}
          please Enter your email to send verification code
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Email address
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 min-w-24"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "verify"}
          </button>
        </form>
      </div>
    </>
  );
}
