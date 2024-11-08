import axios from "axios";
import React, { useEffect, useState, }  from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Create_query = () => {
    const [LocalQueryData,setLocalQueryData]=useState()
    const [categoryIndex,setCategoryIndex]=useState()
    const [data,setData]=useState([])
    const navigate=useNavigate();

    const [profilePopupVisible,setProfilePopupVisible]=useState(false);  
    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."


    const handleprofilePopupVisible=()=>{
        if(profilePopupVisible){
            setProfilePopupVisible(false) 
        }   
        else{
            setProfilePopupVisible(true) 
        }    // this is help to toggle the isProfilePopupVisible
    }
    const getTheValue=()=>{
        if(profilePopupVisible){
            setProfilePopupVisible(false)    // close the isProfilePopupVisible whereever userClick
        }
    }
    const handleProfile=()=>{
        navigate("/userProfile")
    }
    const handlePostFreeQuery=()=>{
        if(LocalQueryData==null){
            alert("Please select the category")
        }
        else{
            Cookies.set("queryData",LocalQueryData,{expires:7})
            navigate("/postfreequery")
        }
    }
    const handleChangeSelect=(e)=>{
        const selectedText= e.target.options[e.target.selectedIndex]
        setLocalQueryData(selectedText.text)
        setCategoryIndex(e.target.selectedIndex)
        console.log(e.target.selectedIndex)
        console.log(selectedText.text)
    }
    const handlePaidClick=()=>{
        if(LocalQueryData==null){
            alert("Please Select the text")
        }
        else{
            Cookies.set("queryData",LocalQueryData,{expires:7})
            try {
                const fetchapi=async()=>{
                    const response=await axios.post("https://chat.roshni.online/api/client/query/responseType",{
                        "id":Number(Cookies.get("clientid")),
                        "category":Number(categoryIndex),
                        "query_type":"paid"
                    },{
                        headers:{
                            "Authorization":`Bearer ${Cookies.get("token")}`
                        }
                    })
                    Cookies.set("professionalid",response.data.professional_id,{expires:7})
                    if(response.status==200){
                        try {
                            const fetchapi=async()=>{
                                const response=await axios.get(`https://chat.roshni.online/api/professionals/${Cookies.get("professionalid")}`,{
                                    headers:{
                                        "Authorization":`Bearer ${Cookies.get("token")}`
                                    }
                                })
                                alert("Your query has been assigned to this " + response.data.firstname+response.data.lastname + " Professional")
                                navigate("/assignedqueries")
                            }
                            fetchapi()
                        } catch (error) {
                            alert("There is some issue")
                        }
                    }
                    console.log(response)
                }
                fetchapi();
            } catch (error) {
                alert("There is some issue")
            }
        }
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
                    navigate("/");

            }
        } catch (error) {
            console.log(error)
        }
        
   
}
    useEffect(()=>{
        const fetchCategories= async()=>{
            const response=await axios.get("https://chat.roshni.online/api/categories")
            // console.log(response.data)
            setData(response.data)
        }
        fetchCategories()
    },[])
    return (
        <>
            <div className="h-[100vh] w-[100vw] flex bg-[#ECF0F5]" onClick={getTheValue}>
                <aside className="w-[17.969vw] h-[100vh]">
                    <div className="w-[17.969vw] h-[8.547vh] bg-[#367FA9] flex items-center justify-center text-[white]" >
                        <div className="w-[10.262vw] flex justify-between items-center">
                            <div className="font-bold text-[1.34rem]">
                                Roshni
                            </div>
                            <div className="text-[1.24rem]">
                                Online
                            </div>
                        </div>
                    </div>
                    <div className="w-[17.969vw] h-[91.453vh] bg-[#222D32]">
                        <div className="h-[11.53vh] w-[17.969vw] bg-[#222D32] text-[white] flex items-center ml-[0.9vw]">
                            <div className="w-[9.5vw] flex items-center justify-between">
                                <img src="src/assets/user_profile.svg" alt="" />
                                <div>
                                    <div className="text-[0.875rem] font-semibold">{Cookies.get("name")}</div>
                                    <div className="flex items-center justify-between w-[3.8vw] h-[1.3rem]">
                                        <div className="w-[0.666rem] h-[0.666rem] bg-[#3C763D] rounded-[1rem]"></div>
                                        <div className="text-[0.688rem]">Online</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[17.969vw] h-[21.391vh]">
                            <div className="h-[6.349vh] bg-[#1A2226] flex items-center text-[#4B646F]  text-[0.67rem]">
                                <div className="ml-[1vw]">
                                    MAIN NAVIGATION
                                </div>

                            </div>
                            <Link to="/dashboard" className="h-[7.521vh] flex items-center justify-center hover:text-[white] hover:bg-[#1A2226] group">
                                <div className="flex items-center justify-between w-[15.369vw]">
                                    <div className="flex items-center justify-between w-[7vw] text-[#B8C7CE] group-hover:text-[white] text-[0.875rem]">
                                        <img src="/src/assets/speed meter.svg" alt="" className="h-[0.875rem]" />
                                        <div>Dashboard</div>
                                    </div>
                                    <div className="text-[white] bg-[#00A65A] h-[2.691vh] w-[2.509vw] text-[0.656rem] font-bold flex items-center justify-center rounded-[2.63px]">
                                        new
                                    </div>
                                </div>
                            </Link>
                            <Link to="/chat_customer" className="h-[7.521vh] flex items-center justify-center hover:text-[white] hover:bg-[#1A2226] group">
                                <div className="flex items-center justify-between w-[15.369vw]">
                                    <div className="flex items-center justify-between w-[4.7vw] text-[#B8C7CE] group-hover:text-[white] text-[0.875rem]">
                                        <img src="/src/assets/calender.svg" alt="" className="h-[0.875rem]" />
                                        <div>Client</div>
                                    </div>
                                    <div className="text-[white] bg-[#00A65A] h-[2.691vh] w-[2.509vw] text-[0.656rem] font-bold flex items-center justify-center rounded-[2.63px]">
                                        new
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </aside>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <nav className="bg-[#3C8DBC] w-[82.031vw] h-[8.547vh]">
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div className="flex items-center h-[8.547vh] w-[82.031vw] justify-end" >
                            <div className="cursor-pointer flex hover:bg-[#2f7096] h-[100%] items-center px-2" onClick={handleprofilePopupVisible}>
                            <img src="src/assets/user_profile.svg" alt="" className="h-[1.563rem]" />
                            <div className="text-white ml-[0.9vw]">{Cookies.get("name")}</div>
                            </div>
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
                    </nav>
                    <div className="w-[82.031vw] h-[9.573vh] flex items-center justify-center">
                        <div className="h-[9.573vh] w-[80.031vw] flex items-center justify-between">
                            <div className="flex items-center w-[12vw] justify-between">
                                <div className="text-[#333333] text-[1.5rem]">
                                    Client
                                </div>
                                <div className="text-[#777777] font-light text-[0.938rem] mt-[1.5vh]">
                                    Control panel
                                </div>
                            </div>
                            <div className="flex items-center w-[8.381vw] justify-around">
                                <img src="/src/assets/speed meter black.svg" alt="" />
                                <div className="cursor-pointer text-[0.75rem]">Home</div>
                                <div className="text-[#CCCCCC]">
                                    &gt;
                                </div>
                                <div className="cursor-pointer text-[#777777] text-[0.75rem]">Client</div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white] h-[35.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className="w-[79.688vw] h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]">
                                <div className="text-[1.1rem] text-[black]/80 mt-1 ml-1">Query</div>
                                <div className=" ml-3">
                                    <div className="font-bold text-[0.8rem] mt-3 mb-1">Category</div>
                                    <div className="flex ">
                                    <img className="border-[0.5px] border-[#555555] border-r-transparent px-2 py-2 " src="/src/assets/icon.svg" />
                                    <select defaultValue="default" name="" id="" onChange={handleChangeSelect} className="border-[0.5px] border-[#555555] focus:border-[0.5px] focus:border-blue-600 outline-none transition-all duration-300 ease-in-out w-[35vw] ">
                                        <option disabled value="default">---Select Option---</option>
                                        {data.map((argdata)=>(
                                                <option key={argdata.id} value={argdata.id}>{argdata.name}</option>  
                                        ))}
                                    </select>
                                    <button className="bg-[#3C8DBC] text-white rounded-sm text-[0.85rem] mx-2 ml-4 w-[8.716vw] px-2" onClick={handlePostFreeQuery}>Free Query (AI)</button>
                                    <button className="bg-[#3C8DBC] text-white rounded-sm text-[0.85rem] px-2" onClick={handlePaidClick}>Paid</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <footer className="bg-[white] w-[82.031vw] h-[8.662vh] shadow-upperShadow flex items-center justify-center">
                            <div className="w-[80.031vw] flex items-center justify-between">
                                <div className="font-bold text-[0.81rem] text-[#444444] flex ">
                                    Copyright &copy; 2024
                                    <Link to="/dashboard" className="text-[#337AB7]">&nbsp;ICT Vision </Link>.
                                    <div className="font-normal">
                                        All rights reserved
                                    </div>
                                </div>
                                <div className="flex text-[#444444] text-[0.875rem]">
                                    <div className="font-bold ">Version</div>
                                    <p>1.0.0</p>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Create_query;