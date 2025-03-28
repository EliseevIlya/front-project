
import React, { useState } from "react";
import RouterAdminApp from "./RouterAdminApp.jsx";
import RouterNoAuthUserApp from "./NoAuthUser.jsx";



export default function RouterApp(){
    const [role,setRole]=useState("no-users")
    
    switch(role){
        case "no-users":{
            return(
                <RouterNoAuthUserApp />
            )
            break
        }
        case"users":{
            break
        }
        case"admin":{
            return(
                <RouterAdminApp />
            )
            break
        }
        case "org":{
            break
        }
        case "all":{
            break
        }
        
    }
}
