import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from "./ResetPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  // let { startInfoCart } = useContext(CartContext);
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  async function handleResetPassword(formValues) {
   console.log(formValues);
    setIsLoading(true);
    await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formValues)
      .then((apiResponse) => {
        setIsLoading(false);
        if (apiResponse.statusText == "OK") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate("/");
        }
        setApiError("");
        console.log(apiResponse);
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        setApiError(apiResponse?.code);
        console.log(apiResponse);
      });
  }



  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),

    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with capital char and 8 small char"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleResetPassword,
    validationSchema,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset-Password</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="max-w-xl py-6 mx-auto">
        <h2 className="mb-6 font-bold text-3xl text-green-600">
          Reset your password
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              type="password"
              name="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              newPassword
            </label>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div
              class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.newPassword}
            </div>
          ) : null}

          {apiError ? (
            <div
              class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          ) : null}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 min-w-24"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "reset password"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

