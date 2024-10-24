import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
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
                        <div className="flex items-center h-[8.547vh] w-[81.031vw] justify-end">
                            <img src="src/assets/user_profile.svg" alt="" className="h-[1.563rem]" />
                            <div className="text-white ml-[0.9vw]">{Cookies.get("name")}</div>
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
export default edit_client;