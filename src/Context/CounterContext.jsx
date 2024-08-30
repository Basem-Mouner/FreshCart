import { useState } from "react";
import { createContext } from "react";

export let CounterContext = createContext(0);
export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState("basem");
  // function changeCount() {

  //     setCounter(Math.random);
  // }
  return (
    <CounterContext.Provider value={{ counter, userName, setCounter }}>
      {/* all app */}
      {props.children}
    </CounterContext.Provider>
  );
}
