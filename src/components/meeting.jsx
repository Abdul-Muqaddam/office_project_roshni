import React, { useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
import { replace } from "dom/lib/mutation";
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
                const keys=  Object.keys(error.response.data)
                const errorKey=('error',keys)
                console.log(error.response.data)
                const status=error.status
                if(status==403 || errorKey){
                    navigate("/assignedqueries", {replace:true})
                    alert("Client haven't accept the query")
                }
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
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    
                    <div className="flex flex-col justify-between h-[100.846vh]">
                        
                            <div className="w-[79.688vw] h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px] flex justify-end ">   
                                <div id="jitsi-container" className="h-[90vh] w-[100%] overflow-hidden" />
                            </div>
                        
                        <Footer/>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Meeting