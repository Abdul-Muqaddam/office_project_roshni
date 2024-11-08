import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const Chat_converse=()=>{
    // const [boshURL,setBoshURL]=useState("");
    // const [jid,setJid]=useState("")
    // const [password,setPassword]=useState("")
    useEffect(()=>{
        const fetchapi=async ()=>{
            const chatobj={
                client_id:Cookies.get("clientid"),
                query_id:Cookies.get("queryid"),
                professional_id:Cookies.get("professional_id")
            }
            const response=await axios.post("https://chat.roshni.online/api/chat/start",chatobj,{
                headers:{
                 "Authorization":`Bearer ${Cookies.get("token")}`   
                }
            })
            // console.log(response.data.jid)
            // setBoshURL(response.data.boshUrl)
            console.log(response)
            Cookies.set("boshURL",response.data.boshUrl,{expires:7})
            Cookies.set("jid",response.data.jid,{expires:7})
            Cookies.set("password",response.data.password,{expires:7})
            Cookies.set("autoJoin",response.data.autoJoin)
            console.log(Cookies.get())
            console.log(Cookies.get("boshURL"))
            console.log(Cookies.get("jid"))
            console.log(Cookies.get("password"))
            // setJid(response.data.jid)
            // setPassword(response.data.password)
            // console.log(password)
            // console.log(jid)
            // console.log(boshURL)
            
            const autojoin=Cookies.get("autoJoin")
            const autojoinnew=autojoin?autojoin.split(","):[];

            window.converse.initialize({
                auto_join_private_chats: [autojoinnew],
                bosh_service_url:`${Cookies.get("boshURL")}`,
                jid:`${Cookies.get("jid")}`,
                password:`${Cookies.get("password")}`,
                auto_login:true,
                debug:true,
                allow_contact_requests:true,
                show_desktop_notification:true,
                allow_non_roster_messaging:true,
                keepalive:true,
                // view_mode: 'fullscreen',
            })
        }
        fetchapi();
        

        return ()=>{
            window.converse.destroy();
        }
    },[])
    
    return(
        <>
        <div id="converse-container" className="h-[100vh] w-[100vw]">

        </div>
        </>
    )
}
export default Chat_converse