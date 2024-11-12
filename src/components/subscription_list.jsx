import React from "react";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
const Subscription_list = () => {   
    return (
        <>
            <div className="h-[100vh] w-[100vw] flex bg-[#ECF0F5]">
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh]">
                        <div className="bg-[white] h-[13.761vh] w-[82.031vw] border-t-[3px] border-[#D2D6DE] rounded-[3px] flex justify-center shadow-sm shadow-[black]/20">
                            <div className="w-[79.688vw] h-[9.918vh] flex flex-col justify-between border-t-[3px] border-[#3C8DBC]  rounded-[3px]">
                                <div className="text-[1.1rem] text-[#444444]">Subscription List</div>


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
export default Subscription_list;