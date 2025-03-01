import { Route, Routes } from "react-router";

import Loginpage from "../pages/loginpage/loginpage.jsx";


export default function RouterApp(){

    return(
            <Routes>
                <Route path="/" element={<Loginpage />}/>
            </Routes>
    )
}