import "./style.css"
import { useNavigate } from "react-router"

function Servicepage(){
    const navigate = useNavigate()
    return (
        <div className="maindiv">
      <h1 className="title">ВЫБЕРИТЕ УСЛУГУ</h1>
        <div className="buttons-containerservice">
            <button className="washing" onClick={() => navigate ("/service/washing")}>МОЙКА</button>

            <button className="installation" onClick={() => navigate ("/service/installation")}>ШИНОМОНТАЖ</button>
            </div>
        </div> 
    )
}

export default Servicepage;