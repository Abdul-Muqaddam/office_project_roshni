import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
import { useMediaQuery } from "react-responsive";
const Chat_customer = () => {
    const navigate=useNavigate();
    const [data, setData] = useState([])
    const [filterQueries, setFilterQueries] = useState([])
    const [error,setError]=useState(false)
    const [profilePopupVisible,setProfilePopupVisible]=useState(false);  
    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."

    const is765px=useMediaQuery({minWidth:765})

    const isFlex=is765px?"flex":"";

    const isWidthDataTable=is765px?"w-[79.688vw]":"w-[95vw]"

    const handleprofilePopupVisible=()=>{
        if(profilePopupVisible){
            setProfilePopupVisible(false) 
        }   
        else{
            setProfilePopupVisible(true) 
        }    // this is help to toggle the isProfilePopupVisible
    }
    const getTheValue=()=>{
        if(profilePopupVisible){
            setProfilePopupVisible(false)    // close the isProfilePopupVisible whereever userClick
        }
    }
    const handleProfile=()=>{
        navigate("/userProfile")
    }
    const handleSignOut= async ()=>{
        
        try {
            const response=await axios.post("https://chat.roshni.online/api/logout",{},{
                headers:{
                    "Authorization":`Bearer ${Cookies.get("token")}`
                }
                
            })
            if(response.status==200){
                alert(response.data.message)
                    navigate("/");

            }
        } catch (error) {
            console.log(error)
        }
        
   
}
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
            setError(true)
            console.log(error)
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
                        <div className="flex justify-between w-[390px]">
                            <Link to={"/edit_client"} className="bg-[#00C0EF] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[2.851rem]">
                                <img src="/src/assets/edit.svg" alt="" />
                                Edit
                            </Link>
                            <Link to={"/create_query"} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[6.541rem]">
                                <img src="/src/assets/edit.svg" alt="" />
                                Create Query
                            </Link>
                            <Link to={"/query"} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[5.541rem]">
                                <img src="/src/assets/menu.svg" alt="" />
                                Query list
                            </Link>
                            <Link to={"/subscription"} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[7.541rem]">
                                <img src="/src/assets/globe.svg" alt="" />
                                Subscription
                            </Link>
                        </div>
                        <div className="flex justify-between w-[250px] mt-[1px]">
                            <Link to={"/subscription_list"} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[7.541rem]">
                                <img src="/src/assets/menu.svg" alt="" />
                                Subscription List
                            </Link>
                            <Link to={"/pending_reviews"} className="bg-[#3C8DBC] flex items-center justify-center text-[white] rounded-[3px] h-[1.333rem] w-[7.541rem]">
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
            <div className={`h-[100vh] w-[100vw] ${isFlex} bg-[#ECF0F5]`} onClick={getTheValue}>
                <AsideComponent/>
                <div className=" h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white] h-[43.761vh]  border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className={`${isWidthDataTable} h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]`}>
                                <div className="flex justify-end mt-2">
                                    Search:&nbsp; <input type="text" className="focus:outline-none border-gray-500 border-[0.5px] px-2 py-1 text-[0.8rem]" onChange={handleFilter} />
                                </div>
                                <DataTable columns={columns} data={filterQueries} pagination paginationPerPage={3} noDataComponent={error?"There are no data to display":"Loading..."}></DataTable>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Chat_customer;