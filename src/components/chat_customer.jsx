import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
const Chat_customer = () => {
    const [data, setData] = useState([])
    const [filterQueries, setFilterQueries] = useState([])
    useEffect(() => {
        try {
            const fetchapi = async () => {
                const response = await axios.get(`https://chat.roshni.online/api/getclients`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                console.log(response.data.data)
                setData(response.data.data)
            }
            fetchapi()

        }
        catch (error) {

        }
    }, [])
    const columns = [
        {
            name: "#",
            selector: state => state.DT_RowIndex,
            sortable: true,
            searchable: true,
        },
        {
            name: "Name",
            selector: state => state.full_name,
            sortable: true,
            searchable: true,
            cell:row=>(
                <div className="max-w-16">
                    {row.full_name}
                </div>
            )
        },
        {
            name: "Email",
            selector: state => state.email,
            sortable: true,
            searchable: true,
            cell: row => (
                <div className="max-w-16">
                    {row.email}
                </div>
            ),
        },
        {
            name: "Phone",
            selector: state => state.phone,
            sortable: true,
            searchable: true,
            cell: row=>(
                <div className="w-max-16">
                    {row.phone}
                </div>
            )
        },
        {
            name: "Address",
            selector: state => state.address,
            sortable: true,
            searchable: true,
        },
        {
            name: "Balance",
            selector: State => State.balance,
            sortable: true,
            searchable: true,
        },
        {
            name: "Action",
            selector: State => {
                return (
                    <>
                        <div className="flex justify-between w-[30vw]">
                            <Link src={State.action.edit} className="bg-[#00C0EF] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[2.851rem]">
                                <img src="/src/assets/edit.svg" alt="" />
                                Edit
                            </Link>
                            <Link to={State.action.creatQuery} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[6.541rem]">
                                <img src="/src/assets/edit.svg" alt="" />
                                Create Query
                            </Link>
                            <Link to={State.action.queryList} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[5.541rem]">
                                <img src="/src/assets/menu.svg" alt="" />
                                Query list
                            </Link>
                            <Link to={State.action.subscription} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[7.541rem]">
                                <img src="/src/assets/globe.svg" alt="" />
                                Subscription
                            </Link>
                        </div>
                        <div className="flex justify-between w-[19.5vw] mt-[1px]">
                            <Link to={State.action.subscriptionList} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[7.541rem]">
                                <img src="/src/assets/menu.svg" alt="" />
                                Subscription List
                            </Link>
                            <Link to={State.action.pendingReviews} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[7.541rem]">
                                <img src="/src/assets/menu.svg" alt="" />
                                Pending Reviews
                            </Link>
                        </div>
                    {console.log(State.action)}</>
                )
            },
            grow: 6
        }
    ]
    useEffect(() => {
        setFilterQueries(data)
    }, [data])
    const handleFilter = (e) => {
        const filterQuery = data.filter((row) => row.full_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilterQueries(filterQuery)
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
                        <div className="bg-[white] h-[43.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className="w-[79.688vw] h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]">
                                <div className="flex justify-end mt-2">
                                    Search:&nbsp; <input type="text" className="focus:outline-none border-gray-500 border-[0.5px] px-2 py-1 text-[0.8rem]" onChange={handleFilter} />
                                </div>
                                <DataTable columns={columns} data={filterQueries} pagination paginationPerPage={3}></DataTable>
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
export default Chat_customer;