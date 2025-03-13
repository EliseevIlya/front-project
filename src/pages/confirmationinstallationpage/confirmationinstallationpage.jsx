import { useNavigate } from "react-router";
import "./style.css"

function Confirmationinstallationpage() {
    const navigate = useNavigate()
    const onConfirmation= ()=>{
        navigate("/user")
    }
    return (
        <div className="confirmationpage">
            <header>
                <h1>ПОДТВЕРЖДЕНИЕ ЗАПИСИ</h1>
            </header>
            <div>
                <h3 className="confirmationinstallation-text">
                    ЖДЕМ ВАС СЕГОДНЯ В 10:00 - 11:40 ПО АДРЕСУ:
                </h3>
            </div>
            <div>
                <button className="confirmation-buttoninstallation" onClick={()=>{onConfirmation()}}>ОК</button>
            </div>
        </div>
    );
}

export default Confirmationinstallationpage;