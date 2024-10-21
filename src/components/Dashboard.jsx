import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Dashboard = () => {
    const navigate = useNavigate();
    const Handlequery = () => {
        navigate("/query")
    }
    const HandleAssignedQuery = () => {
        navigate("/assignedqueries")
    }
    const HandleCreateQuery = () => {
        navigate("/create_query")
    }
    const HandleUnAssigned=()=>{
        navigate("/UnAssignedQuries")
    }
    const HandleCompletedQuery=()=>{
        navigate("/completedquries")
    }
    const HandleInProgress=()=>{
        navigate("/inprogress")
    }
    useEffect(() => {
        const fetchAssignedApi = async () => {
            try {
                const response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/assigned/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                // console.log(response.data.length)
                Cookies.set("Assigned", response.data.length, { expires: 7 })

            }
            catch (error) {
                console.log(error)
            }
        }
        fetchAssignedApi()

        const fetchAllApi = async () => {
            try {
                let response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                }

                )
                // console.log(response.data.length)
                Cookies.set("All", response.data.length, { expires: 7 })

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApi();
        const fetchInProgress = async () => {
            try {
                const response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/inprogress/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                Cookies.set("inProogress",response.data.length, {expires:7})

            } catch (error) {
                console.log(error.response.data.error)
            }
        }
        fetchInProgress()
        const fetchCompleteQuery=async()=>{
            try {
                const response=await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/completed/queries`,{
                    headers:{
                        "Authorization":`Bearer ${Cookies.get("token")}`
                    }
                })
                Cookies.set("CompleteQuery",response.data.length,{expires:7})
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompleteQuery()
        const UnAssignedQuery= async ()=>{
            try{
                const response=await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/new/queries`,{
                    headers:{
                        "Authorization":`Bearer ${Cookies.get("token")}`
                    }
                }
                )
                Cookies.set("unAssigned",response.data.length,{expires:7})
            }
            catch(error){
                console.log(error)
            }

        }
        UnAssignedQuery()
    }, [location.pathname])
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
                        <div className="w-[96%] ml-[1vw]">
                            <div className="w-[95%] ">
                                <div className="flex">
                                    <div>

                                        <div className="h-[18vh] w-[17.9vw] bg-[#0073B7] text-white py-[0.35rem] px-[0.6rem]">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("All")?`${Cookies.get("All")}`:"0"}</div>
                                            <div className="text-[0.9rem]">Total Queries</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#00629C] text-[white]/90 text-[0.9rem] flex items-center justify-center" onClick={Handlequery}>
                                            <div className="pb-1 pr-1">
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="mx-[2rem] ">
                                        <div className="h-[18vh] w-[17.9vw] bg-[#D81B60] text-white py-[0.35rem] px-[0.6rem] ">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("Assigned")??"0"}</div>
                                            <div className="text-[0.9rem]">Assigned Queries</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#B81752] text-[white]/90 text-[0.9rem] flex items-center justify-center " onClick={HandleAssignedQuery}>
                                            <div className="pb-1 pr-1" >
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="mr-[2rem] ">
                                        <div className="h-[18vh] w-[17.9vw] bg-[#00A65A] text-white py-[0.35rem] px-[0.6rem] ">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("unAssigned")??"0"}</div>
                                            <div className="text-[0.9rem]">Un Assigned Queries</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#009551] text-[white]/90 text-[0.9rem] flex items-center justify-center " onClick={HandleUnAssigned}>
                                            <div className="pb-1 pr-1" >
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className=" ">
                                        <div className="h-[18vh] w-[17.9vw] bg-[#0073B7] text-white py-[0.35rem] px-[0.6rem] ">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("inProgress")?`${Cookies.get("inProgress")}`:"0"}</div>
                                            <div className="text-[0.9rem]">in progress</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#00629C] text-[white]/90 text-[0.9rem] flex items-center justify-center " onClick={HandleInProgress}>
                                            <div className="pb-1 pr-1" >
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex mt-[3.5vh]">

                                    <div className="">
                                        <div className="h-[18vh] w-[17.9vw] bg-[#DD4B39] text-white py-[0.35rem] px-[0.6rem] ">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("CompleteQuery")}</div>
                                            <div className="text-[0.9rem]">Completed</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#BC4031] text-[white]/90 text-[0.9rem] flex items-center justify-center " onClick={HandleCompletedQuery}>
                                            <div className="pb-1 pr-1" >
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="ml-[2.3vw]">
                                        <div className="h-[11vh] w-[17.9vw] bg-[#F39A12] text-white flex items-center justify-center">
                                            <div className="w-[90%] text-[0.9rem]">
                                                Create Query
                                            </div>
                                        </div>
                                        <div onClick={HandleCreateQuery} className="w-[17.9vw] h-[5vh] bg-[#CF850F] text-[white]/90 text-[0.9rem] flex items-center justify-center cursor-pointer">
                                            <div className="pb-1 pr-1">
                                                Create Query
                                            </div>
                                            <img src="/src/assets/right-icon.png" alt="" className="h-[1rem]" />
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
export default Dashboard;