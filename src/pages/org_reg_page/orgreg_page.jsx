import React, { useState } from "react";
import "./style_orgreg.css";
import {useNavigate} from "react-router-dom";

function OrgReg_page() {
    // Состояния для полей ввода
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

    // Функция обновления полей ввода
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Функция обновления чекбокса
    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, acceptedPolicy: e.target.checked });
    };

    // Проверка заполненности всех полей
    const isFormValid = Object.values(formData).every((value) => value !== "" && value !== false);

    const navigate = useNavigate();

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
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                    </div>
                    <div className="orginfoitem">
                        <label>Сокращенное:</label>
                        <input type="text" name="shortName" value={formData.shortName} onChange={handleInputChange} />
                    </div>
                    <div className="orginfoitem">
                        <label>ИНН:</label>
                        <input type="text" name="inn" value={formData.inn} onChange={handleInputChange} />
                    </div>
                    <div className="orginfoitem">
                        <label>КПП:</label>
                        <input type="text" name="kpp" value={formData.kpp} onChange={handleInputChange} />
                    </div>
                    <div className="orginfoitem">
                        <label>ОГРН:</label>
                        <input type="text" name="ogrn" value={formData.ogrn} onChange={handleInputChange} />
                    </div>
                    <div className="orginfoitem">
                        <label>Город:</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div className="orginfoitem">
                        <label>Адрес:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="contactinfo">
                    <h2>Контактное лицо:</h2>
                    <div className="contactinfoitem">
                        <label>Фамилия:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </div>
                    <div className="contactinfoitem">
                        <label>Имя:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </div>
                    <div className="contactinfoitem">
                        <label>Email:</label>
                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="contactinfoitem">
                        <label>Номер тел.:</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="confirmplate">
                        <label>
                            Принимаю условия политики конфиденциальности
                            <input
                                type="checkbox"
                                className="custom"
                                checked={formData.acceptedPolicy}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                        <button className="crappbutton" disabled={!isFormValid} onClick={() => navigate("/org_statuscheck_page")}>
                            Подать заявку
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrgReg_page;
