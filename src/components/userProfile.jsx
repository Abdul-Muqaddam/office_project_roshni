import React, {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
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
                        <div className="bg-[white] h-[73vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className="w-[79.688vw] h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]">
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
                                    <div className="h-[58.4vh] w-[79.7vw] bg-[#F5F5F5] border-[0.5px] border-[black]/20">
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
                                            <div>
                                                <div className="font-bold text-[0.85rem]">
                                                    User Name
                                                </div>
                                                <div className="flex">
                                                    <div className="w-[3.021vw] h-[5.812vh] border-[0.5px] bg-[#FFFFFF] border-[black]/20 border-r-transparent flex items-center justify-center ">
                                                        <img src="/src/assets/Icon.svg" alt="" />
                                                    </div>
                                                    <input name="username" type="text" className="border-[0.5px] border-[black]/20 w-[70.25vw] text-[0.8rem] px-2 focus:outline-none focus:border-[0.5px] focus:border-[blue]/70" value={data.username} onChange={handleChange}/>
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
                                                    <div className="w-[3.021vw] h-[9.5vh] border-[0.5px] bg-[#FFFFFF] border-[black]/20 border-r-transparent flex items-center justify-center ">
                                                        <img src="/src/assets/Icon.svg" alt="" />
                                                    </div>
                                                
                                                    <textarea name="description" type="text" className="border-[0.5px] border-[black]/20 w-[70.25vw] text-[0.8rem] p-2 focus:outline-none focus:border-[0.5px] focus:border-[blue]/70" value={data.description} onChange={handleChange}/>
                                                
                                                
                                                </div>
                                            </div>    
                                                
                                            </div>
                                        </div>
                                            <div className="w-[76vw] flex justify-end">
                                                <button className="bg-[#367FA9] text-white flex justify-center items-center h-[6vh] w-[7vw] rounded-[2px]" onClick={handleButton}>
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
export default UserProfile;