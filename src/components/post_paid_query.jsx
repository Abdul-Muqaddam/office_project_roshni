import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";

const Post_paid_query = () => {

    // const { name } = useContext(categoryContext)
    // const { queryData } = useContext(categoryContext)
    // const { token } = useContext(categoryContext)
    // const { clientId } = useContext(categoryContext)
    // const [answer,setAnswer]=useState("")
    // const [data,setData]=useState({
    //     "client_id":clientId,
    //     "response_type":"string",
    //     "description":"",
    //     "limit":5
    // })
    // const handleClick=async()=>{

    //     try {
    //         const response=await axios.post("https://chat.roshni.online/api/client/free/query",data,{
    //             headers:{
    //                 "Authorization":`Bearer ${token}`
    //             }
    //         })
    //         setAnswer(response.data.answer)
    //         console.log()
    //         if(response.data.answer.new_limit==0){
    //             alert("you have used your all Credit")
    //         }

    //     } catch (error) {
    //         if(error.status==403){
    //             alert("You have used your 5 Credit")
    //         }
    //     }
    // }
    // const handleChange=(e)=>{
    //     const value=e.target.value
    //     const name=e.target.name
    //     setData((prev)=>({
    //         ...prev,
    //          [name]:value
    //         }))
    // }
    return (
        <>
            <div className="h-[100vh] w-[100vw] flex bg-[#ECF0F5]">
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white] h-[65.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className="w-[79.688vw] h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]">
                                <div className="ml-[0.6vw] text-[1.1rem] text-[black]/80 my-[0.5vh]">Create Query</div>
                                <div className="flex justify-center flex-col">
                                    <div className="flex">
                                        <div className="w-[40vw]">

                                        <div className="font-bold text-[0.85rem] ml-[1vw] my-[1vh] text-[black]/80">
                                            Professional Name
                                        </div>
                                        <div className="flex justify-center">
                                            <img src="/src/assets/icon.svg" className="border-[0.5px] border-[#555555] border-r-transparent px-2 py-2 " alt="" />
                                            <input type="text" className="border-[0.5px] border-[#555555] focus:border-[0.5px] focus:border-blue-600 outline-none transition-all duration-300 ease-in-out w-[35vw]  px-4"  disabled />
                                        </div>
                                        </div>
                                        <div className="w-[40vw]">

                                        <div className="font-bold text-[0.8rem] ml-[1vw] my-[1vh] text-[black]/80">
                                            Phone Number
                                        </div>
                                        <div className="flex justify-center">
                                            <img src="/src/assets/icon.svg" className="border-[0.5px] border-[#555555] border-r-transparent px-2 py-2 " alt="" />
                                            <input type="text" className="py-2 text-[0.8rem] border-[0.5px] border-[#555555] focus:border-[0.5px] focus:border-blue-600 outline-none transition-all duration-300 ease-in-out w-[35vw] px-4"  name="description" />
                                        </div>
                                        </div>
                                        <div></div>
                                    </div>
                                        <div className="flex justify-end w-[78.5vw] mt-2">
                                            <button className="flex items-center text-white bg-[#3C8DBC] pl-2 pr-4 rounded-sm">
                                                <div className="font-bold text-[1.5rem] pb-1">+</div>
                                                Submit
                                            </button>
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
export default Post_paid_query;