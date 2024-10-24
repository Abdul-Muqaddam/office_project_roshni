import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Subscription = () => {
    const [packageRate,setPackageRate]=useState([])
    const [subscriptionDetail,setSubscriptionDetail]=useState({
        pkg:"",
        units:"",
        rate:"",
    })
    useEffect(()=>{
        const fetchapi=async ()=>{
            const response=await fetch(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/subscription`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${Cookies.get("token")}`
                }
            })
            if(response.ok){
                const data = await response.json();
                console.log(data)
                console.log(data[1].length);
                setPackageRate(data[1])

            }
        }
        fetchapi();
    },[])
    const HandleChange=(event)=>{
        const value=event.target.value;
        if(value==2){
            packageRate.map((event)=>{
                if(event.duration=="daily"){
                    setSubscriptionDetail({
                        pkg:event.duration,
                        units:event.units,
                        rate:event.rate,
                    })
                }
            })
        }
        else if(value==3){
            packageRate.map((event)=>{
                if(event.duration=="weekly"){
                    setSubscriptionDetail({
                        pkg:event.duration,
                        units:event.units,
                        rate:event.rate,
                    })
                }
            })
        }
        else if(value==4){
            console.log("Monthly")
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
                        <div className="bg-[white] h-[75.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className="w-[79.688vw] h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]">

                                <div className="text-[1.1rem] text-black/70">Package</div>
                                <div className="w-[78.688vw] h-[65vh] flex flex-col justify-between items-center">
                                    <div>
                                        <div className="h-[9vh] flex flex-col justify-between">
                                            <div className="text-[0.8rem] font-bold">
                                                Duration
                                            </div>
                                            <select name="" id="" onChange={HandleChange} className="w-[78vw] px-3 py-1 text-[0.8rem] focus:outline-none text-[black]/70 border-[0.5px] border-[black]/30 focus:border-[0.5px] focus:border-blue-500">
                                                <option value="1">--Select Duration--</option>
                                                <option value="2">Daily</option>
                                                <option value="3">Weekly</option>
                                                <option value="4">Monthly</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="h-[10vh] flex flex-col justify-between">

                                        <div className="text-[0.8rem] font-bold">
                                            Package
                                        </div>
                                        <select name="" id="" className="w-[78vw] text-[0.8rem] px-3 py-1 focus:outline-none text-[black]/70 border-[0.5px] border-[black]/30 focus:border-[0.5px] focus:border-blue-500">
                                        <option value="1" >{subscriptionDetail && subscriptionDetail.pkg?subscriptionDetail.pkg:"--Select Package--"}</option>
                                        </select>
                                    </div>
                                    <div className="h-[10vh] flex flex-col justify-between">

                                        <div className="text-[0.8rem] font-bold">
                                            Units
                                        </div>
                                        <input name="" id="" className="w-[78vw] px-3 py-1 focus:outline-none text-[black]/70 border-[0.5px] border-[black]/30 cursor-text bg-[#EEEEEE] text-[0.8rem]" value={subscriptionDetail.units} disabled>

                                        </input>
                                    </div>
                                    <div className="h-[10vh] flex flex-col justify-between">

                                        <div className="text-[0.8rem] font-bold">
                                            Rate
                                        </div>
                                        <input name="" id="" className="w-[78vw] px-3 py-1 focus:outline-none text-[black]/70 border-[0.5px] border-[black]/30 cursor-text bg-[#EEEEEE] text-[0.8rem]" value={subscriptionDetail.rate} disabled>

                                        </input>
                                    </div>
                                    <div className="h-[10vh] flex flex-col justify-between">

                                        <div className="text-[0.8rem] font-bold">
                                            Recurring
                                        </div>
                                        <select name="" id="" className="w-[78vw] px-3 py-1 focus:outline-none text-[black]/70 border-[0.5px] border-[black]/30 focus:border-[0.5px] focus:border-blue-500 text-[0.8rem]">
                                            <option value="1">No</option>
                                            <option value="2">Yes</option>
                                        </select>
                                    </div>
                                    <div className="w-[99%]">
                                        <button className="text-white bg-[#367FA9] text-[0.8rem] w-[5.213rem] h-[2.083rem] rounded">Subscribe</button>
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
export default Subscription;