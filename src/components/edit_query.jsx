import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";

const Edit_query = () => {
    const location = useLocation();
    const [queryCategory, setQueryCategory] = useState("")
    const [updateQuery, setUpdateQuery] = useState({

        query_title: "",
        category_name: "",
        category_id: "",
        query_type: "",
        status: ""

    })
    const [error, setError] = useState({
        query_title: ""
    })
    const [showInput, setShowInput] = useState(false)
    const [file, setfile] = useState(null)
    const { queryid } = location.state
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUpdateQuery((prev) => ({
            ...prev, [name]: value
        }))
    }


    

    useEffect(() => {
        const fetchapi = async () => {
            const response = await axios.get(`https://chat.roshni.online/api/queries/${Cookies.get("queryid")}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
        
            setQueryCategory(response.data[0].category_name)
            setUpdateQuery((prev) => ({

                ...prev,
                category_id: response.data[0].category_id,
                query_type: response.data[0].query_type,
                status: response.data[0].status,
                category_name: response.data[0].category_name

            }
            ))
        }
        fetchapi();
    }, [])
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setfile(selectedFile)
    }
    useEffect(()=>{
        if(file){
            console.log("you file", file)
        }
    },[file])
    const handleUpdate = async (event) => {
        event.preventDefault();
        const errorform = {};
        
        
        if (updateQuery.query_title.trim() === "") {
            errorform.query_title = "Please enter the Query";
        }
        
        setError(errorform);
        
        
        if (Object.keys(errorform).length > 0) {
            setTimeout(() => {
                setError({ query_title: "" });
            }, 3000);
            return; 
        }
        
        if (file == null) {
            alert("Please select a file first");
            return;
        }
            
        

        

        try {
            const queryResponse = await axios.put(`https://chat.roshni.online/api/queries/${Cookies.get("queryid")}`, updateQuery, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            });
            
            console.log(queryResponse);
         

                console.log("query updated succesfully")
                var formdata = new FormData();
                formdata.append("file", file);
                
                // formdata.append("name",file.name)
                // console.log(formdata)
                for(const [key,value] of formdata.entries()){
                    console.log(value.type)
                    console.log(key,value)
                }
                const attachmentResponse = await axios.post(`https://chat.roshni.online/api/queries/${queryid}/attachments`, formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (attachmentResponse.status === 200) {
                    alert("Attachment uploaded successfully");
                }
            
        } catch (error) {
            console.error("Error updating query or uploading attachment:", error);
        }
    };



    const [inputId, setInputId] = useState([{ id: 1 }])
    const handleAddInput = () => {
        setInputId([...inputId, { id: inputId.length + 1 }])
        setShowInput(true);
    }
    const handleDeleteInput = (id) => {
        setInputId(inputId.filter((input) => (input.id !== id)))
    }
    return (
        <>
            <div className="h-[100vh] w-[100vw] flex bg-[#ECF0F5]">
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh] ">
                        <div className="w-[100%] h-[58.462vh] bg-white flex flex-col items-center">
                            <div className="h-[54.586vh]  w-[79.385vw] border-t-[3px] border-[#3C8DBC] rounded-[3px] ">
                                <div className="text-[1.075rem] w-[78.385vw] h-[7.065vh] ml-[0.8vw] text-[#444444] flex items-center">Create Query</div>
                                <div className="w-[79.385vw] h-[43.761vh] flex flex-col items-center ">
                                    <div className="w-[96%] text-[0.875rem] text-[#333333] font-bold mb-[2vh]">
                                        Query Title
                                        <div className="flex mt-[1vh]">
                                            <div className="h-[5.812vh] w-[3.023vw] border-[1px] border-[#D2D6DE] flex items-center justify-center border-r-transparent">
                                                <img src="/src/assets/help_icon.svg" alt="" />
                                            </div>
                                            <div>

                                                <input type="text" name="query_title" onChange={handleChange} className="bg-[#EEEEEE] w-[73.099vw] h-[5.8vh] font-normal focus:outline-none focus:border-[1px] border-[1px] border-[#D2D6DE] focus:border-[#3C8DBC] px-3" />
                                                <p className="text-[red] font-normal">{error.query_title}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[96%] text-[0.875rem] text-[#333333] font-bold mb-[2vh]">
                                        Category
                                        <div className="flex mt-[1vh]">
                                            <div className="h-[5.812vh] w-[3.023vw] border-[1px] border-[#D2D6DE] flex items-center justify-center border-r-transparent">
                                                <img src="/src/assets/help_icon.svg" alt="" />
                                            </div>
                                            <input type="text" placeholder={queryCategory} disabled className=" dark-placeholder cursor-not-allowed bg-[#EEEEEE] w-[73.099vw] font-normal focus:outline-none focus:border-[1px] border-[1px] border-[#D2D6DE] focus:border-[#3C8DBC] px-3" />
                                        </div>
                                    </div>
                                    <div className="w-[96%] font-bold text-[#333333] text-[0.75rem] ">
                                        Attachment pdf,png,jpg,jpeg,video
                                        <div className="font-normal flex mt-[1vh]">
                                            <div>
                                                <div className="flex">
                                                    <input type="file" name="file" onChange={handleFileChange} accept=".jpeg, .jpg, .gif, .svg, .pdf, .quicktime, .mp4, .mp3, .mpeg, .mpeg3, .x-mpeg-3, .x-hx-aac-adts" className="w-[65.76vw] py-1 px-3  border-[1px] " />
                                                    <button className="bg-[#00A65A] text-[white] h-[5.692vh] w-[10.437vw] flex items-center justify-center rounded-r-[2px] text-[0.875rem]" onClick={handleAddInput}><div className="font-bold text-[1.5rem] mb-1">+</div>Add Attachment</button>
                                                </div>
                                                {
                                                    // console.log("hello")
                                                    inputId.map((input) => {
                                                        if (input.id != 1) {
                                                            return (

                                                                <div key={input.id} className="flex">
                                                                    <input
                                                                        type="file"
                                                                        accept=".jpeg, .jpg, .gif, .svg, .pdf, .quicktime, .mp4, .mp3, .mpeg, .mpeg3, .x-mpeg-3, .x-hx-aac-adts"
                                                                        className="w-[68.76vw] py-1 px-3  border-[1px] "
                                                                    />
                                                                    <button className="bg-[#D73925] text-[white] h-[5.692vh] w-[7.437vw] flex items-center justify-center rounded-r-[2px]" onClick={() => handleDeleteInput(input.id)}><div className="font-bold text-[1.5rem] mb-1 rotate-45">+</div>Remove</button>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[79.385vw] flex justify-end">
                                    <button className="flex items-center justify-center bg-[#3C8DBC] text-[white] rounded-[2px] w-[6.645vw] h-[5.692vh]" onClick={handleUpdate}><div className="font-extrabold text-[1.5rem] ">+</div>update</button>
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
export default Edit_query;