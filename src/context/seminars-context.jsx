import { createContext, useState, useEffect } from "react";
import axios from "axios"

const SeminarsContext = createContext({
  year: '',
  data: [],
  total: null
})


export function SeminarsContextProvider({children}) {


  return <SeminarsContext.Provider value={{}}>{children}</SeminarsContext.Provider>
  
}

export default SeminarsContext