import React, {  useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
import { ProfilePopupVisbleContext } from "./context/categoryContext";
import { useMediaQuery } from "react-responsive";
const UserProfile = () => {

    const is765px=useMediaQuery({minWidth:765})
    const isFlex=is765px?"flex":"block"

    const isfull=is765px?"w-[82.031vw]":"w-[100vw]";

    const isfullChild=is765px?"w-[79.688vw]":"w-[95vw]"

    const isFullWidth=is765px?"w-[70.25vw]":"w-[84.25vw]"

    const isFullButton=is765px?"w-[76vw]":"w-[90vw]"



    const {profilePopupVisible,setProfilePopupVisible}=useContext(ProfilePopupVisbleContext)
    const navigate=useNavigate()
    const [data,setData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        username:"",
        description:""
    })

    const [error,setError]=useState(
        {
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            username:"",
            description:""
        }
    )


  
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
        navigate("/changePassword")
    }

    useEffect(()=>{
        const fetchapi=async ()=>{
            try{
                const response=await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}`,{
                    headers:{
                        "Authorization":`Bearer ${Cookies.get("token")}`
                    }
                })
                console.log(response)

                setData({
                    firstname:response.data.firstname,
                    lastname:response.data.lastname,
                    email:response.data.email,
                    phone:response.data.phone,
                    username:response.data.username,
                    description:response.data.description
                })

            }
            catch(error){
                console.log(error)
            }
        }
        fetchapi();
    },[])

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData((prev)=>({
            ...prev,   
            [name]:value
        }))
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

    const handleButton=()=>{
        
        const inputErrors={

        }
        if(data.firstname.trim()===""){
            inputErrors.firstname="Please Enter First Name"
        }
        if(data.lastname.trim()===""){
            inputErrors.lastname="Please Enter Last Name"
        }
        if(data.username.trim()===""){
            inputErrors.username="Please Enter User Name"
        }
        if(data.phone.trim()===""){
            inputErrors.phone="Please Enter Phone Number"
        }
        else if(!/^92\d{10}$/.test(data.phone)){
            inputErrors.phone="plase enter correct "
        }
        if(data.email.trim()==""){
            inputErrors.email="Please Enter Email"
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)){
            inputErrors.email="Please enter valid Email"
        }

        setError(inputErrors)



        setTimeout(()=>{
            setError({})
        },3000)
        
        setTimeout(()=>{

        },3000)

        if(Object.keys(inputErrors)==0){
            const updateData= async ()=>{
                try {
                    const response=await axios.put(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}`,data,{
                        headers:{
                            Authorization:`Bearer ${Cookies.get("token")}`
                        }
                    })
                    if(response.status==200){
                        alert("Updated Successfully")
                        Cookies.set("name",response.data.firstname,{expires:7})
                    }
                } catch (error) {
                    alert("There is some issue")
                }                
            }
            updateData();
        }
    }
    return (
        <>
            <div className={`h-[100vh] w-[100vw] ${isFlex} bg-[#ECF0F5]`} onClick={getTheValue}>
                <AsideComponent/>
                <div className={` ${isfull} h-[73.846vh] bg-[#ECF0F5]`}>
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className={`bg-[white] h-[73vh] ${isfull} border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20`}>
                            <div className={`${isfullChild} h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]`}>
                                <div className="text-[1.1rem]">
                                    <div className="p-2">
                                    User Profile    
                                    </div>
                                    <hr />
                                    <div className="shadow-black/30 shadow-sm">
                                        <div className="">
                                        <button className={`${window.location.pathname=="/userProfile"?"bg-[#367FA9] text-white":"text-[black]"} hover:bg-[#2c6b8f]  w-[50%] h-[6vh] text-[0.9rem] `}>User Info</button>
                                        <button className={`w-[50%] text-[0.9rem] text-[black]/80 bg-[#fff] hover:bg-[#e4e2e2] h-[6vh]`} onClick={handleProfile}>Change Password</button>
                                        </div>
                                    </div>
                                    <div className={`h-[58.4vh] ${isfullChild} bg-[#F5F5F5] border-[0.5px] border-[black]/20`}>
                                        <div className="w-[100%] h-[50vh] flex flex-col justify-around items-center ">
                                            <div className="w-[92%] flex justify-between">

                                            <div>
                                                <div className="font-bold text-[0.85rem]">
                                                    First Name
                                                </div>
                                                <div className="flex">
                                                    <div className="w-[3.021vw] h-[5.812vh] border-[0.5px] bg-[#FFFFFF] border-[black]/20 border-r-transparent flex items-center justify-center ">
                                                        <img src="/src/assets/Icon.svg" alt="" />
                                                    </div>
                                                    <input name="firstname" type="text" className="border-[0.5px] border-[black]/20 w-[31.25vw] text-[0.8rem] px-2 focus:outline-none focus:border-[0.5px] focus:border-[blue]/70" value={data.firstname} onChange={handleChange}/>
                                                </div>
                                                    <p className="text-[red]">{error.firstname}</p>
                                            </div>    
                                            <div>
                                                <div className="font-bold text-[0.85rem]">
                                                    Last Name
                                                </div>
                                                <div className="flex">
                                                    <div className="w-[3.021vw] h-[5.812vh] border-[0.5px] bg-[#FFFFFF] border-[black]/20 border-r-transparent flex items-center justify-center ">
                                                        <img src="/src/assets/Icon.svg" alt="" />
                                                    </div>
                                                    <input name="lastname" type="text" className="border-[0.5px] border-[black]/20  w-[31.25vw] text-[0.8rem] px-2 focus:outline-none focus:border-[0.5px] focus:border-[blue]/70" value={data.lastname} onChange={handleChange}/>
                                                </div>
                                                    <p className="text-[red]">{error.lastname}</p>
                                            </div>  
                                            </div>
                                            <div className="w-[92%] flex justify-between">  
                                            <div>
                                                <div className="font-bold text-[0.85rem]">
                                                    Email
                                                </div>
                                                <div className="flex">
                                                    <div className="w-[3.021vw] h-[5.812vh] border-[0.5px] bg-[#FFFFFF] border-[black]/20 border-r-transparent flex items-center justify-center ">
                                                        <img src="/src/assets/Icon.svg" alt="" />
                                                    </div>
                                                    <input name="email" type="text" className="border-[0.5px] border-[black]/20 w-[31.25vw] text-[0.8rem] px-2 focus:outline-none focus:border-[0.5px] focus:border-[blue]/70" value={data.email} onChange={handleChange}/>
                                                </div>
                                                    <p className="text-[red]">{error.email}</p>
                                            </div>    
                                            <div>
                                                <div className="font-bold text-[0.85rem]">
                                                    Phone
                                                </div>
                                                <div className="flex">
                                                    <div className="w-[3.021vw] h-[5.812vh] border-[0.5px] bg-[#FFFFFF] border-[black]/20 border-r-transparent flex items-center justify-center ">
                                                        <img src="/src/assets/Icon.svg" alt="" />
                                                    </div>
                                                    <input name="phone" type="text" className="border-[0.5px] border-[black]/20  w-[31.25vw] text-[0.8rem] px-2 focus:outline-none focus:border-[0.5px] focus:border-[blue]/70" value={data.phone} onChange={handleChange}/>
                                                </div>
                                                    <p className="text-[red]">{error.phone}</p>
                                            </div>    
                                            </div>
                                            <div className="w-[92%] flex justify-between">  
                                            <div className="">
                                                <div className="font-bold text-[0.85rem]">
                                                    User Name
                                                </div>
                                                <div className="flex ">
                                                    <div className="w-[3.021vw] h-[5.812vh] border-[0.5px] bg-[#FFFFFF] border-[black]/20 border-r-transparent flex items-center justify-center ">
                                                        <img src="/src/assets/Icon.svg" alt="" />
                                                    </div>
                                                    <input name="username" type="text" className={`border-[0.5px] ${isFullWidth} border-[black]/20  text-[0.8rem] px-2 focus:outline-none focus:border-[0.5px] focus:border-[blue]/70`} value={data.username} onChange={handleChange}/>
                                                </div>
                                                <p className="text-[red]">{error.username}</p>
                                            </div>    
                                               
                                            </div>
                                            <div className="w-[92%] flex justify-between">  
                                            <div>
                                                <div className="font-bold text-[0.85rem]">
                                                    Description
                                                </div>
                                                <div className="flex">
                                                    <div className="w-[3.021vw] h-[55.575px] border-[0.5px] bg-[#FFFFFF] border-[black]/20 border-r-transparent flex items-center justify-center ">
                                                        <img src="/src/assets/Icon.svg" alt="" />
                                                    </div>
                                                
                                                    <textarea name="description" type="text" className={`border-[0.5px] border-[black]/20 ${isFullWidth} text-[0.8rem] p-2 focus:outline-none focus:border-[0.5px] focus:border-[blue]/70`} value={data.description} onChange={handleChange}/>                                                
                                                </div>
                                            </div>    
                                                
                                            </div>
                                        </div>
                                            <div className={`${isFullButton} flex justify-end`}>
                                                <button className="bg-[#367FA9] text-white flex justify-center items-center h-[35.1px] w-[89.6px] rounded-[2px]" onClick={handleButton}>
                                                    <div className="font-bold text-[1.7rem] mb-1">
                                                        +
                                                    </div>
                                                    <div className="text-[0.9rem]">
                                                        Update
                                                    </div>
                                                </button>
                                        </div>
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
export default UserProfile;