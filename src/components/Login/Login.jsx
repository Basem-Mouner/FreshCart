import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { CounterContext } from "../../Context/CounterContext";
import { CartContext } from "../../Context/CartContext";

export default function Login() {
  let { userLogin, setUserLogin } = useContext(UserContext);

  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  async function handleLogin(formValues) {
    // console.log(formValues);
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((apiResponse) => {
        setIsLoading(false);

        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);

          window.location.href = "/";
        }
        setApiError("");
        console.log(apiResponse.data);
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        setApiError(apiResponse?.response?.data?.message);
      });
  }


  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),

    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with capital char and 8 small char"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate: formValidation,
    onSubmit: handleLogin,
    // validationSchema: validationSchema,
    //or key and value have the same name
    validationSchema,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="max-w-xl py-6 mx-auto">
        <h2 className="mb-6 font-bold text-3xl text-green-600">Login Now</h2>

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
              {" "}
              Enter your Email address
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {" "}
              {formik.errors.email}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {" "}
              password
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {" "}
              {formik.errors.password}
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
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>

          <p className="p-4 text-center dark:text-white">
            if you dont have account ?{" "}
            <span className="font-bold text-green-900 dark:text-green-500">
              <Link to={"/register"}>Register now</Link>
            </span>
          </p>
          <p className="p-4 text-center dark:text-white">
            Do you have account . . .
            <span
              className="ms-2 font-bold text-green-900 dark:text-green-500 cursor-pointer "
            >
              <Link to={"/verifycode"}>Forgot password</Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
