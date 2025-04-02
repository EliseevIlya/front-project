import "./style.css";
import { deleteCustomer } from "../../api/Customer";
import {useNavigate} from "react-router-dom";

function Deleteaccpage({ onClose }) {
    const navigate = useNavigate();

    const deleteaccpage = async () => {
        const success = await deleteCustomer(localStorage.getItem("jwt"))
        if (success) {
            console.log("Удален");// Устанавливаем только если код успешно отправлен
            navigate("/")
        } else {
            console.log("Ошибка при отправке кода. Попробуйте снова.");
        }
    }

    return (
        <div className="overlay">
            <div className="deleteacc">
                <header>
                    <h1 className="h1_deleteaccpage">ВНИМАНИЕ!</h1>
                </header>
                <div>
                    <h3 className="warning-text">
                        ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ УДАЛИТЬ СВОЙ АККАУНТ?
                    </h3>
                </div>
                <div className="footer_deleteaccpage">
                    <button className="cancel-button" onClick={onClose}>ОТМЕНА</button>
                    <button className="delete-button" onClick={deleteaccpage}>УДАЛИТЬ</button>
                </div>
            </div>
        </div>
    );
}

export default Deleteaccpage;
