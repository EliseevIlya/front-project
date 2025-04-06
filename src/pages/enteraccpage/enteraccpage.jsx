import {useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { authadmin, sendcode} from "../../api/Auth.js";

function Enteraccpage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [codeError, setCodeError] = useState("");
    const [isCodeEnabled, setIsCodeEnabled] = useState(false);
    const navigate = useNavigate();

    const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload();
    };

    const validateLogin = (login) => {
        const loginRegex = /[a-zA-Z]/;
        if (login.length < 5 || !loginRegex.test(login)) {
            setLoginError("Логин должен содержать минимум 5 символов, включая хотя бы одну букву.");
        } else {
            setLoginError("");
        }
    };

    const validatePassword = (password) => {
        const passwordRegex = /[a-zA-Z]/;
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

    const handleGetCode = async () => {
        if (!login || loginError || isCodeEnabled) {
            setCodeError("Введите корректный логин перед получением кода.");
            return;
        }
        try {
            const success = await sendcode(login);
            console.log("sendcode result:", success); 
    
            if (success) {
                setIsCodeEnabled(true);
                setCodeError("");
            } else {
                setCodeError("Ошибка при отправке кода. Попробуйте снова.");
            }
        } catch (error) {
            console.error("Ошибка при отправке кода:", error);
            setCodeError("Ошибка сети. Попробуйте снова.");
        }
    };

    const handleSubmit = async () => {
        if (loginError || passwordError || codeError || !login || !password || !code) {
            setCodeError("Пожалуйста, заполните все поля корректно.");
            return;
        }
        const token = await authadmin(login, password, code);
        if (token) {
            navigate("/adminacc");
        } else {
            setCodeError("Неверный код. Попробуйте снова.");
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
                    {loginError && <div className="enteraccerror-message">{loginError}</div>}

                    <h3 className="password-enterpage">ПАРОЛЬ :</h3>
                    <input
                        type="password"
                        className="password-textfield"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <div className="enteraccerror-message">{passwordError}</div>}
                    <button className="get-code-button" onClick={handleGetCode} disabled={!login}>ПОЛУЧИТЬ КОД</button>

                    <h3 className="code-enterpage">КОД :</h3>
                    <input
                        className="code-textfield"
                        type="text"
                        placeholder="Введите код"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={!isCodeEnabled}
                    />
                    {codeError && <div className="enteraccerror-message">{codeError}</div>}

                    <button
                        className="enter-enterpage"
                        onClick={handleSubmit}
                        disabled={loginError || passwordError || codeError || !login || !password || !code}
                    >
                        ВОЙТИ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Enteraccpage;
