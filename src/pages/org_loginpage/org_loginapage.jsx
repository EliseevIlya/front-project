import {useEffect, useState} from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { authorg } from "../../api/Auth";
import { sendcode} from "../../api/Auth.js";
import {getOneOrganization} from "../../api/Org.js";

function OrgLoginPage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isCodeEnabled, setIsCodeEnabled] = useState(false);
    const [responseStatus, setResponseStatus] = useState(false);
    const [requestStatus, setRequestStatus] = useState("");
    const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwt") || null);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

        if (isValidEmail.test(emailValue)) {
            setEmail(emailValue);
            setErrorMessage("");
        } else {
            setEmail(emailValue);
            setErrorMessage("Пожалуйста, введите корректный email.");
        }
    };

    const handleGetCode = async () => {
        if (!email ) {
            setErrorMessage("Введите корректный email перед получением кода.");
            return;
        }

        const success = await sendcode(email);
        if (success) {
            setIsCodeEnabled(true); // Устанавливаем только если код успешно отправлен
        } else {
            setErrorMessage("Ошибка при отправке кода. Попробуйте снова.");
        }
    };

    useEffect(() => {
        const getOrganization = async () => {
            if ( jwtToken) {
                try {
                    const response = await getOneOrganization(jwtToken);
                    setRequestStatus(response.connectionRequestStatus);
                    console.log("Статус запроса:", response.connectionRequestStatus);
                } catch (error) {
                    console.error("Ошибка при получении статуса организации:", error);
                }
            }
        };

        const checkRequestStatus = () => {
            if (requestStatus == "COMPLETED") {
                navigate("/create_services")
            }
            else if (requestStatus != "" ) {
                navigate("/org_statuscheck")
            }
        }

        getOrganization();
        checkRequestStatus();
    }, [jwtToken,requestStatus]);

const handleSubmit = async () => {
        if (errorMessage || !email || !code) {
            setErrorMessage("Пожалуйста, заполните все поля корректно.");
            return;
        }

    try {
        const token = await authorg(email, code); // Ждём получения токена

        if (token) {
            setJwtToken(token); // Обновляем состояние (запускает useEffect)
            localStorage.setItem("role", "org");
        } else {
            setErrorMessage("Ошибка авторизации. Проверьте данные.");
        }
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        setErrorMessage("Ошибка авторизации. Попробуйте снова.");
    }
};


    const handleCloseModal = () => {
        setIsModalOpen(false);
        window.location.reload();
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="divloginpage">
                <div className="header-container">
                    <h1 className="headerorgpage">ОРГАНИЗАЦИЯ - ПАРТНЕР</h1>
                    <button className="loginpageclosebutton" onClick={handleCloseModal}>×</button>
                </div>
                <div className="input-group">
                    <h4>E-MAIL :</h4>
                    <input
                        className="inputloginpage"
                        type="text"
                        placeholder="Введите e-mail"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <button
                        className="loginpagebutton"
                        onClick={handleGetCode}
                        disabled={!email || errorMessage}
                    >
                        ПОЛУЧИТЬ КОД
                    </button>
                </div>
                <div className="input-group">
                    <input
                        className="inputloginpage"
                        type="text"
                        placeholder="Введите код"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={!isCodeEnabled}
                    />
                    {isCodeEnabled && (
                        <p className="loginpage-info">
                            Если вы не получили код, пожалуйста, проверьте папку "Спам"!
                        </p>
                    )}
                </div>
                {errorMessage && <div className="loginpageerror-message">{errorMessage}</div>}
                <div className="footerloginpage">
                    <h6 onClick={() => navigate("/org_reg")}>СТАТЬ ПАРТНЕРОМ</h6>
                    <button className="loginpagebutton" onClick={handleSubmit}>ВОЙТИ</button>
                </div>
            </div>
        </div>
    );
}

export default OrgLoginPage;
