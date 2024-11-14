import React from "react";
import { useMediaQuery } from "react-responsive";
const Logo = () => {
    const is765px=useMediaQuery({maxWidth:765})
    const isFullWidth=is765px?"w-[100vw]":"w-[230px]"
    return (
        <>
            <div className={`${isFullWidth} h-[8.547vh] bg-[#367FA9] flex items-center justify-center text-[white]`}>
                <div className="w-[131.3536px] flex justify-between items-center">
                    <div className="font-bold text-[1.34rem]">
                        Roshni
                    </div>
                    <div className="text-[1.24rem]">
                        Online
                    </div>
                </div>
            </div>
        </>
    )
}
export default Logo