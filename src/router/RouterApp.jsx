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
    /* 
    return(
            <Routes>
                <Route path="/service" element={<Servicepage />}/>
                <Route path="/service/washing" element={<Washingservice />} />
                <Route path="/service/installation" element={<Installationservice />}/>
                <Route path="/org/forms" element={<PioneerForms />}/>
                <Route path="/" element={<Main_page />}/>
                <Route path="/user" element={<UserAcc_page />}/>
                <Route path="/user/request" element={<Apps_page />}/>
                <Route path="/org/reg" element={<OrgReg_page />}/>
                <Route path="/org/status/check" element={<OrgStatusCheck_page />}/>
                <Route path="/org/info" element={<OrgInfo_page />}/>
                <Route path="/create/services" element={<CreateServices_page />}/>
                <Route path="/admin/status/edit" element={<OrgStatusEdit_page />}/>
                <Route path="/admin" element={<AdminAcc_page />}/>
                <Route path="/admin/table/user" element={<UsersTable_page />}/>
                <Route path="/admin/table/org" element={<OrgTable_page />}/>
                <Route path="/*" element={<NotFoundPage />}/>
            </Routes>
    )
}*/