import { useEffect, useState } from "react";
import { createContext } from "react";

export let UserContext = createContext(0);


export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);
  // const [wishData, setWishData] = useState([]);
  
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUserLogin(localStorage.getItem("userToken"));
      // setWishData( JSON.parse(localStorage.getItem("wishlistData")));
    }
     
  
  }, []);
  
  
  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {/* all app */}
      {props.children}
    </UserContext.Provider>
  );
}
