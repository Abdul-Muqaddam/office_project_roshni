import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
import { useMediaQuery } from "react-responsive";
import { ProfilePopupVisbleContext } from "./context/categoryContext";
const Query = () => {
    const {profilePopupVisible,setProfilePopupVisible}=useContext(ProfilePopupVisbleContext)
    const navigate = useNavigate();
    // const userInfo=useSelector((state)=>state.user.userInfo)
    const location = useLocation()
    const [queries, setQueries] = useState("")
    const [filterQueries, setfilterQueries] = useState("")
    const [error, setError] = useState(false)

    const is765px=useMediaQuery({minWidth:765})
    const isFlex=is765px?"flex":"";
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
                        <div className="flex w-[310px] justify-between">
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
                    <div className="flex w-[290px] justify-between">
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
                    <div className="flex w-[90.4px] justify-between">
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
            <div className={` w-[100vw] ${isFlex} bg-[#ECF0F5]`} onClick={getTheValue}>
                <AsideComponent/>
                <div className=" h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    
                        <ClientSectionMainHeader/>
                    
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white]   border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20 ">
                            <div className="w-[98%] flex flex-col border-t-2 border-blue-500 ">
                                <div className="p-3 text-[black]/80 text-[1.1rem]">clients Jobs</div>
                                <div className="flex justify-end items-center">

                                    <div className="text-black/80 text-[0.9rem]">Search: <input type="text" className="border-[1px] border-black/30 rounded-[3px] h-[1.875rem] w-[9.688rem] text-[0.8rem] px-2 focus:outline-none " onChange={handleChange} /></div>
                                </div>
                                <DataTable data={filterQueries} columns={columns} pagination paginationPerPage={3} noDataComponent={error ? `There are no data to display` : `Loading...`} ></DataTable>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Query;