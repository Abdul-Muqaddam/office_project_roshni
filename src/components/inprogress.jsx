import React, {  useState, useEffect } from "react";
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
const Inprogress = () => {
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const [filterQueries,setFilterQueries]=useState([])
    const [loading,setLoading]=useState(true)
    const [profilePopupVisible,setProfilePopupVisible]=useState(false);
    
    const is765px=useMediaQuery({minWidth:765})
    const isFlex=is765px?"flex":"";
    const isWidthDataTable=is765px?"w-[79.688vw]":"w-[95vw]"
    
    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."


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
    useEffect(()=>{
        const fetchapi= async () => {
                try{
                const response = await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/inprogress/queries`,{
                    headers:{
                        "Authorization":`Bearer ${Cookies.get("token")}`
                    }
                })
                console.log(response.data)
                setData(response.data)
            }
            catch(error){
                console.log(error)
                setLoading(false)
            }
        }
        fetchapi()
    },[])
    const columns=[
        {
            name:"Category",
            selector:state=>state.name,
            sortable:true,
            searchable:true,
        },
        {
            name:"Status",
            selector:state=>state.status,
            sortable:true,
            searchable:true,
        },
        {
            name:"Professional",
            selector:state=>state.professional,
            sortable:true,
            searchable:true,
        },
        {
            name:"Description",
            selector:state=>state.description,
            sortable:true,
            searchable:true,
        },
        {   
            name:"Action",
            selector:state=>state.action,
            sortable:true,
            searchable:true,
            grow:3
        }
    ]
    useEffect(()=>{
        setFilterQueries(data)
    },[data])
    const handleFilter=(e)=>{
        const filterQuery =data.filter((row)=>row.name.toLowerCase().includes(e.target.value.toLowerCase()))
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
                        <div className="bg-[white] border-t-[3px] border-[#D2D6DE] rounded-[3px]  flex justify-center shadow-sm shadow-[black]/20">
                            <div className={`${isWidthDataTable} border-t-[3px] border-[#3C8DBC]  rounded-[3px]`}>
                            <div className="flex justify-end mt-2">
                                    Search:&nbsp; <input type="text" className="focus:outline-none border-gray-500 border-[0.5px] px-2 py-1 text-[0.8rem]" onChange={handleFilter}/>
                                </div>
                                <DataTable columns={columns} data={filterQueries} pagination paginationPerPage={3} noDataComponent={loading?"Loading...":"There are no records to display"}></DataTable>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Inprogress;