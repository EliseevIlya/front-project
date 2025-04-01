
import React, { useState } from "react";
import RouterAdminApp from "./RouterAdminApp.jsx";
import RouterNoAuthUserApp from "./NoAuthUser.jsx";
import RouterOrgApp from "./RouterOrgApp.jsx";
import RouterUserApp from "./RouterUserApp.jsx"
import AllRouterrApp from "./AllROuter.jsx";



export default function RouterApp(){
    const [role,setRole]=useState("all")
    switch(role){
        case "no-users":{
            return(
                <RouterNoAuthUserApp />
            )
        }
        case"users":{
            return(
                <RouterUserApp />
            )
        }
        case"admin":{
            return(
                <RouterAdminApp />
            )
        }
        case "org":{
            return(
                <RouterOrgApp />
            )
        }
        case "all":{
            return(
                <AllRouterrApp ></AllRouterrApp>
            )
        }
        
    }
}
