import React, {useEffect, useState} from "react";
import "./style_adminacc.css";
import { useNavigate } from "react-router-dom";
import {getAdminAgregator, putAdminAgregator} from "../../api/Admin.js";

function AdminAcc_page() {
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [agregatorData, setAgregatorData] = useState({
        addInfo: "",
        department: "",
        email: "",
        jwtToken: "",
        name: "",
        patronymic: "",
        phoneNumber: "",
        position: "",
        surname: ""
    });


    const navigate = useNavigate();

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const saveChanges = async () => {
        try {
            const updatedData = await putAdminAgregator(localStorage.getItem("jwt"), agregatorData);

            if (updatedData) {
                setAgregatorData({
                    addInfo: updatedData.addInfo || "",
                    department: updatedData.department || "",
                    email: updatedData.email || "",
                    jwtToken: updatedData.jwtToken || "",
                    name: updatedData.name || "",
                    patronymic: updatedData.patronymic || "",
                    phoneNumber: updatedData.phoneNumber || "",
                    position: updatedData.position || "",
                    surname: updatedData.surname || ""
                });

                const currentJwt = localStorage.getItem("jwt");
                if (updatedData.jwtToken && updatedData.jwtToken !== currentJwt) {
                    localStorage.setItem("jwt", updatedData.jwtToken);
                    console.log("JWT token был обновлён");
                }

                setIsEditing(false); // Выход из режима редактирования
            }
        } catch (error) {
            console.error("Ошибка при сохранении данных:", error);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAgregatorData({ ...agregatorData, [name]: value });
    };

    useEffect(() => {
        const getAdminAccPage = async () => {
            try {
                const data = await getAdminAgregator(localStorage.getItem("jwt"));
                if (data) {
                    setAgregatorData({
                        addInfo: data.addInfo || "",
                        department: data.department || "",
                        email: data.email || "",
                        jwtToken: data.jwtToken || "",
                        name: data.name || "",
                        patronymic: data.patronymic || "",
                        phoneNumber: data.phoneNumber || "",
                        position: data.position || "",
                        surname: data.surname || ""
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAdminAccPage();
        }, []);

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
                        <input type="text" name = "position" value={agregatorData?.position || ""} onChange={handleInputChange} disabled={!isEditing}/>
                    </div>
                    <div className="infoitem">
                        <label>Фамилия*:</label>
                        <input type="text" name = "surname" value={agregatorData?.surname || ""} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>Имя*:</label>
                        <input type="text" name = "name" value={agregatorData?.name || ""} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>Отчество:</label>
                        <input type="text" name = "patronymic" value={agregatorData?.patronymic || ""} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>Номер тел.*:</label>
                        <input type="text" name = "phoneNumber" value={agregatorData?.phoneNumber || ""} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>E-mail*:</label>
                        <input type="text" name = "email" value={agregatorData?.email || ""} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>Департамент:</label>
                        <input type="text" name ="department" value={agregatorData?.department || ""} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>Доп. Инфо:</label>
                        <input type="text" name ="addInfo" value={agregatorData?.addInfo || ""} onChange={handleInputChange} disabled={!isEditing} />
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