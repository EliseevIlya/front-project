import { Route, Routes } from "react-router";
import Createaccpage from "../pages/createaccpage/createaccpage.jsx"
import Loginpage from "../pages/loginpage/loginpage.jsx";
import Main_page from "../pages/main_page/main_page.jsx";


export default function RouterApp(){

    return(
            <Routes>
                <Route path="/loginpage" element={<Loginpage />}/>
                <Route path="/createaccpage" element={<Createaccpage />}/>
                <Route path="/" element={<Main_page />}/>
            </Routes>
    )
}