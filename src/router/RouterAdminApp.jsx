import Createaccpage from "../pages/createaccpage/createaccpage.jsx";
import Org_loginpage from "../pages/org_loginpage/org_loginapage.jsx";
import Main_page from "../pages/main_page/main_page.jsx";
import OrgStatusEdit_page from "../pages/org_statusedit_page/orgstatusedit_page.jsx";
import AdminAcc_page from "../pages/admin_acc_page/adminacc_page.jsx";
import UsersTable_page from "../pages/users_table_page/userstable_page.jsx";
import NotFoundPage from "../pages/erorr_page/404_page.jsx"
import OrgTable_page from "../pages/org_table_page/orgtable_page.jsx"
import { Routes } from "react-router";
import { Route } from "react-router";

export default function RouterAdminApp(){

    const Adminurl = [{
        url: "/createaccpage",
        Pages: <Createaccpage />
    }, 
    {
        url: "/org_loginpage",
        Pages: <Org_loginpage />
    },
    {
        url: "/",
        Pages: <Main_page />
    },
    {
        url: "/admin/status/edit",
        Pages: <OrgStatusEdit_page />
    },
    {
        url: "/admin",
        Pages: <AdminAcc_page />
    },
    {
        url: "/admin/table/user",
        Pages: <UsersTable_page />
    },
    {
        url: "/admin/table/org",
        Pages: <OrgTable_page />
    },{
        url: "/*",
        Pages: <NotFoundPage />
    },

    ]
    return(
        <Routes>
            {
                Adminurl.map((element)=>{
                    return(
                        <Route path={element.url} element={element.Pages}/>
                    )
                })
            }
        </Routes>
    )
}