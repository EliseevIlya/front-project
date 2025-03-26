import { Route, Routes } from "react-router";
import Createaccpage from "../pages/createaccpage/createaccpage.jsx"
import Org_loginpage from "../pages/org_loginpage/org_loginapage.jsx";
import Deleteaccpage from "../pages/deleteaccpage/deleteaccpage.jsx";
import Deleteparthpage from "../pages/deletepartnership/deletepartnership.jsx";
import Deleterequest from "../pages/deleterequestpage/deleterequestpage.jsx";
import Confirmationwashingpage from "../pages/confirmationwashingpage/confirmationwashingpage.jsx";
import Confirmationinstallationpage from "../pages/confirmationinstallationpage/confirmationinstallationpage.jsx";
import Enteraccpage from "../pages/enteraccpage/enteraccpage.jsx";
import Servicepage from "../pages/servicepage/servicepage.jsx";
import Washingservice from "../pages/washingservice/washingservice.jsx";
import Confirmdeletion from "../pages/confirmdeletion/confirmdeletion.jsx";
import Installationservice from "../pages/installationservice/installationservice.jsx";
import PioneerForms from "../pages/pioneerforms/pioneerforms.jsx";
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
import OrgInfo_page from "../pages/org_info_page/orginfo_page.jsx";
import NotFoundPage from "../pages/404erorr_page/404_page.jsx";
import NotAccessPage from "../pages/403error_page/403_page.jsx";


export default function RouterApp(){
    return(
            <Routes>
                <Route path="/createaccpage" element={<Createaccpage />}/>
                <Route path="/org_loginpage" element={<Org_loginpage />}/>
                <Route path="/deleteaccpage" element={<Deleteaccpage />}/>
                <Route path="/deleteparthpage" element={<Deleteparthpage />}/>
                <Route path="/deleterequest" element={<Deleterequest />}/>
                <Route path="/confirmationwashingpage" element={<Confirmationwashingpage />}/>
                <Route path="/confirmationinstallationpage" element={<Confirmationinstallationpage />}/>
                <Route path="/enteraccpage" element={<Enteraccpage />}/>
                <Route path="/confirmdeletion" element={<Confirmdeletion />}/>
                <Route path="/service" element={<Servicepage />}/>
                <Route path="/service/washing" element={<Washingservice />} />
                <Route path="/service/installation" element={<Installationservice />}/>
                <Route path="/org/forms" element={<PioneerForms />}/>
                <Route path="/" element={<Main_page />}/>
                <Route path="/user" element={<UserAcc_page />}/>
                <Route path="/user/request" element={<Apps_page />}/>
                <Route path="/org/reg" element={<OrgReg_page />}/>
                <Route path="/org/statuscheck" element={<OrgStatusCheck_page />}/>
                <Route path="/org_info_page" element={<OrgInfo_page />}/>
                <Route path="/create/services" element={<CreateServices_page />}/>
                <Route path="/org_statusedit" element={<OrgStatusEdit_page />}/>
                <Route path="/admin_acc_page" element={<AdminAcc_page />}/>
                <Route path="/userstable_page" element={<UsersTable_page />}/>
                <Route path="/orgtable_page" element={<OrgTable_page />}/>
                <Route path="/404error_page" element={<NotFoundPage />}/>
                <Route path="/403error_page" element={<NotAccessPage />}/>
            </Routes>
    )
}