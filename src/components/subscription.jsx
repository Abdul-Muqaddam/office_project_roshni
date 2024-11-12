import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
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
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
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
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Subscription;