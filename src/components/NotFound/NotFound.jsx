import React from "react";
import { useEffect, useState } from "react";
import style from './NotFound.module.css'
import error from "../../assets/error.svg";
export default function NotFound() {
    const [counter, setCounter] = useState(0);
    
    useEffect(() => {
        
        return () => {
            
        }
    }, []);
    

    return (
      <>
        <>
          <div className="flex justify-center  p-5 ">
            <img src={error } className="" alt="error 404 pathname" />
          </div>
          
        </>
      </>
    );
}
