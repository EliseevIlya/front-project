import {useState} from "react";
import "./style.css";
import {useNavigate} from "react-router-dom";

function Enteraccpage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(true); // Добавлено состояние модального окна
    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload();
    };

    const validateLogin = (login) => {
        const loginRegex = /[a-zA-Z]/; // проверка на наличие хотя бы одной буквы
        if (login.length < 5 || !loginRegex.test(login)) {
            setLoginError("Логин должен содержать минимум 5 символов, включая хотя бы одну букву.");
        } else {
            setLoginError("");
        }
    };

    const validatePassword = (password) => {
        const passwordRegex = /[a-zA-Z]/; // проверка на наличие хотя бы одной буквы
        if (password.length < 5 || !passwordRegex.test(password)) {
            setPasswordError("Пароль должен содержать минимум 5 символов, включая хотя бы одну букву.");
        } else {
            setPasswordError("");
        }
    };

    const handleLoginChange = (e) => {
        const value = e.target.value;
        setLogin(value);
        validateLogin(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleSubmit = () => {
        if (!loginError && !passwordError && login && password) {
            navigate("/admin_acc_page");
        }
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="enteracc">
                <div className="header-container">
                    <h3 className="header-title">ВОЙТИ В АККАУНТ АДМИНИСТРАТОРА</h3>
                    <button className="loginpageclosebutton" onClick={closeModal}>×</button>
                </div>
                <div className="input-group">
                    <h3 className="login-enterpage">ЛОГИН :</h3>
                    <input
                        className="login-textfield"
                        placeholder="Введите логин"
                        value={login}
                        onChange={handleLoginChange}
                    />
                    {loginError && <div className="logerror">{loginError}</div>}

                    <h3 className="password-enterpage">ПАРОЛЬ :</h3>
                    <input
                        type="password"
                        className="password-textfield"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <div className="logerror">{passwordError}</div>}

                    <button className="enter-enterpage" onClick={handleSubmit}
                            disabled={loginError || passwordError || !login || !password}>ВОЙТИ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Enteraccpage;
