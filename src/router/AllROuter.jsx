import Main_page from "../pages/main_page/main_page.jsx";
import {Route, Routes} from "react-router";
import AdminAcc_page from "../pages/admin_acc_page/adminacc_page.jsx";
import Createaccpage from "../pages/createaccpage/createaccpage.jsx";
import UserAcc_page from "../pages/user_acc_page/useracc_page.jsx";
import Apps_page from "../pages/apps_page/apps_page.jsx";
import Servicepage from "../pages/servicepage/servicepage.jsx";
import Washingservice from "../pages/washingservice/washingservice.jsx";
import React from "react";
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
            url: "/washing",
            Pages: <Washingservice />
        },
        {
            url: "/",
            Pages: <Main_page />
        },
        {
            url: "/",
            Pages: <Main_page />
        },
        {
            url: "/",
            Pages: <Main_page />
        },
        {
            url: "/",
            Pages: <Main_page />
        },
        {
            url: "/adminacc",
            Pages: <AdminAcc_page />
        },
        {
            url: "/",
            Pages: <Main_page />
        },
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