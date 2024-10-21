import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Assigned_queries = () => {
    const navigate=useNavigate();
    const [queries, setQueries] = useState([])
    const [filterQueries, setFilterQueries] = useState([])
    const location = useLocation()
    const handleClick = (queryid) => {
        navigate("/editquery",{state:{queryid}})
    }
    const HandleMeetingClick=(roomName,query_Id,professional_id)=>{
        console.log(query_Id)
        console.log(professional_id)
        Cookies.set("professional_id",professional_id,{expires:7})
        Cookies.set(roomName,"roomname",{expires:7})
        Cookies.set("queryid",query_Id,{expires:7})
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
                Cookies.set("roomname",response.data[1].roomName,{expires:7})
                console.log(response.data)
                setQueries(response.data)
                
            }
            catch (error) {
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
            selector: state => state.professionals
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

                        <button title="Edit" onClick={()=> handleClick(state.query_id)} className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/edit.svg" alt="Edit" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button title="Delete" className="bg-[#DD4B39] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/delete.svg" alt="Delete" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                        <button title="Edit" className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
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
                        <div key={`action-${i}`} className="flex w-[23vw] justify-between">
                            {commanButton}
                            <button title="Chat" className="flex items-center justify-center rounded-[3px] text-[white] w-[4.375rem] h-[2.125rem] bg-[#00A65A]">
                                <img src="/src/assets/chat.svg" alt="Chat" className="w-[0.875rem] h-[1.063rem]" /> Chat
                            </button>
                            <button title="Start Video Call" className="bg-[#00A65A] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]" onClick={()=>HandleMeetingClick(state.roomName,state.query_id,state.professional_id)}>
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
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white] h-[60.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20 ">
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
                                <DataTable data={filterQueries} columns={columns} pagination paginationPerPage={3}>

                                </DataTable>

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
export default Assigned_queries;