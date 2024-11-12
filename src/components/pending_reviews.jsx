import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import axios from "axios";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
const Pending_reviews = () => {
    const [data, setData] = useState([])
    const [filterQueries, setFilterQueries] = useState([])
    useEffect(() => {
        try {
            const fetchapi = async () => {
                console.log(`${Cookies.get("clientid")}`)
                const response = await axios.get(`https://chat.roshni.online/api/pending/reviews/${Cookies.get("clientid")}`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get("token")}`
                    }
                })
                console.log(response.data)
                setData(response.data)
            }
            fetchapi()

        }
        catch (error) {

        }
    }, [])
    const columns = [
        {
            name: "#",
            selector: (row,state) => {
                return(<>
                {++state}
                </>
            )
        },
            sortable: true,
            searchable: true,
        },
        {
            name: "Professional Name",
            selector: state => state.professionals,
            sortable: true,
            searchable: true,
            grow:2

        },
        
        
        
        
        {
            name: "Action",
            selector: State => {
                return (
                    <>
                        <div className="flex items-center justify-center bg-[#00ACD6] w-[2.458rem] h-[2.083rem]">
                            <img src="/src/assets/feedback.svg" alt="" className="h-[1.2rem]"/>
                        </div>
                    {console.log(State.action)}</>
                )
            },
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
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white] h-[43.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className="w-[79.688vw] h-[39.918vh] border-t-[3px] border-[#3C8DBC]  rounded-[3px]">
                                <div className="flex justify-end mt-2">
                                    Search:&nbsp; <input type="text" className="focus:outline-none border-gray-500 border-[0.5px] px-2 py-1 text-[0.8rem]" onChange={handleFilter} />
                                </div>
                                <DataTable columns={columns} data={filterQueries} pagination paginationPerPage={3}></DataTable>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pending_reviews;