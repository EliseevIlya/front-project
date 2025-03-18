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

    const [isEditing, setIsEditing] = useState(false); // Состояние редактирования
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Состояние кнопки "Личный кабинет"
    const [isSaveDisabled, setIsSaveDisabled] = useState(true); // Состояние кнопки "Сохранить"

    const navigate = useNavigate();

    // Проверка, все ли обязательные поля заполнены
    useEffect(() => {
        const { fullName, shortName, inn, kpp, ogrn, city, address, lastName, firstName, email, phone } = formData;
        const isAllFieldsFilled = fullName && shortName && inn && kpp && ogrn && city && address && lastName && firstName && email && phone;
        setIsSaveDisabled(!isAllFieldsFilled); // Если какое-либо из обязательных полей не заполнено, кнопка "Сохранить" будет заблокирована
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(true); // Включаем редактирование
        setIsButtonDisabled(true); // Блокируем кнопку "Личный кабинет"
    };

    const handleSaveClick = () => {
        setIsEditing(false); // Выключаем редактирование
        setIsButtonDisabled(false); // Разблокируем кнопку "Личный кабинет"
    };

    return (
        <>
            <div className="info_headersorg">
                <button
                    className="info_exitbutton"
                    title="Выйти на главную"
                    onClick={() => navigate("/create/services")}
                    disabled={isButtonDisabled} // Блокируем кнопку при редактировании
                >
                    Личный кабинет
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
                            disabled={!isEditing} // Делаем поля неактивными, если не редактируем
                        />
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
                                disabled={isSaveDisabled} // Блокируем кнопку "Сохранить", если не все обязательные поля заполнены
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
