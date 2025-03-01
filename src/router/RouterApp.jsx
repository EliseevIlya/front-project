import { Route, Routes } from "react-router";
import Createaccpage from "../pages/createaccpage/createaccpage.jsx"
import Loginpage from "../pages/loginpage/loginpage.jsx";



export default function RouterApp(){

    return(
            <Routes>
                <Route path="/loginpage" element={<Loginpage />}/>
                <Route path="/createaccpage" element={<Createaccpage />}/>
            </Routes>
    )
}