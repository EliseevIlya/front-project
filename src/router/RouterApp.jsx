import { Route, Routes } from "react-router";
import Hellopages from "../pages/HelloPages/HelloPages";


export default function RouterApp(){

    return(
            <Routes>
                <Route path="/" element={<Hellopages />}/>
            </Routes>
    )
}