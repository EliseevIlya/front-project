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
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
        switch (name) {
            case "fullName":
            case "shortName":
            case "city":
            case "address":
            case "lastName":
            case "firstName":
                return /^[А-Яа-я]{2,}$/.test(value); // Две или более русские буквы
            case "inn":
                return /^\d{10}$/.test(value); // 10 цифр
            case "kpp":
                return /^\d{9}$/.test(value); // 9 цифр
            case "ogrn":
                return /^\d{13}$/.test(value); // 13 цифр
            case "email":
                return isValidEmail.test(value); // Email проверка
            case "phone":
                return /^[78]\d{10}$/.test(value); // 11 цифр, начинающихся на 7 или 8
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
                <button className="exitbutton" title="Вернуться на главную" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Exit" />
                </button>
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
                            placeholder="ООО Ромашка"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>Сокращенное:</label>
                        <input
                            type="text"
                            name="shortName"
                            value={formData.shortName}
                            onChange={handleInputChange}
                            placeholder="Ромашка"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>ИНН:</label>
                        <input
                            type="text"
                            name="inn"
                            value={formData.inn}
                            onChange={handleInputChange}
                            placeholder="1234567890"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>КПП:</label>
                        <input
                            type="text"
                            name="kpp"
                            value={formData.kpp}
                            onChange={handleInputChange}
                            placeholder="123456789"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>ОГРН:</label>
                        <input
                            type="text"
                            name="ogrn"
                            value={formData.ogrn}
                            onChange={handleInputChange}
                            placeholder="1234567890123"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>Город:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Москва"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>Адрес:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="ул. Ленина, д. 10"
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
                            placeholder="Иванов"
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Имя:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Иван"
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="example@mail.com"
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Номер тел.:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="71234567890"
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
