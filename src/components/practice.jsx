import React, { useState } from "react";
function Practice(){
    const [inputform,setinputform]=useState({
        name:"",
        password:""
    })
    const [Error,setError]=useState({
        name:"",
        password:""
    })
    const handlechange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setinputform((prev)=>({
            ...prev,[name]:value
        }))
    }
    const handleclick=()=>{
        let formErrors={}
        if(inputform.name.trim()===""){
            formErrors.name="Name is Required"
        }
        if(inputform.password.trim()===""){
            formErrors.password="password is Required"
        }
        else if((/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/).test(inputform.password)==false){
            formErrors.password="password should include 1 Uppercase Character 1 Symbol and Numbers"
        }
        setError(formErrors)
        if(Object.keys(formErrors).length===0){
            console.log("congratualation")
        }
        
        console.log(inputform)
    }
    return(
        <>
            input something 
            <input type="text" name="name" className="bg-black text-white block" value={inputform.name} onChange={handlechange}/>
            {<p className="text-[red] ">{Error.name}</p>}
            <button className="block text-[white] bg-black" onClick={handleclick}>click me</button>

            <input type="text" name="password" className="text-[white] bg-black" value={inputform.password} onChange={handlechange} />
            {<p className="text-[red] ">{Error.password}</p>}
        </>
    )    
}
export default Practice