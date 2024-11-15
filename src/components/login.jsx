import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie";
import { ProfilePopupVisbleContext } from "./context/categoryContext";
import { useMediaQuery } from "react-responsive";
const Login = () => {
    const is750px=useMediaQuery({minWidth:750})
    const is280px=useMediaQuery({minWidth:280})



    const navigate=useNavigate()
    // const dispatch=useDispatch();
    const [inputLogin, setinputLogin] = useState({
        email:"",
        password:""
    });
    const [Error,setError]=useState(
        {
            email:"",
            password:""
        }
    )

    const handleChange = (event) => {
        const name=event.target.name
        const value=event.target.value
        setinputLogin((prev)=>({
            ...prev ,[name]:value
        }))
    }
    const handleClick = async () => {
        const formError={

        }
        if(inputLogin.email.trim()===""){
            formError.email="Please Enter Email"
        }
        else if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputLogin.email))){
            formError.email="Please Enter Valid Email"
        }
        if(inputLogin.password.trim()===""){
            formError.password="Please Enter Password"
        }
        // else if((/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/).test(inputLogin.password)===false){
        //     formError.password="Password should at least 8 Character 1 upperCase 1 special symbol"
        // }
        setError(formError)
        setTimeout(()=>{
            setError({})
        },3000)

        if(Object.keys(formError).length=0){
            console.log("congratulation")
        }
        try{
            if(Object.entries(formError).length==0){

                let response=await axios.post("https://chat.roshni.online/api/authenticate",inputLogin)
                let api_token=response.data.token
                console.log(response)
                Cookies.set("token",api_token,{ expires: 7 })
                Cookies.set("clientid",response.data.client_id,{expires:7})
                if(response.status===200){
                    let client_response=await axios.get(`https://chat.roshni.online/api/clients/${Cookies.get("clientid")}`,{
                        headers:{
                            "Authorization":`Bearer ${Cookies.get("token")}`
                        }
                        
                    })
                    console.log(client_response)
                    let role_response=await axios.get(`https://chat.roshni.online/api/users/${Cookies.get("clientid")}`,{
                        headers:{
                            "Authorization":`Bearer ${Cookies.get("token")}`
                        }
                        
                    })
                    Cookies.get("token")
                    if(role_response.data.role_id==3){
                        // dispatch(setUser(role_response.data))
                        // window.localStorage.setItem("name",role_response.data.firstname)
                        // setName(role_response.data.firstname)
                        Cookies.set("name",client_response.data.username,{expires:7})
                        Cookies.set("boshUrl",client_response.data.boshurl,{expires:7})
                        Cookies.set("password",client_response.data.password,{expires:7})
                        Cookies.set("jid",client_response.data.jid,{expires:7})
                        // setClientId(role_response.data.id)
                        navigate("/dashboard",{replace:true})
                        alert("Login successfully")
                    }

                }
            }
            
        }        
        catch(error){
            console.log(error)
        }
        // console.log(inputLogin)
    }
    return (
        <>
            <div className="h-[100vh] w-[100%] flex items-center justify-center flex-col">
                <div className="h-[90vh] w-[95%] flex flex-col items-center">
                <div className={`text-[#317EAC] font-normal text-[clamp(1rem,1vw+1.5rem,2rem)] mt-[0.85rem] mb-[2rem]`}>
                    Welcome to Roshini
                </div>

                    <div className={`${is750px?"h-[50vh] w-[42vw] bg-[#eeeeeed8] rounded-[5px] flex flex-col justify-center items-center border-[1px] border-[grey]/30":"h-[50vh] w-[72vw] bg-[#eeeeeed8] rounded-[5px] flex flex-col justify-center items-center border-[1px] border-[grey]/30"}`}>
                        <div className="w-[93%] ">
                            <div >
                                <div className="flex items-center mb-[1rem]">

                                <div className="h-[3.375rem] w-[3.375rem] bg-[#eaeaea] flex justify-center items-center rounded-s-[5px] border-[1px] border-[grey]/50">
                                    <img src="/src/assets/man.png" alt="" className="h-[1.313rem]" />
                                </div>
                                <input type="text" name="email" placeholder="Email" className="h-[3.375rem] w-[100%] pl-4 rounded-e-[5px] text-[1.2rem] focus:outline-none focus:border-2 border-transparent focus:ring-1 focus:ring-blue-400/50  focus:shadow-lg focus:shadow-blue-400 transition-all duration-[0.3s]" value={inputLogin.email} onChange={handleChange} />
                                </div>
                                {<p className="text-[red] ">{Error.email}</p>}
                            </div>
                            <div >
                                <div className="flex items-center mb-[1.2rem]">

                                <div className="h-[3.375rem] w-[3.375rem] bg-[#eaeaea] flex justify-center items-center rounded-s-[5px]">
                                    <img src="/src/assets/bag.png" alt="" className="h-[1.313rem]" />
                                </div>
                                <input type="password" name="password" placeholder="Password" className="h-[3.375rem] w-[100%] pl-4 rounded-e-[5px] text-[1.2rem] focus:outline-none focus:border-2 border-transparent focus:ring-1 focus:ring-blue-400/50  focus:shadow-lg focus:shadow-blue-400 transition-all duration-[0.3s]" value={inputLogin.password} onChange={handleChange}/>
                                </div>
                                {<p className="text-[red]" >{Error.password}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button className="bg-[#31A5E7] text-[white] h-[2rem] w-[11.063rem] rounded-[5px] text-[0.9rem] mb-[0.5rem]" onClick={handleClick}>Login</button>
                            <Link to="/signup" className="text-[#31A5E7] text-[0.9rem]">Register As Customer</Link>
                            <a href="" className="text-[#31A5E7] text-[0.9rem]">Register As Service Provider</a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Login