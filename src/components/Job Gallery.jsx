import React from "react";
import AsideComponent from "./asideComponent";
import Footer from "./footer";
import Navbar from "./navbar";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
const job_Gallery = () => {

    return (
        <>
            <div className="h-[100vh] w-[100vw] flex bg-[#ECF0F5]">
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh] ">
                        <div className="w-[100%] h-[10.462vh] bg-white flex flex-col items-center shadow-sm shadow-black/20">
                            <div className="h-[54.586vh]  w-[79.385vw] border-t-[3px] border-[#3C8DBC] rounded-[3px] ">
                                <div className="text-[1.075rem] w-[78.385vw] h-[7.065vh] ml-[0.8vw] text-[#444444] flex items-center">Job Gallery</div>
                                <hr />
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default job_Gallery;