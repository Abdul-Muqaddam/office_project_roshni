import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { categoryContext } from "./context/categoryContext";

const Edit_query = () => {
    const location = useLocation();
    const { name }=useContext(categoryContext)
    const { token } = useContext(categoryContext)
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
            const response = await axios.get(`https://chat.roshni.online/api/queries/${queryid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
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
            const queryResponse = await axios.put(`https://chat.roshni.online/api/queries/${queryid}`, updateQuery, {
                headers: {
                    "Authorization": `Bearer ${token}`
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
                                    <div className="text-[0.875rem] font-semibold">{name}</div>
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
                            <div className="text-white ml-[0.9vw]">{name}</div>
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
export default Edit_query;