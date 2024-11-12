import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
const edit_client = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        try {
            const fetchapi = async () => {
                const response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                console.log(response.data)
                setData(response.data)
            }
            fetchapi()

        }
        catch (error) {

        }
    }, [])
    const handleFirstName=(e)=>{
        setData({
            ...data,
            firstname:e.target.value
        })
    }
    const handleLastName=(e)=>{
        setData({
            ...data,
            lastname:e.target.value
        })
    }
    const handleEmail=(e)=>{
        setData({
            ...data,
            email:e.target.value
        })
    }
    const handlePhone=(e)=>{
        setData({
            ...data,
            phone:e.target.value
        })
    }
    const handleAddress=(e)=>{
        setData({
            ...data,
            address:e.target.value
        })
    }
    const handleUpdate=()=>{
        console.log(Cookies.get())
        try {
            const fetchapi = async () => {
                const response = await axios.put(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}`,data, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                console.log(response.data)
                Cookies.set("name",response.data.firstname,{expires:7})
                if(response.status=200){
                    alert("Updated Successfully")
                    window.location.reload()
                }
            }
            fetchapi()

        }
        catch (error) {

        }
    }
    return (
        <>
            <div className="h-[100vh] w-[100vw] flex bg-[#ECF0F5]">
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white] h-[43.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className="w-[79.688vw] h-[42.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]">
                                <div className="">
                                    <div className="w-[80vw] flex items-center flex-col justify-around h-[38vh]">
                                        <div className="w-[78vw] text-[1.1rem] text-[#555555]">
                                            Update Client
                                        </div>

                                        <div className="flex w-[78vw] justify-between">
                                            <div className="flex flex-col justify-between h-[10vh]">
                                                <div className="text-[0.8rem] font-bold">
                                                    First Name
                                                </div>
                                                <div className="flex ">
                                                    <div className="border-[0.5px] h-[2.083rem] w-[2.3rem] border-[#D2D6DE] border-r-transparent flex items-center justify-center"><img src="/src/assets/icon.svg" alt="" /></div>
                                                    <input type="text " className="border-[0.5px] border-[#D2D6DE] focus:outline-none text-[0.8rem] px-3 text-[#555555]" value={data.firstname} onChange={handleFirstName}/>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between h-[10vh]">
                                                <div className="text-[0.8rem] font-bold">
                                                    Last Name
                                                </div>
                                                <div className="flex ">
                                                    <div className="border-[0.5px] h-[2.083rem] w-[2.3rem] border-[#D2D6DE] border-r-transparent flex items-center justify-center"><img src="/src/assets/icon.svg" alt="" /></div>
                                                    <input type="text " className="border-[0.5px] border-[#D2D6DE] focus:outline-none text-[0.8rem] px-3 text-[#555555]" value={data.lastname} onChange={handleLastName}/>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between h-[10vh]">
                                                <div className="text-[0.8rem] font-bold">
                                                    Email
                                                </div>
                                                <div className="flex ">
                                                    <div className="border-[0.5px] h-[2.083rem] w-[2.3rem] border-[#D2D6DE] border-r-transparent flex items-center justify-center"><img src="/src/assets/icon.svg" alt="" /></div>
                                                    <input type="email" className="border-[0.5px] border-[#D2D6DE] focus:outline-none text-[0.8rem] px-3 text-[#555555]" value={data.email} onChange={handleEmail}/>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between h-[10vh]">
                                                <div className="text-[0.8rem] font-bold">
                                                    Phone
                                                </div>
                                                <div className="flex ">
                                                    <div className="border-[0.5px] h-[2.083rem] w-[2.3rem] border-[#D2D6DE] border-r-transparent flex items-center justify-center"><img src="/src/assets/icon.svg" alt="" /></div>
                                                    <input type="tel" className="border-[0.5px] border-[#D2D6DE] focus:outline-none text-[0.8rem] px-3 text-[#555555]" value={data.phone} onChange={handlePhone}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-col justify-between h-[13vh]">
                                                <div className="font-bold text-[0.8rem]">
                                                    Address
                                                </div>
                                                <div className="flex ">
                                                    <div className="border-[0.5px] h-[3.333rem] w-[2.3rem] border-[#D2D6DE] border-r-transparent flex items-center justify-center "><img src="/src/assets/icon.svg" alt="" /></div>
                                                    <textarea type="tel" className="border-[0.5px] border-[#D2D6DE] focus:outline-none text-[0.8rem] px-3 py-2 text-[#555555] w-[75vw] h-[9vh]" value={data.address} onChange={handleAddress}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[78vw] flex justify-end">
                                        <button className="bg-[#367FA9] text-[white] h-[2.083rem] w-[5.316rem] rounded-sm" onClick={handleUpdate}>Update</button>
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
export default edit_client;