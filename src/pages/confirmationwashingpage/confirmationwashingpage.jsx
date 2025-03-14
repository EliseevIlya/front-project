import "./style.css"
import { useNavigate } from "react-router";
function Confirmationwashingpage() {
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
                <h3 className="confirmationwashing-text">
                    ЖДЕМ ВАС СЕГОДНЯ В 10:00 - 11:40 ПО АДРЕСУ:
                </h3>
            </div>
            <div>
                <button className="confirmation-buttonwashing" onClick={()=>{onConfirmation()}}>ОК</button>
            </div>
        </div>
    );
}

function App() {
    const [isModalOpen, setModalOpen] = useState(true);

    return (
        <div>
            <ConfirmationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default App;