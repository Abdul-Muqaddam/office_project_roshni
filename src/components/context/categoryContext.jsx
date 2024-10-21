import React, { createContext, useState } from "react";
export const categoryContext=createContext();
export const CategoryProvider=({children})=>{
    const [queryData,setQueryData]=useState()
    const [clientId,setClientId]=useState()
    const [name,setName]=useState()
    const [token,setToken]=useState()
    return(
        <categoryContext.Provider value={{queryData,setQueryData,clientId,setClientId,name,setName,token,setToken}}>
        {children}
        </categoryContext.Provider>
    )
} 

