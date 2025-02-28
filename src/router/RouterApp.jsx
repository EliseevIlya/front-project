import { Route, Routes } from "react-router";

import Main_page from "../pages/main_page/main_page.jsx";


export default function RouterApp(){

    return(
            <Routes>
                <Route path="/" element={<Main_page />}/>
            </Routes>
    )
}