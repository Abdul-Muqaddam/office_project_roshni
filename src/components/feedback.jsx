import React from "react";
import AsideComponent from "./asideComponent";
import Navbar from "./navbar";
import Footer from "./footer";
import ClientSectionMainHeader from "./ClientSectionMainHeader";
const Feedback = () => {
    return (
        <>
            <div className="h-[100vh] w-[100vw] flex bg-[#ECF0F5]">
                <AsideComponent/>
                <div className="w-[82.031vw] h-[73.846vh] bg-[#ECF0F5]">
                    <Navbar/>
                    <ClientSectionMainHeader/>
                    <div className="flex flex-col justify-between h-[81.846vh] ">
                        <div className="w-[100%] h-[58.462vh] bg-white flex flex-col items-center">
                            <div className="h-[54.586vh]  w-[79.385vw] border-t-[3px] border-[#3C8DBC] rounded-[3px] ">
                                <div className="text-[1.075rem] w-[78.385vw] h-[7.065vh] ml-[0.8vw] text-[#444444] flex items-center">Client Reviews about Job</div>
                                <div className="w-[79.385vw] h-[43.761vh] flex flex-col items-center ">
                                    <div className="w-[96%] text-[0.875rem] text-[#333333] font-bold mb-[2vh]">
                                        Remark
                                        <div className="flex mt-[1vh]">
                                            <div className="h-[5.812vh] w-[3.023vw] border-[1px] border-[#D2D6DE] flex items-center justify-center border-r-transparent">
                                                <img src="/src/assets/help_icon.svg" alt="" />
                                            </div>
                                            <div>

                                                <select type="text" name="query_title" id=""  className=" w-[73.099vw] h-[5.8vh] font-normal  focus:outline-none focus:border-[1px] border-[1px] border-[#D2D6DE] focus:border-[#3C8DBC] px-3" >
                                                    <option value="">--Select Remark--</option>
                                                    <option value="">Excellent</option>
                                                    <option value="">Good</option>
                                                    <option value="">Satisfied</option>
                                                    <option value="">Poor</option>
                                                </select>
                                                <p className="text-[red] font-normal"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[96%] text-[0.875rem] text-[#333333] font-bold mb-[2vh]">
                                    Some Word about Professional
                                        <div className="flex mt-[1vh]">
                                            <div className="h-[9.312vh] w-[3.023vw] border-[1px] border-[#D2D6DE] flex items-center justify-center border-r-transparent">
                                                <img src="/src/assets/help_icon.svg" alt="" />
                                            </div>
                                            <textarea type="text"   className=" dark-placeholder  h-[9.312vh]  w-[73.099vw] font-normal focus:outline-none focus:border-[1px] border-[1px] border-[#D2D6DE] focus:border-[#3C8DBC] px-3 py-1" />
                                        </div>
                                    </div>
                                    <div className="w-[96%] text-[0.875rem] text-[#333333] font-bold mb-[2vh]">
                                    Rating out of 5
                                        <div className="flex mt-[1vh]">
                                            <div className="h-[5.812vh] w-[3.023vw] border-[1px] border-[#D2D6DE] flex items-center justify-center border-r-transparent">
                                                <img src="/src/assets/help_icon.svg" alt="" />
                                            </div>
                                            <input type="number" step="1" min="1" max="5" required className=" dark-placeholder w-[33.099vw] font-normal focus:outline-none focus:border-[1px] border-[1px] border-[#D2D6DE] focus:border-[#3C8DBC] px-3 " />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="w-[79.385vw] flex justify-end">
                                    <button className="flex items-center justify-center bg-[#3C8DBC] text-[white] rounded-[2px] w-[6.645vw] h-[5.692vh]" ><div className="font-extrabold text-[1.5rem] ">+</div>update</button>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Feedback;