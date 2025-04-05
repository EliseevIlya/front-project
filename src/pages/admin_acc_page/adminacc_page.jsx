import React, { useState } from "react";
import "./style_adminacc.css";
import { useNavigate } from "react-router-dom";

function AdminAcc_page() {
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState("");
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const saveChanges = () => {
        if (areRequiredFieldsValid()) {
            // Save changes logic here
            console.log("Changes saved");
            setIsEditing(false); // Exit edit mode after saving
        }
    };

    const validateEmail = (emailValue) => {
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
        return isValidEmail.test(emailValue);
    };

    const validateSurname = (surnameValue) => {
        const isValidSurname = /^[А-ЯЁа-яё\-]+$/;
        return isValidSurname.test(surnameValue);
    };

    const validateName = (nameValue) => {
        const isValidName = /^[А-ЯЁа-яё\-]+$/;
        return isValidName.test(nameValue);
    };

    const validatePhone = (phoneValue) => {
        const isValidPhone = /^(\7|8)\d{10}$/;
        return isValidPhone.test(phoneValue);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/\D/g, "").slice(0, 11);
        setPhone(phoneValue);
    };

    const areRequiredFieldsValid = () => {
        const isEmailValid = validateEmail(email);
        const isSurnameValid = validateSurname(surname);
        const isNameValid = validateName(name);
        const isPhoneValid = validatePhone(phone);

        if (!isEmailValid || !isSurnameValid || !isNameValid || !isPhoneValid) {
            setErrorMessage("Заполните все обязательные поля корректно!");
            return false;
        }

        setErrorMessage("");
        return true;
    };

    return (
        <div>
            <div className="headeradmin">
                <button className="exitbuttonadmin" title="Выйти из аккаунта" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <button className="homebuttonadmin" title="Вернуться на главную" onClick={() => navigate("/")}>
                    <h1>Администратор</h1>
                    <img src="/src/icons/home.png" alt="Home"/>
                </button>
            </div>
            <h2 className="textServices">Личный кабинет</h2>

            <div className="controlpanel">
                <div className="info">
                    <div className="infoitem">
                        <label>Должность*:</label>
                        <input type="text" disabled={!isEditing}/>
                    </div>
                    <div className="infoitem">
                        <label>Фамилия*:</label>
                        <input type="text" value={surname} onChange={handleSurnameChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>Имя*:</label>
                        <input type="text" value={name} onChange={handleNameChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>Отчество:</label>
                        <input type="text" disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>Номер тел.*:</label>
                        <input type="text" value={phone} onChange={handlePhoneChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>E-mail*:</label>
                        <input type="text" value={email} onChange={handleEmailChange} disabled={!isEditing} />
                    </div>
                </div>
                <div className="control">
                    <div className="controlitem">
                        <label>Заявки: </label>
                        <button onClick={() => navigate("/org_apps")}>Перейти</button>
                    </div>
                    <div className="controlitem">
                        <label>Пользователи: </label>
                        <button onClick={() => navigate("/table_user")}>Перейти</button>
                    </div>
                    <div className="controlitem">
                        <label>Организации: </label>
                        <button onClick={() => navigate("/table_org")}>Перейти</button>
                    </div>
                </div>
            </div>

            <div className="buttonplateAdmin">
                {!isEditing ? (
                    <button className="editbuttonAdmin" onClick={toggleEdit}>
                        Изменить
                    </button>
                ) : (
                    <>
                        <button className="editbuttonAdmin" onClick={saveChanges}>
                            Сохранить
                        </button>
                    </>
                )}
            </div>
            {errorMessage && <span className="error">{errorMessage}</span>}
        </div>
    );
}

export default AdminAcc_page;