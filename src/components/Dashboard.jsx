import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { replace } from "dom/lib/mutation";
import { useMediaQuery } from "react-responsive";
const Dashboard = () => {
    const isMobile=useMediaQuery({minWidth:786})
    const [profilePopupVisible,setProfilePopupVisible]=useState(false);  
    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."

    const handleSignOut= async ()=>{
        
        try {
            const response=await axios.post("https://chat.roshni.online/api/logout",{},{
                headers:{
                    "Authorization":`Bearer ${Cookies.get("token")}`
                }
                
            })
            if(response.status==200){
                alert(response.data.message)
                const deleteCookies=()=>{
                    const Cookies=document.cookie.split(";");
                    Cookies.map((Cookie)=>{
                        const [name]=Cookie.split("=");
                        document.cookie=`${name.trim()}=; max-age=0 path=/;`                        
                    })    
                }
                deleteCookies();
                navigate("/",{replace:true})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleprofilePopupVisible=()=>{
        if(profilePopupVisible){
            setProfilePopupVisible(false) 
        }   
        else{
            setProfilePopupVisible(true) 
        }    // this is help to toggle the isProfilePopupVisible
    }

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

    const handleProfile=()=>{
        navigate("/userProfile")
    }
    const getTheValue=()=>{
        if(profilePopupVisible){
            setProfilePopupVisible(false)
        }
    }
    return (
        <>

            <div className={`${isMobile?"h-[100vh] w-[100vw] flex bg-[#ECF0F5]":"h-[100vh] w-[100vw] flex"}`} onClick={getTheValue}>
                <aside className="w-[17.969vw] h-[100vh]">
                    <div className="w-[17.969vw] h-[8.547vh] bg-[#367FA9] flex items-center justify-center text-[white]">
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
                        <div className="flex items-center h-[8.547vh] w-[82.031vw] justify-end ">
                            <div className="hover:bg-[#32769e] flex h-[100%] items-center px-2 cursor-pointer" onClick={handleprofilePopupVisible}>
                                <img src="src/assets/user_profile.svg" alt="" className="h-[1.563rem]" />
                                <div className="text-white ml-[0.9vw]">{Cookies.get("name")}</div>
                            </div>
                            <div className={`w-[21.875vw] h-[37.916vh] top-14 right-1 ${profilePopupVisible?"absolute":"hidden"} `} >
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
            <div id="converse-container">

            </div>
        </>
    )
}
export default Dashboard;