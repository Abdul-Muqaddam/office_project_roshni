import axios from "axios";
import React, { useState } from "react";
import Login from "./login"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
function Signup() {
    const is600px=useMediaQuery({minWidth:600})
    const firstInputSectionResponsiveHeight=is600px?"h-[50vh]":"h-[60vh]" //first input section contain "First Name" "Email" "UserName"
    const bothInputSectionResponsiveWidth=is600px?"w-[42vw]":"w-[80vw]";  
    const inputParentSectionHeight=is600px?"h-[80vh]":"h-[150vh]"
    const inputTextAreaWidth=is600px?"w-[95vw]":"w-[85vw]"
    const navigate=useNavigate();
    const [inputData, setInputData] = useState({
        firstname: '',
        email: '',
        username: '',
        lastname: '',
        phone: '',
        password: '',
        description: '',
    })
    const [Error, setError] = useState({
        firstname: '',
        email: '',
        username: '',
        lastname: '',
        phone: '',
        password: '',
        description: '',
    })

    const Handle_input_data = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputData((prev) => ({
            ...prev, [name]: value
        }))
    }
    const handle_click = async () => {
        let inputForm = {

        }
        if (inputData.firstname.trim() === "") {
            inputForm.firstname = "FirstName is required"
        }
        if (inputData.username.trim() === "") {
            inputForm.username = "UserName is required"
        }
        if (inputData.phone.trim() === "") {
            inputForm.phone = "PhoneNumber is required"
        }
        else if (inputData.phone.startsWith("923") === false) {
            inputForm.phone = "Phone number should start with 923"
        }
        else if (inputData.phone.length != 12) {
            inputForm.phone = "Phone Number digits should be 12"
        }
        if (inputData.password.trim() === "") {
            inputForm.password = "Password is required"
        }
        if (inputData.email.trim() === "") {
            inputForm.email = "Email is required"
        }
        else if ((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(inputData.email) === false) {
            inputForm.email = "Email is not valid"
        }
        setError(inputForm)

        // console.log(Object.keys(inputForm).length)
        // if (Object.keys(inputForm).length === 0) {
        //     console.log("Congratulation")
        //     // console.log(Object.keys(inputForm)>0)
            
        // }
        setTimeout(() => {
            setError({})
            // debugger;
        }, 3000)



        try {
            if(Object.keys(inputForm).length===0){
                const response = await axios.post("https://chat.roshni.online/api/clients", inputData)
                console.log(response.data)
                if(Object.keys(response.data)[0]=="cliet_id"){
                    navigate("/")
                    // window.location.href="/"
                    alert("Customer has been created sucessfully")
                }
            }
        }
        catch (error) {
            if (error.response.status === 422) {
                alert("User Already exsist")
                console.log(error)
            }


        }
        // console.log(inputData)
    }
    return (
        <>
            <div className="overflow-x-hidden">
                <div>
                </div>
                <div className="flex items-center justify-center h-[10vh] mb-[2.5rem]">
                    <div className="flex items-end justify-center ">
                        <p className="text-[1.875rem] font-normal text-[#317eac]">Welcome to Roshni &nbsp;</p>
                        {/* <p className="text-[1.21875rem] text-[#999999] pb-[0.25rem]"> Mashwara sub k li ay</p> */}
                    </div>
                </div>
                <div className={`${inputParentSectionHeight} bg-[#F5F2F2] border-[1px] border-solid border-[#999999] flex flex-col items-center max-w-[100vw]`}>
                    <div className={`${is600px?"flex":"block"}`}>
                        <div className={`flex flex-col justify-evenly ${firstInputSectionResponsiveHeight}`}>
                            <div >
                                <div className="w-[50vw] flex justify-center items-center flex-col">

                                    <div className="font-bold text-[0.9rem] text-[#555555] mb-[0.3rem]">*First Name</div>
                                    <div className="flex">
                                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4] rounded-l-[0.3rem]">
                                            <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                                        </div>
                                        <input type="text" name="firstname" className={`${bothInputSectionResponsiveWidth} rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300  `} value={inputData.name} onChange={Handle_input_data} />
                                    </div>
                                    <p className="text-[red]">{Error.firstname}</p>
                                </div>
                            </div>
                            <div className="w-[50vw] flex justify-center items-center flex-col">
                                <div className="font-bold text-[0.9rem] text-[#555555] mb-[0.3rem]">Email</div>
                                <div className="flex flex-col items-center">
                                    <div className="flex">

                                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4] rounded-l-[0.3rem]">
                                            <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                                        </div>
                                        <input type="email" name="email" className={`${bothInputSectionResponsiveWidth} rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 `} value={inputData.email} onChange={Handle_input_data} />
                                    </div>
                                    <p className="text-[red]">{Error.email}</p>
                                </div>
                            </div>
                            <div className="w-[50vw] flex justify-center items-center flex-col">

                                <div className="font-bold text-[0.9rem] text-[#555555] mb-[0.3rem]">*User Name</div>
                                <div className="flex flex-col items-center">
                                    <div className="flex">

                                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4] rounded-l-[0.3rem]">
                                            <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                                        </div>
                                        <input type="text" name="username" className={`${bothInputSectionResponsiveWidth} rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 `} value={inputData.userName} onChange={Handle_input_data} />
                                    </div>
                                    <p className="text-[red]">{Error.username}</p>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col justify-evenly h-[50vh] ">
                            <div className="w-[50vw] flex justify-center items-center flex-col">
                                <div className="font-bold text-[0.9rem] text-[#555555] mb-[0.3rem]">Last Name</div>
                                <div className="flex">
                                    <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4] rounded-l-[0.3rem]">
                                        <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                                    </div>
                                    <input type="text" name="lastname" className={`${bothInputSectionResponsiveWidth} rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 `} value={inputData.lastName} onChange={Handle_input_data} />
                                </div>
                            </div>
                            <div className="w-[50vw] flex justify-center items-center flex-col">
                                <div className="font-bold text-[0.9rem] text-[#555555] mb-[0.3rem]">*Phone</div>
                                <div className="flex flex-col items-center">
                                    <div className="flex">

                                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4] rounded-l-[0.3rem]">
                                            <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                                        </div>
                                        <input type="tel" name="phone" className={`${bothInputSectionResponsiveWidth} rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 `} value={inputData.phone} onChange={Handle_input_data} />
                                    </div>
                                    <p className="text-[red]">{Error.phone}</p>
                                </div>
                            </div>
                            <div className="w-[50vw] flex justify-center items-center flex-col">
                                <div className="font-bold text-[0.9rem] text-[#555555] mb-[0.3rem]">*Password</div>
                                <div className="flex flex-col items-center">
                                    <div className="flex">

                                        <div className="flex justify-center items-center h-[2.375rem] w-[2.375rem] bg-[#E1E1E4] rounded-l-[0.3rem]">
                                            <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                                        </div>
                                        <input type="password" name="password" className={`${bothInputSectionResponsiveWidth} rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300 `} value={inputData.password} onChange={Handle_input_data} />
                                    </div>
                                    <p className="text-[red]">{Error.password}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="w-[100vw] flex justify-center items-center flex-col">
                        <div className="font-bold text-[0.9rem] text-[#555555] mb-[0.3rem]">Description</div>
                        <div className="flex">
                            <div className="flex justify-center items-center h-[10.375vh] w-[2.375rem] bg-[#E1E1E4] rounded-l-[0.3rem]">
                                <img src="/src/assets/info.png" alt="" className="h-[1.1rem]" />
                            </div>
                            <textarea type="text" name="description" className={`${inputTextAreaWidth} h-[10vh] text-[0.85rem] p-[0.5rem] rounded-r-[0.3rem] px-[0.5rem] pb-[0.125rem] focus:outline-none border-[1px] border-transparent focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition duration-300`} value={inputData.description} onChange={Handle_input_data} />
                        </div>
                    </div>
                    <button className="w-[98vw] bg-[#2fa4e7] text-[white] h-[7vh] mt-[1rem] font-medium rounded-[0.5rem] focus:outline-none" onClick={handle_click}>Register</button>
                    <Link to="/" className="w-[98vw] text-[#2fa4e7] text-[0.9rem] rounded-[0.5rem] flex items-center justify-center focus:outline-none"><div className="focus:outline-none">Login</div></Link>
                </div>
            </div>

        </>
    )
}
export default Signup