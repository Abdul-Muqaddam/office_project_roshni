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
import { ProfilePopupVisbleContext } from "./context/categoryContext";
const Dashboard = () => {

    const {profilePopupVisible,setProfilePopupVisible}=useContext(ProfilePopupVisbleContext)

    const is765px = useMediaQuery({ minWidth: 765 })
    
    const is375px=useMediaQuery({maxWidth:375})

    const isSizeCardUnderText=is375px?"text-[3.6vw]":"text-[0.9rem]"


    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."


    const is1200px = useMediaQuery({ minWidth: 1200 })

    const isFlex = is1200px ? "flex" : "";
    
    const isFlexCardContent=is765px?"":"flex flex-col justify-center items-center"

    const isTextSize=is765px?"text-[2.375rem]":"text-[5.17vw]"
    
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
            try {
                // const chatobj = {
                //     client_id: Cookies.get("clientid"),
                //     query_id: Cookies.get("queryid"),
                //     professional_id: Cookies.get("professional_id")
                // }
                // const response = await axios.post("https://chat.roshni.online/api/chat/start", chatobj, {
                //     headers: {
                //         "Authorization": `Bearer ${Cookies.get("token")}`
                //     }
                // })
                // // console.log(response.data.jid)
                // // setBoshURL(response.data.boshUrl)
                // console.log(response)
                // Cookies.set("boshURL", response.data.boshUrl, { expires: 7 })
                // Cookies.set("jid", response.data.jid, { expires: 7 })
                // Cookies.set("password", response.data.password, { expires: 7 })
                // Cookies.set("autoJoin", response.data.autoJoin)
                // console.log(Cookies.get())
                // console.log(Cookies.get("boshURL"))
                // console.log(Cookies.get("jid"))
                // console.log(Cookies.get("password"))
                // setJid(response.data.jid)
                // setPassword(response.data.password)
                // console.log(password)
                // console.log(jid)
                // console.log(boshURL)
    
                const autojoin = Cookies.get("autoJoin")
                const autojoinnew = autojoin ? autojoin.split(",") : [];

                window.converse.initialize({
                    // auto_join_private_chats: [autojoinnew],
                    bosh_service_url: `${Cookies.get("boshUrl")}`,
                    jid:Cookies.get("jid"), 
                    // `${Cookies.get("jid")}`,
                    password:Cookies.get("password"),
                    //  `${Cookies.get("password")}`,
                    auto_login: true,
                    debug: true,
                    allow_contact_requests: true,
                    show_desktop_notification: true,
                    allow_non_roster_messaging: true,
                    keepalive: true,
                    // view_mode: 'fullscreen',
                })
            } catch (error) {
                const status=error.status
                if(status==403 || errorKey){
                    alert("Client haven't accept the query")
                }
            }
        }
        fetchapi();



    }, [])
    useEffect(() => {
        const fetchAssignedQuery = async () => {
            try {
                let response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/assigned/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                }

                )
                // console.log(response.data.length)
                console.log(response.data)
                Cookies.set("Assigned", response.data.length, { expires: 7 })

            } catch (error) {
                console.log(error)
            }
        }
        fetchAssignedQuery();







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
                Cookies.set("inProgress", response.data.length, { expires: 7 })

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


    const getTheValue = () => {
        if (profilePopupVisible) {
            setProfilePopupVisible(false)
        }
    }
    return (
        <>

            <div className={`${is765px ? " w-[100%] flex bg-[#ECF0F5]" : " w-[100%] "}`} onClick={getTheValue}>
                <AsideComponent />
                <div className="  bg-[#ECF0F5]">
                    <Navbar  />
                    <ClientSectionMainHeader />

                    <div className={`flex flex-col justify-between  ${is1200px?"h-[81.846vh]":""} `}>
                        <div className={` ${is1200px?"w-[96%]":"w-[100%]"} ml-[1vw]`}>
                            <div className=" ">
                                <div className={`flex ${is765px?"":"justify-between"} `}>
                                    <div className={`${isFlex} `}>
                                        <div onClick={Handlequery} className={`${is1200px?"":"w-[40vw]"} ${is765px?"":"w-[100vw]"} `}>

                                            <div className={`h-[18vh]  ${is1200px?"w-[17.9vw]":"w-[35.9vw]"} ${is765px?"":"w-[40.9vw]"} ${isFlexCardContent} bg-[#0073B7] text-white py-[0.35rem] px-[0.6rem] cursor-pointer`}>
                                                <div className={`font-bold ${isTextSize}`}>{Cookies.get("All") ? `${Cookies.get("All")}` : "0"}</div>
                                                <div className="text-[0.9rem]">Total Queries</div>
                                            </div>
                                            <button className={`${is1200px?"w-[17.9vw]":"w-[35.9vw]"} ${is765px?"":"w-[40.9vw]"} h-[5vh] bg-[#00629C] text-[white]/90 text-[0.9rem] flex items-center justify-center`} >
                                                <div className="pb-1 pr-1">
                                                    More info
                                                </div>
                                                <div>
                                                    <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                                </div>
                                            </button>
                                        </div>
                                        <div className={`${is1200px?"mx-[2rem]":""} ${is1200px?"":"mt-[3.5vh]"} `} onClick={HandleAssignedQuery}>
                                            <div className={`h-[18vh] ${is1200px?"w-[17.9vw]":"w-[35.9vw]"} ${is765px?"":"w-[40.9vw]"} ${isFlexCardContent} bg-[#D81B60] text-white py-[0.35rem] px-[0.6rem] cursor-pointer `}>
                                                <div className={`font-bold ${isTextSize}`}>{Cookies.get("Assigned") ? Cookies.get("Assigned"):"0"}</div>
                                                <div className={`${isSizeCardUnderText}`}>Assigned Queries</div>
                                            </div>
                                            <button className={`${is1200px?"w-[17.9vw]":"w-[35.9vw]"} ${is765px?"":"w-[40.9vw]"} h-[5vh] bg-[#B81752] text-[white]/90 text-[0.9rem] flex items-center justify-center `} >
                                                <div className="pb-1 pr-1" >
                                                    More info
                                                </div>
                                                <div>
                                                    <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`${isFlex}`}>
                                        <div className="mr-[2rem] " onClick={HandleUnAssigned}>
                                            <div className={`h-[18vh] ${is1200px?"w-[17.9vw]":"w-[35.9vw]"} ${is765px?"":"w-[40.9vw]"} ${isFlexCardContent} bg-[#00A65A] text-white py-[0.35rem] px-[0.6rem] cursor-pointer `}>
                                                <div className={`font-bold ${isTextSize}`}>{Cookies.get("unAssigned") ?? "0"}</div>
                                                <div className={`${isSizeCardUnderText}`}>Un Assigned Queries</div>
                                            </div>
                                            <button className={`${is1200px?"w-[17.9vw]":"w-[35.9vw]"} h-[5vh] ${is765px?"":"w-[40.9vw]"} bg-[#009551] text-[white]/90 text-[0.9rem] flex items-center justify-center `}>
                                                <div className="pb-1 pr-1" >
                                                    More info
                                                </div>
                                                <div>
                                                    <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                                </div>
                                            </button>
                                        </div>
                                        <div className={`${is1200px?"":"mt-[3.5vh]"}`} onClick={HandleInProgress}>
                                            <div className={`h-[18vh] ${is1200px?"w-[17.9vw]":"w-[35.9vw]"} ${is765px?"":"w-[40.9vw]"} ${isFlexCardContent} bg-[#0073B7] text-white py-[0.35rem] px-[0.6rem] cursor-pointer`}>
                                                <div className={`font-bold ${isTextSize}`}>{Cookies.get("inProgress") ? `${Cookies.get("inProgress")}` : "0"}</div>
                                                <div className="text-[0.9rem]">in progress</div>
                                            </div>
                                            <button className={`${is1200px?"w-[17.9vw]":"w-[35.9vw]"} h-[5vh] ${is765px?"":"w-[40.9vw]"} bg-[#00629C] text-[white]/90 text-[0.9rem] flex items-center justify-center `} >
                                                <div className="pb-1 pr-1" >
                                                    More info
                                                </div>
                                                <div>
                                                    <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`flex mt-[3.5vh] ${is1200px?"":"w-[76vw]"} ${is1200px?" ":"justify-between"} ${is765px?"":"w-[95.5vw]"} ${is375px?"w-[90.5vw]":""}`}>

                                    <div className={``} onClick={HandleCompletedQuery}>
                                        <div className={`h-[18vh] ${is1200px?"w-[17.9vw]":"w-[35.9vw]"} ${isTextSize} ${is765px?"":"w-[40.9vw]"} ${isFlexCardContent} bg-[#DD4B39] text-white py-[0.35rem] px-[0.6rem] `}>
                                            <div className={`font-bold  `}>{Cookies.get("CompleteQuery")}</div>
                                            <div className="text-[0.9rem]">Completed</div>
                                        </div>
                                        <button className={`${is1200px?"w-[17.9vw]":"w-[35.9vw]"} h-[5vh] ${is765px?"":"w-[40.9vw]"} bg-[#BC4031] text-[white]/90 text-[0.9rem] flex items-center justify-center `} >
                                            <div className="pb-1 pr-1" >
                                                More info
                                            </div>
                                            <div>
                                                <img src="src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className={`${is1200px?"ml-[2.5vw]":""}`} onClick={HandleCreateQuery}>
                                        <div className={`h-[11vh] ${is1200px?"w-[17.9vw]":"w-[35.9vw]"}   ${is765px?"":"w-[40.9vw]"} ${isFlexCardContent} bg-[#F39A12] text-white flex items-center justify-center`}>
                                            <div className="w-[90%] text-[0.9rem]">
                                                Create Query
                                            </div>
                                        </div>
                                        <div className={`${is1200px?"w-[17.9vw]":"w-[35.9vw]"}  ${is765px?"":"w-[40.9vw]"} h-[5vh] bg-[#CF850F] text-[white]/90 text-[0.9rem] flex items-center justify-center cursor-pointer`}>
                                            <div className="pb-1 pr-1">
                                                Create Query
                                            </div>
                                            <img src="/src/assets/right-icon.png" alt="" className="h-[1rem]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default Dashboard;