import React from "react";
import Cookies from "js-cookie";
import { useState } from "react";

const Navbar=()=>{
    const [profilePopupVisible,setProfilePopupVisible]=useState(false);  
    const handleprofilePopupVisible=()=>{
        if(profilePopupVisible){
            setProfilePopupVisible(false) 
        }   
        else{
            setProfilePopupVisible(true) 
        }    // this is help to toggle the isProfilePopupVisible
    }
    const handleProfile=()=>{
        navigate("/userProfile")
    }
    const handleSignOut= async ()=>{
        
        try {
            const response=await axios.post("https://chat.roshni.online/api/logout",{},{
                headers:{
                    "Authorization":`Bearer ${Cookies.get("token")}`
                }
                
            })
            if(response.status==200){
                alert(response.data.message)
                const deleteCookies=()=>{
                    const Cookies=document.cookie.split(";");
                    Cookies.map((Cookie)=>{
                        const [name]=Cookie.split("=");
                        document.cookie=`${name.trim()}=; max-age=0 path=/;`                        
                    })    
                }
                deleteCookies();
                navigate("/",{replace:true})
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <nav className="bg-[#3C8DBC] w-[82.031vw] h-[8.547vh]">
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div className="flex items-center h-[8.547vh] w-[82.031vw] justify-end ">
                            <div className="hover:bg-[#32769e] flex h-[100%] items-center px-2 cursor-pointer" onClick={handleprofilePopupVisible}>
                                <img src="src/assets/user_profile.svg" alt="" className="h-[1.563rem]" />
                                <div className="text-white ml-[0.9vw]">{Cookies.get("name")}</div>
                            </div>
                            <div className={`w-[21.875vw] h-[37.916vh] top-14 right-1 ${profilePopupVisible?"absolute":"hidden"} z-10`} >
                                <div className="bg-[#3C8DBC] w-[100%] h-[78%] flex flex-col items-center ">
                                    <img src="./src/assets/user_profile.jpg" alt="" className="rounded-[5rem] mt-[1.8vh] h-[15.385vh] border-4 border-[#63A4C9]" />
                                    <div className="text-white">{Cookies.get("name")}</div>
                                </div>
                                <div className="bg-[white] h-[22%] flex items-center justify-center ">
                                    <div className="w-[90%] flex justify-between items-center">
                                        <button className="border-[1px] border-[#ADADAD]/60 bg-[#F4F4F4] text-[#666666] text-[0.85rem] px-2 py-[4px] hover:bg-[#E7E7E7]" onClick={handleProfile}>Profile</button>
                                        <button className="border-[1px] border-[#ADADAD]/60 bg-[#F4F4F4] text-[#666666] text-[0.85rem] px-2 py-[4px] hover:bg-[#E7E7E7]" onClick={handleSignOut}>Sign out</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </nav>
        </>
    )
}
export default Navbar