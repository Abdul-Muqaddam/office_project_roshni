import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
const url="https://chat.roshni.online/api";
const apiRoute={
    assigned_queries: ()=>{
        return  axios.get(`${url}/clients/${Cookies.get("clientid")}/assigned/queries`,{
            headers:{
                "Authorization":Cookies.get("token")
            }
        })   
    }
}

export default apiRoute