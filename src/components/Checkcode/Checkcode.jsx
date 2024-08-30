import React from "react";
import { useEffect, useState } from "react";
import style from "./Checkcode.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
export default function Checkcode() {
 
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const [code, setCode] = useState("");
  // console.log(code);

 

  let validationSchema = Yup.object().shape({
    code:  Yup.string().required("code is required"),
  });

  let formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: verificationHandle,
    validationSchema,
  });

  function verifyCode() {
    setCode(document.getElementById("code-1").value);
  }
  async function verificationHandle() {
    console.log(formik.values.code);
    setIsLoading(true);

    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,

        { resetCode: formik.values.code }
      )
      .then((apiResponse) => {
        setIsLoading(false);
        if (apiResponse.data.status === "Success") {
          toast.success("reset your account password", {
            duration: 4000,
            position: "center-center",
          });
          navigate("/resetPassword");
        }
        console.log(apiResponse);
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        console.log(apiResponse.response.data.message);
        toast.error(apiResponse.response.data.message, {
          duration: 4000,
          position: "center-center",
        });
        //  console.log(apiResponse);
      });
  }

  

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>VerifyCode</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container mx-auto  p-7 ">
        <h2 className="text-2xl text-green-600 drop-shadow-md shadow-green-700 ">
          VerifyCode :
        </h2>

        <form
          className="p-8 max-w-lg text-center mx-auto shadow-lg shadow-green-700 mt-8 "
          onSubmit={formik.handleSubmit}
        >
          <div className="flex mb-2 space-x-2 rtl:space-x-reverse justify-center">
            <div>
              <label htmlFor="code" className="sr-only">
                First code
              </label>
              <input
                type="text"
                id="code"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.code}
                maxLength={10}
                data-focus-input-init
                data-focus-input-next="code-2"
                className="block w-[100%] h-9 py-3 text-sm font-extrabold text-center outline-green-600 text-gray-900 bg-white border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-green-500"
                required
              />
            </div>
          </div>
          {formik.errors.code && formik.touched.code ? (
            <div
              class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.code}
            </div>
          ) : null}
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            Please introduce the digits code we sent via email.
          </p>

          <button
            type="submit"
            className="text-white m-8 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 min-w-24"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "verify"}
          </button>
        </form>
      </div>
    </>
  );
}

