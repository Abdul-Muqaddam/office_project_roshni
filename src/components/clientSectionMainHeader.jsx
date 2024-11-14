import React from "react";
import { useMediaQuery } from "react-responsive";

const ClientSectionMainHeader = () => {
    const is990px = useMediaQuery({ maxWidth: 990 })
    const setHeight = is990px ? "h-[12.573vh]" : "h-[9.573vh]";
    const flex = is990px ? "" : "flex justify-between";
    const setWidth=is990px?"w-[90vw]":"w-[18vw]"
    const is765px=useMediaQuery({maxWidth:765})
    const isFullWidth=is765px?"w-[97vw]":"w-[80.031vw]";
    return (
        <>
            <div className={`${setHeight} flex items-center justify-center`}>
                <div className={`${setHeight} ${isFullWidth}  ${flex}`}>
                    <div className={`flex items-center ${setWidth}`}>
                        <div className="text-[#333333] text-[1.5rem]">
                            Client
                        </div>
                        <div className="text-[#777777] font-light text-[0.938rem] mt-[1.5vh] ml-2">
                            Control panel
                        </div>
                    </div>
                    <div className="flex items-center w-[107.2768px] justify-around">
                        <img src="/src/assets/speed meter black.svg" alt="" />
                        <div className="cursor-pointer text-[0.75rem]">Home</div>
                        <div className="text-[#CCCCCC]">
                            &gt;
                        </div>
                        <div className="cursor-pointer text-[#777777] text-[0.75rem]">Client</div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default ClientSectionMainHeader