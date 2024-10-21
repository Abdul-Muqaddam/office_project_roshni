import React, { useState } from "react";
import axios from "axios";
function Signup(){
    const [inputData,setinputData]=useState({
        firstname:'',
        email:'',
        username:'',
        lastname:'',
        phone:'',
        password:'',
        description:'',

    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setinputData((prev)=>({
            ...prev,[name]:value
        }))
    }
    const handleClick=async()=>{
        
        try {
            var response= await axios.post("https://chat.roshni.online/api/clients",inputData)
        } catch (error) {
            if( error.response.status===422){
                alert("please enter the correct credentails")
            }
            else{
                console.log(error)
            }
        }

    }
    console.log(inputData)

return(
    <>
 <div className="overflow-x-hidden bg-black">
            <div className="flex items-center justify-center h-[10vh] mb-[2.5rem]">
                <div className="flex items-end justify-center ">
                <p className="text-[1.875rem] font-normal text-[white]">Welcome to Roshni &nbsp;</p>
                {/* <p className="text-[1.21875rem] text-[#999999] pb-[0.25rem]"> Mashwara sub k li ay</p> */}
                </div>
            </div>
            <div className="relative h-[84vh] w-[98vw] overflow-hidden flex flex-col items-center justify-center bg-black">
                <div className="h-[78vh] w-[95vw] flex flex-col justify-center items-center bg-linear-gradient-bg backdrop-blur-[6px] rounded-[2rem] border-[2px] border-solid border-[white]/30 relative z-10">
                <div className="flex ">
                <div className="flex flex-col justify-evenly h-[50vh] ">
                    <div className="w-[50vw] flex justify-center items-center flex-col">
                        <div className="font-bold text-[0.9rem] text-[white] mb-[0.3rem]">*First Name</div>
                        <div className="flex">
                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4]/40 rounded-l-[0.3rem]">
                        <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                        </div>
                        <input type="text" name="firstname" className="w-[40vw] rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300  bg-transparent bg-linear-gradient-bg text-[white]"   value={inputData.name} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="w-[50vw] flex justify-center items-center flex-col">
                        <div className="font-bold text-[0.9rem] text-[white] mb-[0.3rem]">Email</div>
                        <div className="flex">
                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4]/40 rounded-l-[0.3rem]">
                        <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                        </div>
                        <input type="email" name="email" className="w-[40vw] rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 bg-transparent bg-linear-gradient-bg text-[white] " value={inputData.name} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="w-[50vw] flex justify-center items-center flex-col">
                        <div className="font-bold text-[0.9rem] text-[white] mb-[0.3rem]">*User Name</div>
                        <div className="flex">
                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4]/40 rounded-l-[0.3rem]">
                        <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                        </div>
                        <input type="text" name="username" className="w-[40vw] rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 bg-transparent bg-linear-gradient-bg text-[white] " value={inputData.name} onChange={handleChange}/>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col justify-evenly h-[50vh] ">
                    <div className="w-[50vw] flex justify-center items-center flex-col">
                        <div className="font-bold text-[0.9rem] text-[white] mb-[0.3rem]">Last Name</div>
                        <div className="flex">
                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4]/40 rounded-l-[0.3rem]">
                        <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                        </div>
                        <input type="text" name="lastname" className="w-[35vw] rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 bg-transparent bg-linear-gradient-bg text-[white]" value={inputData.name} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="w-[50vw] flex justify-center items-center flex-col">
                        <div className="font-bold text-[0.9rem] text-[white] mb-[0.3rem]">*Phone</div>
                        <div className="flex">
                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4]/40 rounded-l-[0.3rem]">
                        <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                        </div>
                        <input type="tel" name="phone" className="w-[35vw] rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 bg-transparent bg-linear-gradient-bg text-[white]" value={inputData.name} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="w-[50vw] flex justify-center items-center flex-col">
                        <div className="font-bold text-[0.9rem] text-[white] mb-[0.3rem]">*Password</div>
                        <div className="flex">
                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4]/40 rounded-l-[0.3rem]">
                        <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                        </div>
                        <input type="password" name="password" className="w-[35vw] rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 bg-transparent bg-linear-gradient-bg text-[white]" value={inputData.name} onChange={handleChange}/>
                        </div>
                    </div>

                </div>
                </div>
                <div className="w-[100vw] flex justify-center items-center flex-col">
                        <div className="font-bold text-[0.9rem] text-[white] mb-[0.3rem]">Description</div>
                        <div className="flex">
                        <div className="flex justify-center items-center h-[10.3vh] w-[2.375rem] bg-[#E1E1E4]/40 rounded-l-[0.3rem]">
                        <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                        </div>
                        <textarea type="text" name="description" className="w-[90vw] h-[10vh] text-[0.85rem] p-[0.5rem] rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 bg-transparent bg-linear-gradient-bg text-[white]"  value={inputData.name} onChange={handleChange} />
                        </div>
                </div>
                <button className="w-[90vw] bg-linear-gradient-bg text-[white] h-[7vh] mt-[1rem] font-medium rounded-[0.5rem]" onClick={handleClick} >Register</button>    
                <button className="w-[90vw] text-[white] text-[0.9rem] rounded-[0.5rem] m-[0.5rem]">Login</button>    
                </div>
                <div className="absolute h-[30vh] w-[14vw] rounded-[10rem] top-10 left-[-25px] bg-purple-blue z-0"></div>
                <div className="absolute h-[20vh] w-[10vw] rounded-[10rem] top-44 right-[3rem] bg-blue-blue z-0"></div>
                <div className="absolute h-[60vh] w-[30vw] rounded-[20rem] bottom-[-10rem] right-[-10rem] bg-purple-blue z-0"></div>
            </div>
        </div>
    </>
)    
}
export default Signup;