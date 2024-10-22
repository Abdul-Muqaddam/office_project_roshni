import React, { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Meeting = () => {
    const navigate=useNavigate()
    const [roomName, setRoomName] = useState("")
    const [domain, setDomain] = useState()
    useEffect(() => {
        // console.log(Cookies.get("roomname"))
        const fetchapi = async () => {
            try {
                const response = await axios.get(`https://chat.roshni.online/api/start/meeting/${Cookies.get("roomname")}`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                setRoomName(Cookies.get("roomname"))
                setDomain(response.data.VideoServerUrl)
                console.log(response.data.VideoServerUrl)
            } catch (error) {

            }

        }

        fetchapi()

        console.log(Cookies.get())
        const domain="meet.omni.ict.vision"
        const option={
                roomName:Cookies.get("roomname"),
                parentNode:document.getElementById("jitsi-container"),
                configOverwrite :{
                    startWithAudioMuted: true,
                    disableModeratorIndicator: true,
                    startScreenSharing: true,
                    enableEmailInStats: false,
                    prejoinPageEnabled:false
                },
                interfaceConfigOverwrite :{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    TOOLBAR_BUTTONS: [
                        'microphone',
                        'camera',
                        'hangup',
                        'fullscreen',
                        'stats',
                        'tileview',
                        'toggle-camera',
                        'chat',
                    ],
                    TILE_VIEW_MAX_COLUMNS: 2
                },
                userInfo :{
                    displayName: Cookies.get("name")
                    
                },
                
            }
            const api=new window.JitsiMeetExternalAPI(domain,option)
            
            const removeSession=async ()=>{
                const response1=await axios.post("https://chat.roshni.online/api/user/end/sessions",{
                    client_id:Cookies.get("clientid") ,
                },{
                    headers:{
                        "Authorization":`Bearer ${Cookies.get("token")}`
                    }
                })
                console.log(response1.data);
            }
            removeSession();
            
            const HandleParticipentUpdate= async ()=>{
                try {

                    const participent=api.getNumberOfParticipants();
                    if(participent==2){
                        clearInterval(participentChecktInterval)
                            
                                const response=await axios.post("https://chat.roshni.online/api/start/session",{
                                    query_id:Cookies.get("queryid"),
                                    roomName:`${Cookies.get("roomname")}`
                                },{
                                    headers:{
                                        "Authorization":`Bearer ${Cookies.get("token")}`
                                    }
                                })
                                Cookies.set("sessionid",response.data.session_id,{expires:7})
                                console.log(Cookies.get("sessionid"))
                                Cookies.set("sessionTime",response.data.sessionTime,{expires:7})
                                setInterval(async ()=>{
                                    const response=await axios.get(`https://chat.roshni.online/api/check/balance/${Cookies.get("sessionid")}`,{
                                        headers:{
                                            "Authorization":`Bearer ${Cookies.get("token")}`
                                        }
                                    })
                                    if(response.data.message==true){

                                    }
                                    else{
                                         const response1=await axios.post("https://chat.roshni.online/api/user/end/sessions",{
                                             client_id:Cookies.get("clientid") ,
                                             professional_id:Cookies.get("professional_id"),
                                         },{
                                             headers:{
                                                 "Authorization":`Bearer ${Cookies.get("token")}`
                                             }
                                         })
                                         if(response1.status==200){
                                            alert("Insufficent Balance")
                                            navigate("/dashboard")
                                         }
                                         else{
                                            alert("There is some problem")
                                         }
                                    }
                                },Cookies.get("sessionTime"))

                                // console.log(response.data)
                    }
                } catch (error) {
                    alert(error)
                }
            }

            const participentChecktInterval=setInterval(HandleParticipentUpdate,1000)
            // api.addEventListener("participentJoined",HandleParticipentUpdate)
            console.log(Cookies.get("professional_id"))
            console.log(Cookies.get("token"))
            console.log(Cookies.get("roomname"))
            console.log(Cookies.get("queryid"))
    },[])
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
                    <div className="w-[17.969vw] h-[110.453vh] bg-[#222D32]">
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
                    <div className="flex flex-col justify-between h-[100.846vh]">
                        
                            <div className="w-[79.688vw] h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px] flex justify-end ">   
                                <div id="jitsi-container" className="h-[90vh] w-[100%] overflow-hidden" />
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
export default Meeting