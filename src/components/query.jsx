import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Feedback from "./feedback";
const Query = () => {
    const navigate = useNavigate();
    // const userInfo=useSelector((state)=>state.user.userInfo)
    const location = useLocation()
    const [queries, setQueries] = useState("")
    const [filterQueries, setfilterQueries] = useState("")
    const [error, setError] = useState(false)

    const [profilePopupVisible, setProfilePopupVisible] = useState(false);
    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."


    const handleprofilePopupVisible = () => {
        if (profilePopupVisible) {
            setProfilePopupVisible(false)
        }
        else {
            setProfilePopupVisible(true)
        }    // this is help to toggle the isProfilePopupVisible
    }
    const getTheValue = () => {
        if (profilePopupVisible) {
            setProfilePopupVisible(false)    // close the isProfilePopupVisible whereever userClick
        }
    }
    const handleProfile = () => {
        navigate("/userProfile")
    }

    const handleSignOut = async () => {

        try {
            const response = await axios.post("https://chat.roshni.online/api/logout", {}, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.status == 200) {
                alert(response.data.message)
                navigate("/");

            }
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        const fetchQuries = async () => {

            try {
                const response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                setQueries(response.data)
                console.log(response.data)
            } catch (error) {
                setError(true)
                console.log(error)
            }
        }
        fetchQuries();
    }, [location.pathname])

    useEffect(() => {
        const fetchapi = () => {
            setfilterQueries(queries)
        }
        fetchapi();
    }, [queries])
    const handleChange = (event) => {
        const newData = queries.filter(row => {
            return row.category.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setfilterQueries(newData)
    }
    const handleEditButton = (query) => {
        navigate("/editquery", { state: { query } })
    }
    const handleJobGallaryButton = () => {
        navigate("/jobGallary")
    }
    const handleFeedback=()=>{
        navigate("/feedback")
    }
    const handleDeleteButton = async (query) => {
        if (confirm("Are you sure you want to delete this query?")) {
            try {
                const response = await axios.delete(`https://chat.roshni.online/api/queries/${query}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                })
                alert("Query has Been deleted")
            } catch (error) {
                alert("We cannot delete this query")
                console.error(error)
            }

        }
        else {

        }
    }
    const columns = [
        {
            name: "Category",
            selector: state => state.category,
            sortable: true
        },
        {
            name: "Status",
            selector: state => state.status,
            sortable: true
        },
        {
            name: "Professional",
            selector: state => state.professional,
            sortable: true
        },
        {
            name: "Description",
            selector: state => state.description,
            sortable: true
        },
        {
            name: "Action",
            selector: state => {
                if(state.status=="inprogress"){
                    return (
                        <div className="flex w-[20vw] justify-between">
                        <button onClick={() => handleEditButton(state.query_id)} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/edit.svg" alt="" title="Edit" className=" w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button onClick={handleJobGallaryButton} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/img.svg" alt="" title="Edit" className=" w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button title="Chat" className="flex items-center justify-center rounded-[3px] text-[white] w-[4.375rem] h-[2.125rem] bg-[#00A65A]">
                            <img src="/src/assets/chat.svg" alt="Chat" className="w-[0.875rem] h-[1.063rem]" /> Chat
                        </button>

                        <button title="Start Video Call" className="bg-[#00A65A] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/call.svg" alt="Call" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button title="FeedBack" onClick={handleFeedback} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/feedback.svg" alt="Feedback" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                    </div>
                )
            }
            if(state.status=="assigned"){
                return(
                    <div className="flex w-[23vw] justify-between">
                        <button onClick={() => handleEditButton(state.query_id)} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/edit.svg" alt="" title="Edit" className=" w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button onClick={handleJobGallaryButton} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/img.svg" alt="" title="Edit" className=" w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button title="Chat" className="flex items-center justify-center rounded-[3px] text-[white] w-[4.375rem] h-[2.125rem] bg-[#00A65A]">
                            <img src="/src/assets/chat.svg" alt="Chat" className="w-[0.875rem] h-[1.063rem]" /> Chat
                        </button>
                        <button onClick={() => handleDeleteButton(state.query_id)} className="bg-[#DD4B39] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/delete.svg" alt="" title="Edit" className=" w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button title="Start Video Call" className="bg-[#00A65A] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/call.svg" alt="Call" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button title="FeedBack" onClick={handleFeedback} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/feedback.svg" alt="Feedback" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                    </div>
                )
            }
            if(state.status=="completed"){
                return(
                    <div className="flex w-[6.7vw] justify-between">
                        <button onClick={handleJobGallaryButton} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/img.svg" alt="" title="Edit" className=" w-[0.875rem] h-[1.063rem]" />
                        </button>                        
                        <button title="FeedBack" onClick={handleFeedback} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/feedback.svg" alt="Feedback" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                    </div>
                )
            }
            },
            grow: 3,
        }
    ]
    return (
        <>
            <div className="h-[100vh] w-[100vw] flex bg-[#ECF0F5]" onClick={getTheValue}>
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
                        <div className="flex items-center h-[8.547vh] w-[82.031vw] justify-end" >
                            <div className="cursor-pointer flex hover:bg-[#2f7096] h-[100%] items-center px-2" onClick={handleprofilePopupVisible}>
                                <img src="src/assets/user_profile.svg" alt="" className="h-[1.563rem]" />
                                <div className="text-white ml-[0.9vw]">{Cookies.get("name")}</div>
                            </div>
                        </div>
                        <div className={`w-[21.875vw] h-[37.916vh] top-14 right-1 ${profilePopupVisible ? "absolute" : "hidden"} z-10`} >
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
                        <div className="bg-[white] h-[60.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20 ">
                            <div className="w-[98%] flex flex-col border-t-2 border-blue-500 ">
                                <div className="p-3 text-[black]/80 text-[1.1rem]">clients Jobs</div>
                                <div className="flex justify-end items-center">

                                    <div className="text-black/80 text-[0.9rem]">Search: <input type="text" className="border-[1px] border-black/30 rounded-[3px] h-[1.875rem] w-[9.688rem] text-[0.8rem] px-2 focus:outline-none " onChange={handleChange} /></div>
                                </div>
                                <DataTable data={filterQueries} columns={columns} pagination paginationPerPage={3} noDataComponent={error ? `There are no data to display` : `Loading...`} ></DataTable>
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
export default Query;