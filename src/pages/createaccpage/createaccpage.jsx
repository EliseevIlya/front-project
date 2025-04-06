import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { registercustomer, sendcode } from "../../api/Auth";


function Createaccpage() {
    const [email, setEmail] = useState("");
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        surname: "",
        name: "",
        phone: "",
        form: ""
    });

    const [isCodeEnabled, setIsCodeEnabled] = useState(false);
    const [isCodeInputEnabled, setIsCodeInputEnabled] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (emailValue) => {
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
        return isValidEmail.test(emailValue) ? "" : "Некорректный email.";
    };

    const validateSurname = (surnameValue) => {
        const isValidSurname = /^[А-ЯЁа-яё\-]+$/;
        return isValidSurname.test(surnameValue) ? "" : "Фамилия должна содержать только русские буквы.";
    };

    const validateName = (nameValue) => {
        const isValidName = /^[А-ЯЁа-яё\-]+$/;
        return isValidName.test(nameValue) ? "" : "Имя должно содержать только русские буквы.";
    };

    const validatePhone = (phoneValue) => {
        const isValidPhone = /^([87])\d{10}$/;
        return isValidPhone.test(phoneValue) ? "" : "Формат: 7XXXXXXXXXX или 8XXXXXXXXXX";
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setErrorMessage((prev) => ({
            ...prev,
            email: validateEmail(emailValue)
        }));

        if (validateEmail(emailValue) === "" && termsAccepted) {
            setIsCodeEnabled(true);
        } else {
            setIsCodeEnabled(false);
        }
    };

    const handleSurnameChange = (e) => {
        const surnameValue = e.target.value;
        setSurname(surnameValue);
        setErrorMessage((prev) => ({
            ...prev,
            surname: validateSurname(surnameValue)
        }));
    };

    const handleNameChange = (e) => {
        const nameValue = e.target.value;
        setName(nameValue);
        setErrorMessage((prev) => ({
            ...prev,
            name: validateName(nameValue)
        }));
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/\D/g, "").slice(0, 11);
        setPhone(phoneValue);
        setErrorMessage((prev) => ({
            ...prev,
            phone: validatePhone(phoneValue)
        }));
    };

    const handleCodeChange = (e) => {
        const codeValue = e.target.value.replace(/\D/g, "");
        setCode(codeValue);
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
        setIsCodeInputEnabled(true)
    };

    const handleCreateAccount = async () => {
        if (!email || !surname || !name || !phone || !code || !termsAccepted) {
            setErrorMessage((prev) => ({
                ...prev,
                form: "Пожалуйста, заполните все поля и примите условия."
            }));
            return;
        }
        const success = await registercustomer(surname,name,"",phone,"",email, code);
                console.log("SUCCESS",success);
                if (success) {
                    navigate("/");
                } else {
                    setErrorMessage("Перепроверьте код");
                }

    };

    const getFirstError = () => {
        // Порядок проверки ошибок
        if (errorMessage.email) return errorMessage.email;
        if (errorMessage.surname) return errorMessage.surname;
        if (errorMessage.name) return errorMessage.name;
        if (errorMessage.phone) return errorMessage.phone;
        if (errorMessage.form) return errorMessage.form;
        return "";
    };

    return (
        <div className="overlay">
            <div className="createacc">
                <div className="header-container">
                    <h1 className="headcreatepage">СОЗДАНИЕ АККАУНТА</h1>
                    <button className="createaccclosebutton" onClick={() => navigate("/")}>✖</button>
                </div>
                <div className="input-container">
                    <div className="input-group">
                        <h4>E-MAIL :</h4>
                        <input className="inputcreateacc"
                               type="text"
                               placeholder="Введите e-mail"
                               value={email}
                               onChange={handleEmailChange}
                        />
                    </div>
                    <div className="input-group">
                        <h4>ФАМИЛИЯ:</h4>
                        <input className="inputcreateacc"
                               type="text"
                               placeholder="Введите фамилию"
                               value={surname}
                               onChange={handleSurnameChange}
                        />
                    </div>
                    <div className="input-group">
                        <h4>ИМЯ:</h4>
                        <input className="inputcreateacc"
                               type="text"
                               placeholder="Введите имя"
                               value={name}
                               onChange={handleNameChange}
                        />
                    </div>
                    <div className="input-group">
                        <h4>НОМЕР ТЕЛЕФОНА:</h4>
                        <input className="inputcreateacc"
                               type="text"
                               placeholder="Введите номер"
                               value={phone}
                               onChange={handlePhoneChange}
                        />
                    </div>
                </div>
                <div className="terms-container">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => {
                            setTermsAccepted(e.target.checked);
                            if (validateEmail(email) === "" && e.target.checked) {
                                setIsCodeEnabled(true); // Если email и условия корректны, активируем кнопку
                            } else {
                                setIsCodeEnabled(false);
                            }
                        }}
                    />
                    <label htmlFor="terms" className="texthref">Я принимаю <a href="https://policies.google.com/privacy?hl=ru"
                                                         target="_blank" rel="noopener noreferrer">пользовательское
                        соглашение</a></label>
                </div>
                {getFirstError() && <div className="createaccerror-message">{getFirstError()}</div>}
                <div className="footercreateacc">

                    <button className="createaccbutton" onClick={handleGetCode} disabled={!isCodeEnabled}>ПОЛУЧИТЬ КОД</button>

                    <input className="inputcreateacc"
                           type="text"
                           placeholder="Введите код"
                           value={code}
                           onChange={handleCodeChange}
                           disabled={!isCodeInputEnabled}/>
                    <button className="createaccbutton" onClick={handleCreateAccount} disabled={!code}>СОЗДАТЬ АККАУНТ
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Createaccpage;
