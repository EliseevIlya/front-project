import { Route, Routes } from "react-router";
import Main_page from "../pages/main_page/main_page.jsx";
import UserAcc_page from "../pages/user_acc_page/useracc_page.jsx";
import OrgReg_page from "../pages/org_reg_page/orgreg_page.jsx";
import OrgStatusCheck_page from "../pages/org_statuscheck_page/orgstatuscheck_page.jsx";
import Apps_page from "../pages/apps_page/apps_page.jsx";
import AdminAcc_page from "../pages/admin_acc_page/adminacc_page.jsx";
import OrgStatusEdit_page from "../pages/org_statusedit_page/orgstatusedit_page.jsx";
import UsersTable_page from "../pages/users_table_page/userstable_page.jsx";
import React from "react";
import OrgTable_page from "../pages/org_table_page/orgtable_page.jsx";
import CreateServices_page from "../pages/create_services_page/createservices_page.jsx";



export default function RouterApp(){

    return(
            <Routes>
                <Route path="/" element={<Main_page />}/>
                <Route path="/user_acc_page" element={<UserAcc_page />}/>
                <Route path="/apps_page" element={<Apps_page />}/>
                <Route path="/org_reg_page" element={<OrgReg_page />}/>
                <Route path="/org_statuscheck_page" element={<OrgStatusCheck_page />}/>
                <Route path="/create_services_page" element={<CreateServices_page />}/>
                <Route path="/org_statusedit_page" element={<OrgStatusEdit_page />}/>
                <Route path="/admin_acc_page" element={<AdminAcc_page />}/>
                <Route path="/userstable_page" element={<UsersTable_page />}/>
                <Route path="/orgtable_page" element={<OrgTable_page />}/>
            </Routes>
    )
}