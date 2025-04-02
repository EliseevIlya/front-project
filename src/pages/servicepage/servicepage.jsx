import "./style.css"
import { useNavigate } from "react-router"

function Servicepage(){
    const navigate = useNavigate()
    return (
        <div className="maindiv">
            <div className="headersservice">
                <button className="accbuttonApps" title="Личный кабинет" onClick={() => navigate("/user")}>
                    <img src="/src/icons/profile.png" alt="Личный кабинет"/>
                </button>
                <h1 className="title">ВЫБЕРИТЕ УСЛУГУ</h1>
            </div>
            <div className="buttons-containerservice">
                <div className="wash-card" onClick={() => navigate("/washing")}>
                    <h2>МОЙКА</h2>
                    <img src="/src/icons/car-wash.png" alt="МОЙКА" className="service-image"/>
                </div>

                <div className="tyre-card" onClick={() => navigate("/installation")}>
                    <h2>ШИНОМОНТАЖ</h2>
                    <img src="/src/icons/tyre.png" alt="ШИНОМОНТАЖ" className="service-image"/>
                </div>
            </div>
        </div>
    )
}

export default Servicepage;
