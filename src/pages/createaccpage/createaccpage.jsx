import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Createaccpage({ onClose }) {
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
    
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmail(emailValue);
        setErrorMessage((prev) => ({
            ...prev,
            email: isValidEmail.test(emailValue) ? "" : "Некорректный email."
        }));
    };

    const handleSurnameChange = (e) => {
        const surnameValue = e.target.value;
        const isValidSurname = /^[А-ЯЁа-яё\-]+$/;
        setSurname(surnameValue);
        setErrorMessage((prev) => ({
            ...prev,
            surname: isValidSurname.test(surnameValue) ? "" : "Фамилия должна содержать только русские буквы."
        }));
    };


    const handleNameChange = (e) => {
        const nameValue = e.target.value;
        const isValidName = /^[А-ЯЁа-яё\-]+$/;
        setName(nameValue);
        setErrorMessage((prev) => ({
            ...prev,
            name: isValidName.test(nameValue) ? "" : "Имя должно содержать только русские буквы."
        }));
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        const isValidPhone = /^(\+7|8)\d{10}$/;
        setPhone(phoneValue);
        setErrorMessage((prev) => ({
            ...prev,
            phone: isValidPhone.test(phoneValue) ? "" : "Формат: +7XXXXXXXXXX или 8XXXXXXXXXX."
        }));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        if (
            errorMessage.email || errorMessage.surname || errorMessage.name || errorMessage.phone ||
            !email || !surname || !name || !phone || !code || !termsAccepted
        ) {
            setErrorMessage((prev) => ({
                ...prev,
                form: "Пожалуйста, заполните все поля корректно и примите соглашение."
            }));
            return;
        }
        navigate("/user");
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="createacc">
                <div className="header-container">
                    <h1 className="headcreatepage">СОЗДАНИЕ АККАУНТА</h1>
                    <button className="createaccclosebutton" onClick={handleCloseModal}>✖</button>
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
                        {errorMessage.email && <div className="createaccerror-message">{errorMessage.email}</div>}
                    </div>
                    <div className="input-group">
                        <h4>ФАМИЛИЯ:</h4>
                        <input className="inputcreateacc"
                            type="text"
                            placeholder="Введите фамилию"
                            value={surname}
                            onChange={handleSurnameChange}
                        />
                        {errorMessage.surname && <div className="createaccerror-message">{errorMessage.surname}</div>}
                    </div>
                    <div className="input-group">
                        <h4>ИМЯ:</h4>
                        <input className="inputcreateacc"
                            type="text"
                            placeholder="Введите имя"
                            value={name}
                            onChange={handleNameChange}
                        />
                        {errorMessage.name && <div className="createaccerror-message">{errorMessage.name}</div>}
                    </div>
                    <div className="input-group">
                        <h4>НОМЕР ТЕЛЕФОНА:</h4>
                        <input className="inputcreateacc"
                            type="text"
                            placeholder="Введите номер"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        {errorMessage.phone && <div className="createaccerror-message">{errorMessage.phone}</div>}
                    </div>
                </div>
                <div className="terms-container">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <label htmlFor="terms">Я принимаю <a href="#" target="_blank" rel="noopener noreferrer">пользовательское соглашение</a></label>
                </div>
                {errorMessage.form && <div className="createaccerror-message">{errorMessage.form}</div>}
                <div className="footercreateacc">
                    <button className="createaccbutton">ПОЛУЧИТЬ КОД</button>
                    <input className="inputcreateacc"
                        type="text"
                        placeholder="Введите код"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="createaccbutton" onClick={() => navigate("/org/reg")}>СОЗДАТЬ АККАУНТ</button>
                </div>
            </div>
        </div>
    );
}

export default Createaccpage;
