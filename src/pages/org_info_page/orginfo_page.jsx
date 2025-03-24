import React, { useState, useEffect } from "react";
import "./style_orginfo.css";
import { useNavigate } from "react-router-dom";

function OrgInfo_page() {
    const [formData, setFormData] = useState({
        fullName: "",
        shortName: "",
        inn: "",
        kpp: "",
        ogrn: "",
        city: "",
        address: "",
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        acceptedPolicy: false,
        additionalInfo: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [errors, setErrors] = useState({}); // Для хранения ошибок валидации

    const navigate = useNavigate();

    // Валидация полей
    const validateField = (name, value) => {
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        switch (name) {
            case "fullName":
            case "shortName":
            case "city":
            case "address":
            case "lastName":
            case "firstName":
                return /^[А-Яа-я]{2,}$/.test(value);
            case "inn":
                return /^\d{10}$/.test(value);
            case "kpp":
                return /^\d{9}$/.test(value);
            case "ogrn":
                return /^\d{13}$/.test(value);
            case "email":
                return isValidEmail.test(value);
            case "phone":
                return /^[78]\d{10}$/.test(value);
            default:
                return true;
        }
    };

    // Проверка всех обязательных полей
    useEffect(() => {
        const { fullName, shortName, inn, kpp, ogrn, city, address, lastName, firstName, email, phone } = formData;
        const isAllFieldsFilled = fullName && shortName && inn && kpp && ogrn && city && address && lastName && firstName && email && phone;
        setIsSaveDisabled(!isAllFieldsFilled);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Валидация при изменении поля
        if (!validateField(name, value)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: "Некорректное значение"
            }));
        } else {
            setErrors(prevErrors => {
                const { [name]: removedError, ...rest } = prevErrors;
                return rest;
            });
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setIsButtonDisabled(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        setIsButtonDisabled(false);
    };

    return (
        <>
            <div className="info_headersorg">
                <button  className="info_exitbutton"
                         title="Личный кабинет"
                         onClick={() => navigate("/create/services")}
                         disabled={isButtonDisabled}>
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <h1 className="info_textorg">ИНФОРМАЦИЯ</h1>
            </div>

            <div className="info_registration">
                <div className="info_orginfo">
                    <h2>Информация об организации:</h2>
                    <div className="info_orginfoitem">
                        <label>Полное название:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                    </div>
                    <div className="info_orginfoitem">
                        <label>Сокращенное:</label>
                        <input
                            type="text"
                            name="shortName"
                            value={formData.shortName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.shortName && <span className="error">{errors.shortName}</span>}
                    </div>
                    <div className="info_orginfoitem">
                        <label>ИНН:</label>
                        <input
                            type="text"
                            name="inn"
                            value={formData.inn}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.inn && <span className="error">{errors.inn}</span>}
                    </div>
                    <div className="info_orginfoitem">
                        <label>КПП:</label>
                        <input
                            type="text"
                            name="kpp"
                            value={formData.kpp}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.kpp && <span className="error">{errors.kpp}</span>}
                    </div>
                    <div className="info_orginfoitem">
                        <label>ОГРН:</label>
                        <input
                            type="text"
                            name="ogrn"
                            value={formData.ogrn}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.ogrn && <span className="error">{errors.ogrn}</span>}
                    </div>
                    <div className="info_orginfoitem">
                        <label>Город:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.city && <span className="error">{errors.city}</span>}
                    </div>
                    <div className="info_orginfoitem">
                        <label>Адрес:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.address && <span className="error">{errors.address}</span>}
                    </div>
                </div>

                <div className="info_contactinfo">
                    <h2>Контактное лицо:</h2>
                    <div className="info_contactinfoitem">
                        <label>Фамилия:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Имя:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Номер тел.:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Дополнительная информация:</label>
                        <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="info_confirmplate">
                        {isEditing ? (
                            <button
                                className="info_editbutton"
                                onClick={handleSaveClick}
                                disabled={isSaveDisabled}
                            >
                                Сохранить
                            </button>
                        ) : (
                            <button
                                className="info_editbutton"
                                onClick={handleEditClick}
                            >
                                Изменить
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrgInfo_page;
