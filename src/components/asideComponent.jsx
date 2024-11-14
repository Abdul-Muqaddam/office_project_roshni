import React from "react";
import Cookies from "js-cookie";
import Logo from "./logo";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
const AsideComponent=()=>{
    const is765px=useMediaQuery({maxWidth:765})

    const noheight=is765px?"":"h-[100vh]"

    const isHidden=is765px?"hidden":"";
    return(
        
        <>
        <aside className={`w-[230px] ${noheight} `}>
                    <Logo/>
                    <div className={`w-[229.5488px] h-[91.5%] bg-[#222D32] ${isHidden} `}>
                        <div className="h-[11.53vh] w-[219.5px] bg-[#222D32] text-[white] flex items-center ml-[0.9vw]">
                            <div className="w-[122px] flex items-center justify-between">
                                <img src="src/assets/user_profile.svg" alt="" />
                                <div>
                                    <div className="text-[0.875rem] font-semibold">{Cookies.get("name")}</div>
                                    <div className="flex items-center justify-between w-[49px] h-[1.3rem]">
                                        <div className="w-[10.656px] h-[0.666rem] bg-[#3C763D] rounded-[1rem]"></div>
                                        <div className="text-[0.688rem]">Online</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[230px] h-[21.391vh]">
                            <div className="h-[6.349vh] bg-[#1A2226] flex items-center text-[#4B646F]  text-[0.67rem]">
                                <div className="ml-[1vw]">
                                    MAIN NAVIGATION
                                </div>

                            </div>
                            <Link to="/dashboard" className="h-[7.521vh] flex items-center justify-center hover:text-[white] hover:bg-[#1A2226] group">
                                <div className="flex items-center justify-between w-[196.72px]">
                                    <div className="flex items-center justify-between w-[89.6px] text-[#B8C7CE] group-hover:text-[white] text-[0.875rem]">
                                        <img src="/src/assets/speed meter.svg" alt="" className="h-[0.875rem]" />
                                        <div>Dashboard</div>
                                    </div>
                                    <div className="text-[white] bg-[#00A65A] h-[2.691vh] w-[32.1152px] text-[0.656rem] font-bold flex items-center justify-center rounded-[2.63px]">
                                        new
                                    </div>
                                </div>
                            </Link>
                            <Link to="/chat_customer" className="h-[7.521vh] flex items-center justify-center hover:text-[white] hover:bg-[#1A2226] group">
                                <div className="flex items-center justify-between w-[196.72px]">
                                    <div className="flex items-center justify-between w-[60.16px] text-[#B8C7CE] group-hover:text-[white] text-[0.875rem]">
                                        <img src="/src/assets/calender.svg" alt="" className="h-[0.875rem]" />
                                        <div>Client</div>
                                    </div>
                                    <div className="text-[white] bg-[#00A65A] h-[2.691vh] w-[32.1152px] text-[0.656rem] font-bold flex items-center justify-center rounded-[2.63px]">
                                        new
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </aside>
        </>       
    )
}
export default AsideComponent