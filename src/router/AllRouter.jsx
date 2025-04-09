import Main_page from "../pages/main_page/main_page.jsx";
import {Route, Routes} from "react-router";
import AdminAcc_page from "../pages/admin_acc_page/adminacc_page.jsx";
import Createaccpage from "../pages/createaccpage/createaccpage.jsx";
import UserAcc_page from "../pages/user_acc_page/useracc_page.jsx";
import Apps_page from "../pages/apps_page/apps_page.jsx";
import Servicepage from "../pages/servicepage/servicepage.jsx";
import React from "react";
import OrgInfo_page from "../pages/org_info_page/orginfo_page.jsx";
import OrgReg_page from "../pages/org_reg_page/orgreg_page.jsx";
import OrgStatusCheck_page from "../pages/org_statuscheck_page/orgstatuscheck_page.jsx";
import CreateServices_page from "../pages/create_services_page/createservices_page.jsx";
import OrgStatusEdit_page from "../pages/org_statusedit_page/orgstatusedit_page.jsx";
import OrgTable_page from "../pages/org_table_page/orgtable_page.jsx";
import UsersTable_page from "../pages/users_table_page/userstable_page.jsx";
import PioneerForms from "../pages/pioneerforms/pioneerforms.jsx";
import SelectServices_Page from "../pages/select_services_page/selectservices_page.jsx";
import Washingservice from "../pages/washingservice/washingservice.jsx";
import NotFoundPage from "../pages/404erorr_page/404_page.jsx";
import OrgDetailModal from "../pages/org_detail_modal/org_detailmodal.jsx";
import OrgApps_page from "../pages/org_apps_page/orgapps_page.jsx";
export default function AllRouterrApp(props){
    console.log(props.auth)
    const AllUrl = [
    {
        url: "/",
        Pages: <Main_page />
    },
        {
            url: "/create_acc",
            Pages: <Createaccpage />
        },
        {
            url: "/user_acc",
            Pages: <UserAcc_page />
        },
        {
            url: "/apps",
            Pages: <Apps_page />
        },
        {
            url: "/service",
            Pages: <Servicepage />
        },
        {
            url: "/select_service",
            Pages: <SelectServices_Page />
        },
        {
            url: "/washing",
            Pages: <Washingservice />
        },
        {
            url: "/org_info",
            Pages: <OrgInfo_page />
        },
        {
            url: "/org_apps",
            Pages: <OrgApps_page />
        },
        {
            url: "/org_reg",
            Pages: <OrgReg_page />
        },
        {
            url: "/org_statuscheck",
            Pages: <OrgStatusCheck_page />
        },
        {
            url: "/create_services",
            Pages: <CreateServices_page />
        },
        {
            url: "/adminacc",
            Pages: <AdminAcc_page />
        },
        {
            url: "/org_apps",
            Pages: <PioneerForms />
        },
        {
            url: "/org_statusedit",
            Pages: <OrgStatusEdit_page />
        },
        {
            url: "/table_org",
            Pages: <OrgTable_page />
        },
        {
            url: "/table_user",
            Pages: <UsersTable_page />
        },

        {
            url: "/user",
            Pages: <UserAcc_page />
        },{
            url: "/*",
            Pages: <NotFoundPage />
        }
    ]
    return(
        <Routes>
            {
                AllUrl.map((element)=>{
                    return(
                        <Route path={element.url} element={element.Pages}/>
                    )
                })
            }
        </Routes>
    )
}