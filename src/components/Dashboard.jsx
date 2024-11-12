import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
import apiRoute from "./apiroutes";
const Dashboard = () => {
    const is786px=useMediaQuery({minWidth:786})

    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."

    

    

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
    const HandleUnAssigned = () => {
        navigate("/UnAssignedQuries")
    }
    const HandleCompletedQuery = () => {
        navigate("/completedquries")
    }
    const HandleInProgress = () => {
        navigate("/inprogress")
    }
    useEffect(() => {
        const fetchapi = async () => {
            const chatobj = {
                client_id: Cookies.get("clientid"),
                query_id: Cookies.get("queryid"),
                professional_id: Cookies.get("professional_id")
            }
            const response = await axios.post("https://chat.roshni.online/api/chat/start", chatobj, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            // console.log(response.data.jid)
            // setBoshURL(response.data.boshUrl)
            console.log(response)
            Cookies.set("boshURL", response.data.boshUrl, { expires: 7 })
            Cookies.set("jid", response.data.jid, { expires: 7 })
            Cookies.set("password", response.data.password, { expires: 7 })
            Cookies.set("autoJoin", response.data.autoJoin)
            console.log(Cookies.get())
            console.log(Cookies.get("boshURL"))
            console.log(Cookies.get("jid"))
            console.log(Cookies.get("password"))
            // setJid(response.data.jid)
            // setPassword(response.data.password)
            // console.log(password)
            // console.log(jid)
            // console.log(boshURL)

            const autojoin = Cookies.get("autoJoin")
            const autojoinnew = autojoin ? autojoin.split(",") : [];

            window.converse.initialize({
                auto_join_private_chats: [autojoinnew],
                bosh_service_url: `${Cookies.get("boshURL")}`,
                jid: `${Cookies.get("jid")}`,
                password: `${Cookies.get("password")}`,
                auto_login: true,
                debug: true,
                allow_contact_requests: true,
                show_desktop_notification: true,
                allow_non_roster_messaging: true,
                keepalive: true,
                // view_mode: 'fullscreen',
            })
        }
        fetchapi();



    }, [])
    useEffect(() => {
        const fetchapi=async ()=>{
            try {
                const response= await apiRoute.assigned_queries()
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }            
        fetchapi()
        
                    // console.log(response.data.length)
                    // Cookies.set("Assigned", response.data.length, { expires: 7 })
                
                

           
        
        

        const fetchAllApi = async () => {
            try {
                let response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                }

                )
                // console.log(response.data.length)
                console.log(response.data)
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
                Cookies.set("inProogress", response.data.length, { expires: 7 })

            } catch (error) {
                console.log(error.response.data.error)
            }
        }
        fetchInProgress()
        const fetchCompleteQuery = async () => {
            try {
                const response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/completed/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                Cookies.set("CompleteQuery", response.data.length, { expires: 7 })
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompleteQuery()
        const UnAssignedQuery = async () => {
            try {
                const response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/new/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                }
                )
                Cookies.set("unAssigned", response.data.length, { expires: 7 })
            }
            catch (error) {
                console.log(error)
            }

        }
        UnAssignedQuery()
    }, [location.pathname])

    
    const getTheValue=()=>{
        if(profilePopupVisible){
            setProfilePopupVisible(false)
        }
    }
    return (
        <>

            <div className={`${is786px?"h-[100vh] w-[100vw] flex bg-[#ECF0F5]":"h-[100vh] w-[100vw] flex"}`} onClick={getTheValue}>
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>

                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="w-[96%] ml-[1vw]">
                            <div className="w-[95%] ">
                                <div className="flex">
                                    <div onClick={Handlequery}>

                                        <div className="h-[18vh] w-[17.9vw] bg-[#0073B7] text-white py-[0.35rem] px-[0.6rem] cursor-pointer">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("All") ? `${Cookies.get("All")}` : "0"}</div>
                                            <div className="text-[0.9rem]">Total Queries</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#00629C] text-[white]/90 text-[0.9rem] flex items-center justify-center" >
                                            <div className="pb-1 pr-1">
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="mx-[2rem] " onClick={HandleAssignedQuery}>
                                        <div className="h-[18vh] w-[17.9vw] bg-[#D81B60] text-white py-[0.35rem] px-[0.6rem] cursor-pointer ">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("Assigned") ?? "0"}</div>
                                            <div className="text-[0.9rem]">Assigned Queries</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#B81752] text-[white]/90 text-[0.9rem] flex items-center justify-center " >
                                            <div className="pb-1 pr-1" >
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="mr-[2rem] " onClick={HandleUnAssigned}>
                                        <div className="h-[18vh] w-[17.9vw] bg-[#00A65A] text-white py-[0.35rem] px-[0.6rem] cursor-pointer ">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("unAssigned") ?? "0"}</div>
                                            <div className="text-[0.9rem]">Un Assigned Queries</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#009551] text-[white]/90 text-[0.9rem] flex items-center justify-center " >
                                            <div className="pb-1 pr-1" >
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className=" " onClick={HandleInProgress}>
                                        <div className="h-[18vh] w-[17.9vw] bg-[#0073B7] text-white py-[0.35rem] px-[0.6rem] cursor-pointer">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("inProgress") ? `${Cookies.get("inProgress")}` : "0"}</div>
                                            <div className="text-[0.9rem]">in progress</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#00629C] text-[white]/90 text-[0.9rem] flex items-center justify-center " >
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

                                    <div className="" onClick={HandleCompletedQuery}>
                                        <div className="h-[18vh] w-[17.9vw] bg-[#DD4B39] text-white py-[0.35rem] px-[0.6rem] ">
                                            <div className="font-bold text-[2.375rem]">{Cookies.get("CompleteQuery")}</div>
                                            <div className="text-[0.9rem]">Completed</div>
                                        </div>
                                        <button className="w-[17.9vw] h-[5vh] bg-[#BC4031] text-[white]/90 text-[0.9rem] flex items-center justify-center " >
                                            <div className="pb-1 pr-1" >
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="ml-[2.3vw]" onClick={HandleCreateQuery}>
                                        <div className="h-[11vh] w-[17.9vw] bg-[#F39A12] text-white flex items-center justify-center">
                                            <div className="w-[90%] text-[0.9rem]">
                                                Create Query
                                            </div>
                                        </div>
                                        <div className="w-[17.9vw] h-[5vh] bg-[#CF850F] text-[white]/90 text-[0.9rem] flex items-center justify-center cursor-pointer">
                                            <div className="pb-1 pr-1">
                                                Create Query
                                            </div>
                                            <img src="/src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
            <div id="converse-container">

            </div>
        </>
    )
}
export default Dashboard;