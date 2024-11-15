import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
import { useMediaQuery } from "react-responsive";
import { ProfilePopupVisbleContext } from "./context/categoryContext";

const Assigned_queries = () => {
    const {profilePopupVisible,setProfilePopupVisible}=useContext(ProfilePopupVisbleContext)
    const navigate = useNavigate();
    const [queries, setQueries] = useState([])
    const [filterQueries, setFilterQueries] = useState([])
    const location = useLocation()
    const [error, setError] = useState(false)
    const is765px = useMediaQuery({ minWidth: 765 })
    const isFlex = is765px ? "flex" : "";
    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."

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
    const handleClick = (queryid) => {
        navigate("/editquery", { state: { queryid } })
    }
    const HandleMeetingClick = (roomName, query_Id, professional_id) => {
        console.log(query_Id)
        console.log(professional_id)
        Cookies.set("professional_id", professional_id, { expires: 7 })
        Cookies.set("roomname",roomName , { expires: 7 })
        Cookies.set("queryid", query_Id, { expires: 7 })
        navigate("/meeting")
    }
    useEffect(() => {
        const fetchapi = async () => {
            try {
                const response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/assigned/queries`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                // Cookies.set("roomname",response.data[1].roomName,{expires:7})
                console.log(response.data)
                setQueries(response.data)

            }
            catch (error) {
                setError(true)
                console.log(error)
            }
        }
        fetchapi()
        return () => {

        }
    }, [location.pathname])
    useEffect(() => {
        setFilterQueries(queries)
    }, [queries])

    const HandleChatClick = async () => {
        navigate("/chat_converse")
    }
    const handleJobGalleryButton = () => {
        navigate("/jobGallary")
    }
    const handleDeleteButton = async (query) => {
        if (confirm("Are you sure you want to delete this query?")) {
            try {
                const response = await axios.delete(`https://chat.roshni.online/api/queries/${query}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                })
                if (response.status == 200) {
                    alert("Query has been succesfully deleted")
                    window.location.reload();
                }
            } catch (error) {

                alert("We cannot delete this query catch")
                console.error(error)
            }

        }
        else {

        }
    }
    // const columns=[
    //     {
    //         name:"Category",
    //         selector:"name",
    //         sortable:true
    //     },
    //     {
    //         name:"Status",
    //         selector:"status",
    //         sortable:true
    //     },
    //     {
    //         name:"Professional",
    //         selector:"professionals",
    //         sortable:true,
    //     }
    // ]
    var i = 0;
    const columns = [
        {
            name: "Category",
            selector: state => state.name,
            sortable: true,
            searchable: true
        },
        {
            name: "Status",
            selector: state => state.status,
        },
        {
            name: "Professional",
            selector: state => state.professional
        },
        {
            name: "Description",
            selector: state => state.description,
            shortable: true
        },
        {
            name: "Action",
            selector: state => {
                const commanButton = (
                    <>

                        <button title="Edit" onClick={() => handleClick(state.query_id)} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px] ">
                            <img src="/src/assets/edit.svg" alt="Edit" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button onClick={() => { handleDeleteButton(state.query_id); console.log(state.query_id) }} title="Delete" className="bg-[#DD4B39] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/delete.svg" alt="Delete" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button onClick={handleJobGalleryButton} title="Edit" className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/img.svg" alt="Image" className="w-[0.875rem] h-[1.063rem]" />
                        </button>

                    </>
                )

                const action = [];

                if (state.roomName == null) {
                    action.push(
                        <div key={`action-null-${i}`} className="flex w-[10.1vw] justify-between">
                            {commanButton}
                        </div >
                    );
                } else {

                    action.push(
                        <div key={`action-${i}`} className="flex w-[310px] justify-between">
                            {commanButton}
                            <button title="Chat" className="flex items-center justify-center rounded-[3px] text-[white] w-[4.375rem] h-[2.125rem] bg-[#00A65A]" onClick={HandleChatClick}>
                                <img src="/src/assets/chat.svg" alt="Chat" className="w-[0.875rem] h-[1.063rem]" /> Chat
                            </button>
                            <button title="Start Video Call" className="bg-[#00A65A] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]" onClick={() => HandleMeetingClick(state.roomName, state.query_id, state.professional_id)}>
                                <img src="/src/assets/call.svg" alt="Call" className="w-[0.875rem] h-[1.063rem]" />
                            </button>
                            <button title="FeedBack" className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                                <img src="/src/assets/feedback.svg" alt="Feedback" className="w-[0.875rem] h-[1.063rem]" />
                            </button>
                        </div>
                    );
                }

                return action


                // .forEach(element => {

                // });;
            },
            grow: 3
        }

    ]


    function handleSearch(event) {
        var newQueries = queries.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFilterQueries(newQueries)
    }
    // const data=[
    //     {
    //         name:"Arif",
    //         email:"ari@gmail.com"
    //     },
    //     {
    //         name:"Abdul",
    //         email:"Abdullah@gmail.com"
    //     }
    // ]

    try {

    } catch (error) {

    }
    return (
        <>
            {/* <button onClick={handlegetquery}>click me!</button> */}
            <div className={`h-[100vh] w-[100vw] ${isFlex} bg-[#ECF0F5]`} onClick={getTheValue}>
                <AsideComponent />
                <div className=" h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar />
                    <ClientSectionMainHeader />
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white]  border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20 ">
                            <div className="w-[98%] flex flex-col border-t-2 border-blue-500 ">
                                <div className="p-3 text-[black]/80 text-[1.1rem]">clients Jobs</div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center ">
                                        {/* <div className="text-black/80 text-[0.9rem] pr-1 pb-1">Show</div>
                                        <div className="flex text-black/80 text-[0.7rem] items-center justify-between border-[1px] border-[black]/30 w-[4.688rem] h-[1.875rem] pl-4">10 <div className="rotate-90 text-[1rem]">&gt;</div></div>
                                        <div className="text-black/80 text-[0.9rem] pb-1 pl-1">entries</div> */}
                                    </div>
                                    <div className="text-black/80 text-[0.9rem]">Search: <input type="text" onChange={handleSearch} className="border-[1px] border-black/30 rounded-[3px] h-[1.875rem] w-[9.688rem] text-[0.8rem] px-2 focus:outline-none " /></div>
                                </div>
                                <DataTable data={filterQueries} columns={columns} pagination paginationPerPage={3} noDataComponent={error ? "There are no data to display" : "Loading..."}>

                                </DataTable>

                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Assigned_queries;