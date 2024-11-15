import React, { createContext, useState } from "react";
export const ProfilePopupVisbleContext=createContext();
export const CategoryProvider=({children})=>{
   const [profilePopupVisible,setProfilePopupVisible]=useState(false)
    return(
        <ProfilePopupVisbleContext.Provider value={{profilePopupVisible,setProfilePopupVisible}}>
        {children}
        </ProfilePopupVisbleContext.Provider>
    )
} 

