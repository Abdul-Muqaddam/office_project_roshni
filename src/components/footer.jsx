import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Footer=()=>{
    const is765px=useMediaQuery({maxWidth:765})
    const is300px=useMediaQuery({maxWidth:300})
    const isFlex=is300px?"":"flex";
    const isHidden=is765px?"hidden":"block"

    const isFullWidth=is765px?"w-[100vw]":"w-[82.031vw]"
    const isWidth=is765px?"w-[97vw]":"w-[80.031vw]"
    return(
        <>
        <footer className={`bg-[white] ${isFullWidth} h-[8.662vh] shadow-upperShadow flex items-center justify-center`}>
                            <div className={`${isWidth} flex items-center justify-between`}>
                                <div className={`font-bold text-[0.81rem] text-[#444444] ${isFlex} `}>
                                    Copyright &copy; 2024
                                    <Link to="/dashboard" className="text-[#337AB7]">&nbsp;ICT Vision </Link>.
                                    <div className="font-normal">
                                        All rights reserved
                                    </div>
                                </div>
                                <div className={`flex text-[#444444] text-[0.875rem] ${isHidden}`}>
                                    <div className="font-bold ">Version</div>
                                    <p>1.0.0</p>
                                </div>
                            </div>
                        </footer>
        </>
    )
}
export default Footer