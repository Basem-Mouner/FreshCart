import React, { useContext } from "react";
import { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CounterContext } from "../../Context/CounterContext";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {

  const [isnav, setIsNav] = useState(false);
  let { cart  } = useContext(CartContext);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);

  console.log(cart);
  console.log(userLogin);

  function togg(isnav) {
    if (isnav === false) {
      setIsNav(true);
    }
    if (isnav === true) {
      setIsNav(false);
    }
  }

 
 
  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("wishlistData");
    setUserLogin(null);
    
    navigate("/login");
  }
  useEffect(() => {
   
    // const Toggle = document.getElementById("NavToggle");
    // const navtoggle1 = document.getElementById("navToggle1");
    // const navtoggle2 = document.getElementById("navToggle2");
    // Toggle.addEventListener("click", (e) => {
    //   navtoggle1.classList.toggle('hidden');
    //   navtoggle2.classList.toggle("hidden");
    //   if (isnav === false) {
    //     setIsNav(true);
    //   }
    //   if (isnav === true) {
    //     setIsNav(false);
    //   }
    // });
  }, []);

  function toggleNight() {
    document.body.classList.toggle("dark");

    // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //   //check window for dark mode
    //   document.body.classList.add("dark");
    // } else {
    //   document.body.classList.remove("dark");
    // }
  }

  return (
    <>
      <nav className="bg-gray-100    lg:fixed top-0 left-0 right-0 py-2 mx-3 md:m-0 z-50 relative rounded-lg lg:rounded-none px-1 dark:bg-slate-600">
        <div className="container mx-auto py-2  flex flex-col lg:flex-row justify-between dark:bg-slate-600">
          <div className="flex flex-col lg:flex-row lg:items-center items-start ">
            <img src={logo} alt="fresh cart logo" className="mx-1 " />

            {isnav ? (
              <ul className="block  lg:hidden flex-col lg:flex-row lg:items-center items-start mt-5 lg:mt-0 ">
                {userLogin != null ? (
                  <>
                    <li className="mx-2">
                      <NavLink
                        className="text-slate-900 dark:text-white text-lg"
                        to=""
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="mx-2 py-2">
                      <NavLink
                        className="text-slate-900 dark:text-white text-lg"
                        to="products"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li className="mx-2 py-2">
                      <NavLink
                        className="text-slate-900 dark:text-white text-lg"
                        to="brands"
                      >
                        Brands
                      </NavLink>
                    </li>
                    <li className="mx-2 py-2">
                      <NavLink
                        className="text-slate-900 dark:text-white text-lg"
                        to="categories"
                      >
                        Categories
                      </NavLink>
                    </li>
                  </>
                ) : null}
              </ul>
            ) : null}
            <ul className="hidden  lg:flex flex-col lg:flex-row lg:items-center items-start mt-5 lg:mt-0 ">
              {userLogin != null ? (
                <>
                  <li className="mx-2">
                    <NavLink
                      className="text-slate-900 dark:text-stone-200 text-lg"
                      to=""
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2">
                    <NavLink
                      className="text-slate-900 dark:text-stone-200 text-lg"
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2">
                    <NavLink
                      className="text-slate-900 dark:text-stone-200 text-lg"
                      to="brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2">
                    <NavLink
                      className="text-slate-900 dark:text-stone-200 text-lg"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          {isnav ? (
            <div className=" lg:hidden  ">
              <ul className="flex flex-col lg:flex-row items-center mr-5 dark:text-white ">
                <li className="mr-4">
                  <i className="fab mx-2 fa-facebook dark:text-white"></i>
                  <i className="fab mx-2 fa-twitter dark:text-white"></i>
                  <i className="fab mx-2 fa-instagram dark:text-white"></i>
                  <i className="fab mx-2 fa-youtube dark:text-white"></i>
                  <i className="fab mx-2 fa-snapchat dark:text-white"></i>
                   <i onClick={() => {toggleNight();}} class="mx-2 fa-solid fa-moon text-2xl dark:text-yellow-500 cursor-pointer"></i>
                </li>
                {userLogin === null ? (
                  <>
                    <li className="mx-2 py-2">
                      <NavLink
                        className="text-slate-900 dark:text-white text-lg"
                        to="login"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="mx-2 py-2">
                      <NavLink
                        className="text-slate-900 dark:text-white text-lg"
                        to="register"
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <Link to="/wishlist">
                      <i class="fa-solid fa-star text-yellow-400 text-lg  hover:text-yellow-500 mt-3 lg:mt-0"></i>
                    </Link>
                    <li className="mx-3   py-2" onClick={logOut}>
                      <Link className="text-slate-900 dark:text-white text-lg">
                        Logout
                      </Link>
                    </li>

                    <li className="mx-2 py-2">
                      <NavLink
                        className="text-slate-900 dark:text-white text-lg"
                        to="cart"
                      >
                        <i className="fa-solid fa-cart-shopping text-green-400  text-2xl relative">
                          <span className="text-red-600  font-black  text-[13px] absolute top-[-10px] left-[50%] translate-x-[50%] p-1 bg-red-900/15 rounded-full">
                            {cart?.numOfCartItems}
                          </span>
                        </i>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ) : null}
          <div className="hidden lg:block  ">
            <ul className="flex flex-col lg:flex-row items-center mr-5 ">
              <li className="mr-4">
                <i className="fab mx-2 fa-facebook dark:text-white"></i>
                <i className="fab mx-2 fa-twitter dark:text-white"></i>
                <i className="fab mx-2 fa-instagram dark:text-white"></i>
                <i className="fab mx-2 fa-youtube dark:text-white"></i>
                <i className="fab mx-2 fa-snapchat dark:text-white"></i>
                <i onClick={() => {toggleNight();}} class="mx-2 fa-solid fa-moon text-2xl dark:text-yellow-500 cursor-pointer"></i>
              </li>
            

              {userLogin === null ? (
                <>
                  <li className="mx-2 py-2">
                    <NavLink
                      className="text-slate-900 dark:text-white text-lg"
                      to="login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="mx-2 py-2">
                    <NavLink
                      className="text-slate-900 dark:text-white text-lg"
                      to="register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/wishlist">
                    <i class="fa-solid fa-star text-yellow-400 text-lg  hover:text-yellow-500 mt-3 lg:mt-0"></i>
                  </Link>
                  <li className="mx-3 py-2" onClick={logOut}>
                    <Link className="text-slate-900 dark:text-white text-lg">
                      Logout
                    </Link>
                  </li>

                  <li className="mx-2 py-2">
                    <NavLink className="text-slate-900 text-lg" to="cart">
                      <i className="fa-solid fa-cart-shopping text-green-400 text-2xl relative">
                        <span className="text-red-600 font-black  text-[13px] absolute top-[-10px] left-[50%] translate-x-[50%] p-1 bg-red-900/15 rounded-full">
                          {cart?.numOfCartItems}
                        </span>
                      </i>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <button
          onClick={() => {
            togg(isnav);
          }}
          id="NavToggle"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-2 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 absolute top-2 right-2"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </nav>
    </>
  );
}
