import React, { useContext, useEffect, useState, } from "react";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
import { useMediaQuery } from "react-responsive";
import { ProfilePopupVisbleContext } from "./context/categoryContext";
const Completedquries = () => {
    const {profilePopupVisible,setProfilePopupVisible}=useContext(ProfilePopupVisbleContext)
    const [data,setData]=useState([])
    const [filterData,setFilterData]=useState([])
    const [error,setError]=useState(false)
    const navigate=useNavigate();

 
    
    useEffect(()=>{
        const fetchapi= async ()=>{
            try {
                const response= await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}/completed/queries`,{
                    headers:{
                        Authorization:`Bearer ${Cookies.get("token")}`
                    }
                })
                console.log(response.data)
                setData(response.data)
            } catch (error) {
                setError(true)
                console.log(error)
            }
        }
        fetchapi()
    },[])  
    // "isProfilePopupVisible" is used to toggle the display of the profile popup on the right side.
    // When true, the popup is shown; when false, the popup is hidden. This state is controlled by
    // clicking on the profile icon or username to display/hide user options like "Profile" and "Sign out."

    const is765px=useMediaQuery({minWidth:765})
    const isFlex=is765px?"flex":"";
    
    
    const isWidthDataTable=is765px?"w-[79.688vw]":"w-[95vw]"

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
    useEffect(()=>{
        setFilterData(data)
    },[data])

    const handleEditButton=(query_id)=>{
        navigate("/editquery",{state:{query_id}})
    }
    const handleJobGallaryButton=()=>{
        navigate("/jobGallary")
    }
    const handleDeleteButton=async(query)=>{
        if(confirm("Are you sure you want to delete this query?"))
        {
            try {
                const response=await axios.delete(`https://chat.roshni.online/api/queries/${query}`,{
                    headers:{
                        Authorization:`Bearer ${Cookies.get("token")}`
                    }
                })
                alert("Query has Been deleted")
            } catch (error) {
                alert("we cannot delete this query")
                console.error(error)
            }   
            
        }
        else{
            
        }
    }
    const handleFeedbackButton=()=>{
        navigate("/feedback")
    }

    const columns=[
        {
            name:"Category",
            selector:state=>state.name,
            sortable:true,
            searchable:true,
        },
        {
            name:"status",
            selector:state => state.status,
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
            selector:state=>{
                return(
                    <>
                    <div className="flex justify-between w-[5.5rem]">
                     
                        
                        <button onClick={handleJobGallaryButton} title="Edit" className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/img.svg" alt="Image" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                        
                        <button onClick={handleFeedbackButton} title="FeedBack" className="bg-[#00C0EF] w-[2.5rem] h-[2.125rem] flex items-center justify-center rounded-[3px]">
                            <img src="/src/assets/feedback.svg" alt="Feedback" className="w-[0.875rem] h-[1.063rem]" />
                        </button>
                    </div>
                    </>
                )
            },
            grow:3,
        }

    ]
    const handleSearch=(e)=>{
        const filterQueries=data.filter(row=> row.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilterData(filterQueries)
    }
    return (
        <>
            <div className={`h-[100vh] w-[100vw] ${isFlex} bg-[#ECF0F5] `} onClick={getTheValue}>
                <AsideComponent/>
                <div className=" h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>                    
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className={`${isWidthDataTable}  border-t-[3px] border-[#3C8DBC]  rounded-[3px]`}>
                                <div className="flex justify-end items-center h-[3rem]">
                                Search:&nbsp; <input type="text" className="border-[0.5px] border-gray-500 rounded-sm focus:outline-none px-2 py-1 text-[0.8rem]" onChange={handleSearch}  />
                                </div>
                                <DataTable columns={columns} data={filterData} pagination paginationPerPage={3} noDataComponent={error?"There are no data to display":"Loading..."}></DataTable>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Completedquries;