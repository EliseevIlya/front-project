import React, { useState } from "react";
import "./style_orgreg.css";
import { useNavigate } from "react-router-dom";

function OrgReg_page() {
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
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, acceptedPolicy: e.target.checked });
    };

    const navigate = useNavigate();

    const validateField = (name, value) => {
        switch (name) {
            case "fullName":
            case "shortName":
            case "city":
            case "address":
            case "lastName":
            case "firstName":
                return value.length >= 2; // Минимум 2 символа
            case "inn":
                return /^\d{10}(\d{2})?$/.test(value); // 10 или 12 цифр
            case "kpp":
                return /^\d{9}$/.test(value); // 9 цифр
            case "ogrn":
                return /^\d{13}$/.test(value); // 13 цифр
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Проверка на email
            case "phone":
                return /^\+?\d{1,3}[-\s]?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}$/.test(value); // Телефон
            default:
                return true;
        }
    };

    const isFormValid = Object.keys(formData).every((key) => {
        if (key === "acceptedPolicy") {
            return formData[key];
        }
        return validateField(key, formData[key]);
    });

    return (
        <>
            <div className="headersorg">
                <button className="exitbutton" title="Выйти на главную" onClick={() => navigate("/")}>Выйти</button>
                <h1 className="textorg">СОЗДАНИЕ ЗАЯВКИ</h1>
            </div>

            <div className="registration">
                <div className="orginfo">
                    <h2>Информация об организации:</h2>
                    <div className="orginfoitem">
                        <label>Полное название:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>Сокращенное:</label>
                        <input
                            type="text"
                            name="shortName"
                            value={formData.shortName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>ИНН:</label>
                        <input
                            type="text"
                            name="inn"
                            value={formData.inn}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>КПП:</label>
                        <input
                            type="text"
                            name="kpp"
                            value={formData.kpp}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>ОГРН:</label>
                        <input
                            type="text"
                            name="ogrn"
                            value={formData.ogrn}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>Город:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>Адрес:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="contactinfo">
                    <h2>Контактное лицо:</h2>
                    <div className="contactinfoitem">
                        <label>Фамилия:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Имя:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Номер тел.:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="confirmplate">
                        <label>
                            Принимаю
                            <a href="https://policies.google.com/privacy?hl=ru" target="_blank" rel="noopener noreferrer">
                                 условия политики конфиденциальности
                            </a>
                            <input
                                type="checkbox"
                                className="custom"
                                checked={formData.acceptedPolicy}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                        <button
                            className="crappbutton"
                            onClick={() => navigate("/org/statuscheck")}
                            disabled={!isFormValid}
                        >
                            Подать заявку
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrgReg_page;
