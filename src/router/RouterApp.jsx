import { Route, Routes } from "react-router";
import Createaccpage from "../pages/createaccpage/createaccpage.jsx"
import Loginpage from "../pages/loginpage/loginpage.jsx";
import Org_loginpage from "../pages/org_loginpage/org_loginapage.jsx";
import Deleteaccpage from "../pages/deleteaccpage/deleteaccpage.jsx";
import Deleteparthpage from "../pages/deletepartnership/deletepartnership.jsx";
import Deleteuseraccpage from "../pages/deleteuseraccpage/deleteuseraccpage.jsx";
import Deleterequest from "../pages/deleterequestpage/deleterequestpage.jsx";
import Confirmationwashingpage from "../pages/confirmationwashingpage/confirmationwashingpage.jsx";
import Confirmationinstallationpage from "../pages/confirmationinstallationpage/confirmationinstallationpage.jsx";
import Enteraccpage from "../pages/enteraccpage/enteraccpage.jsx";
import Servicepage from "../pages/servicepage/servicepage.jsx";
import Washingservice from "../pages/washingservice/washingservice.jsx";
import Confirmdeletion from "../pages/confirmdeletion/confirmdeletion.jsx";
import Installationservice from "../pages/installationservice/installationservice.jsx";
import PioneerForms from "../pages/pioneerforms/pioneerforms.jsx";



export default function RouterApp(){
    return(
            <Routes>
                <Route path="/loginpage" element={<Loginpage />}/>
                <Route path="/createaccpage" element={<Createaccpage />}/>
                <Route path="/org_loginpage" element={<Org_loginpage />}/>
                <Route path="/deleteaccpage" element={<Deleteaccpage />}/>
                <Route path="/deleteparthpage" element={<Deleteparthpage />}/>
                <Route path="/deleteuseraccpage" element={<Deleteuseraccpage />}/>
                <Route path="/deleterequest" element={<Deleterequest />}/>
                <Route path="/confirmationwashingpage" element={<Confirmationwashingpage />}/>
                <Route path="/confirmationinstallationpage" element={<Confirmationinstallationpage />}/>
                <Route path="/enteraccpage" element={<Enteraccpage />}/>
                <Route path="/servicepage" element={<Servicepage />}/>
                <Route path="/washingservice" element={<Washingservice />}/>
                <Route path="/confirmdeletion" element={<Confirmdeletion />}/>
                <Route path="/installationservice" element={<Installationservice />}/>
                <Route path="/pioneerforms" element={<PioneerForms />}/>
            </Routes>
    )
}