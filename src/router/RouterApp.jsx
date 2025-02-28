import { Route, Routes } from "react-router";
import Hellopages from "../pages/HelloPages/HelloPages";
import Main_page from "../pages/main_page/main_page.jsx";



export default function RouterApp(){

    return(
            <Routes>
                <Route path="/" element={<Main_page />}/>
            </Routes>
    )
}