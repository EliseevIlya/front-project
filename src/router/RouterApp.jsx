
import React, { useState } from "react";
import RouterAdminApp from "./RouterAdminApp.jsx";
import RouterNoAuthUserApp from "./NoAuthUser.jsx";
import RouterOrgApp from "./RouterOrgApp.jsx";
import RouterUserApp from "./RouterUserApp.jsx"



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
            return(
                <RouterUserApp />
            )
            break
        }
        case"admin":{
            return(
                <RouterAdminApp />
            )
            break
        }
        case "org":{
            return(
                <RouterOrgApp />
            )
            break
        }
        case "all":{
            break
        }
        
    }
}
