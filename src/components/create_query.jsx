import axios from "axios";
import React, { useEffect, useState, }  from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
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
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <div className="w-[82.031vw] h-[9.573vh] flex items-center justify-center">
                        <ClientSectionMainHeader/>
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
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Create_query;