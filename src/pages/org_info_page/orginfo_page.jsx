import React, { useState, useEffect } from "react";
import "./style_orginfo.css";
import { useNavigate } from "react-router-dom";
import {getOneOrganization} from "../../api/Org.js";

function OrgInfo_page() {
/*
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
*/

    const [formData, setFormData] = useState({
        fullName: "",
        shortName: "",
        inn: "",
        kpp: "",
        ogrn: "",
        responsiblePersonSurname: "",
        responsiblePersonName: "",
        responsiblePersonPatronymic: "",
        responsiblePersonEmail: "",
        responsiblePersonPhoneNumber: "",
        addInfo: "",
        email: "",
        address: [],
        connectionRequestStatus:"",
        connectionRequestAddInfo:"",
        jwtToken:"",
        acceptedPolicy: false
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [errors, setErrors] = useState({}); // Для хранения ошибок валидации

    const [addressData, setAddressData] = useState({
        subjectName:"",
        cityName:"",
        streetName:"",
        houseNumber:"",
        addInfo:"",
        addressType:""
    });
    const [oranizationData, setOranizationData] = useState({
        fullName: "",
        shortName: "",
        inn: "",
        kpp: "",
        ogrn: "",
        responsiblePersonSurname: "",
        responsiblePersonName: "",
        responsiblePersonPatronymic: "",
        responsiblePersonEmail: "",
        responsiblePersonPhoneNumber: "",
        addInfo: "",
        email: "",
        address: [],
        connectionRequestStatus:"",
        connectionRequestAddInfo:"",
        jwtToken:""
    });

    const navigate = useNavigate();

    // Валидация полей
    const validateField = (name, value) => {
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
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
        const formDataChange = () => {
            const { fullName, shortName, inn, kpp, ogrn, city, address, lastName, firstName, email, phone } = formData;
            const isAllFieldsFilled = fullName && shortName && inn && kpp && ogrn && city && address && lastName && firstName && email && phone;
            setIsSaveDisabled(!isAllFieldsFilled);
        };

        const getOrganizationData = async () => {
            try {
                const data = await getOneOrganization(localStorage.getItem("jwt"));

                if (data) {
                    setFormData({
                        fullName: data.fullName || "",
                        shortName: data.shortName || "",
                        inn: data.inn || "",
                        kpp: data.kpp || "",
                        ogrn: data.ogrn || "",
                        responsiblePersonSurname: data.responsiblePersonSurname || "",
                        responsiblePersonName: data.responsiblePersonName || "",
                        responsiblePersonPatronymic: data.responsiblePersonPatronymic || "",
                        responsiblePersonEmail: data.responsiblePersonEmail || "",
                        responsiblePersonPhoneNumber: data.responsiblePersonPhoneNumber || "",
                        addInfo: data.addInfo || "",
                        email: data.email || "",
                        addresses: data.addresses || [], // Записываем массив адресов
                        connectionRequestStatus: data.connectionRequestStatus || "",
                        connectionRequestAddInfo: data.connectionRequestAddInfo || "",
                        jwtToken: data.jwtToken || ""
                    });
                }
            } catch (error) {
                console.error("Ошибка получения данных организации:", error);
            }
            //setTimeout(() => { console.log(data());}, 2500)
        };

        getOrganizationData();
        formDataChange()
    }, []);

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
        // Проверка на корректность всех полей
        const isValid = Object.keys(formData).every((key) => {
            return validateField(key, formData[key]);
        });

        if (isValid) {
            // Если все поля корректны, можно сохранить
            setIsEditing(false);
            setIsButtonDisabled(false);
            // Здесь можно добавить логику для сохранения данных, например, отправку на сервер
        } else {
            // Если есть некорректные поля, можно установить ошибки
            const newErrors = {};
            Object.keys(formData).forEach((key) => {
                if (!validateField(key, formData[key])) {
                    newErrors[key] = "Некорректное значение";
                }
            });
            setErrors(newErrors);
        }
    };

    const handleKeyPress = (e) => {
        const char = String.fromCharCode(e.which);
        if (!/^\d$/.test(char)) {
            e.preventDefault();
        }
    };

/*    return (
        <>
            <div className="info_headersorg">
                <button  className="info_exitbutton"
                         title="Личный кабинет"
                         onClick={() => navigate("/create_services")}
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
                            placeholder="ООО Ромашка"
                            className="inputinfo"
                            autoComplete="off"
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
                            placeholder="Ромашка"
                            className="inputinfo"
                            autoComplete="off"
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
                            onKeyPress={handleKeyPress}
                            disabled={!isEditing}
                            placeholder="1234567890"
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="10"
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
                            onKeyPress={handleKeyPress}
                            disabled={!isEditing}
                            placeholder="123456789"
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="9"
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
                            onKeyPress={handleKeyPress}
                            disabled={!isEditing}
                            placeholder="1234567890123"
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="13"
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
                            placeholder="Москва"
                            className="inputinfo"
                            autoComplete="off"
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
                            placeholder="ул. Ленина, д. 10"
                            className="inputinfo"
                            autoComplete="off"
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
                            placeholder="Иванов"
                            className="inputinfo"
                            autoComplete="off"
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
                            placeholder="Иван"
                            className="inputinfo"
                            autoComplete="off"
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
                            placeholder="example@mail.com"
                            className="inputinfo"
                            autoComplete="off"
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
                            onKeyPress={handleKeyPress}
                            placeholder="71234567890"
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="11"
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
                            className="inputcode"
                            autoComplete="off"
                        />
                    </div>
                    <div className="info_confirmplate">
                        {isEditing ? (
                            <button
                                className="info_savebutton"
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
    );*/

    return (
        <>
            <div className="info_headersorg">
                <button  className="info_exitbutton"
                         title="Личный кабинет"
                         onClick={() => navigate("/create_services")}
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
                            //placeholder="ООО Ромашка"
                            className="inputinfo"
                            autoComplete="off"
                        />
                       {/* {errors.fullName && <span className="error">{errors.fullName}</span>}*/}
                    </div>
                    <div className="info_orginfoitem">
                        <label>Сокращенное:</label>
                        <input
                            type="text"
                            name="shortName"
                            value={formData.shortName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            //placeholder="Ромашка"
                            className="inputinfo"
                            autoComplete="off"
                        />
                       {/* {errors.shortName && <span className="error">{errors.shortName}</span>}*/}
                    </div>
                    <div className="info_orginfoitem">
                        <label>ИНН:</label>
                        <input
                            type="text"
                            name="inn"
                            value={formData.inn}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            disabled={!isEditing}
                            //placeholder="1234567890"
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="10"
                        />
                        {/*{errors.inn && <span className="error">{errors.inn}</span>}*/}
                    </div>
                    <div className="info_orginfoitem">
                        <label>КПП:</label>
                        <input
                            type="text"
                            name="kpp"
                            value={formData.kpp}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            disabled={!isEditing}
                            //placeholder="123456789"
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="9"
                        />
                        {/*{errors.kpp && <span className="error">{errors.kpp}</span>}*/}
                    </div>
                    <div className="info_orginfoitem">
                        <label>ОГРН:</label>
                        <input
                            type="text"
                            name="ogrn"
                            value={formData.ogrn}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            disabled={!isEditing}
                            //placeholder="1234567890123"
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="13"
                        />
                        {/*{errors.ogrn && <span className="error">{errors.ogrn}</span>}*/}
                    </div>


                    <h2>Адрес:</h2>
                    <div className="info_orginfoitem">
                        <label>Регион:</label>
                        <input type="text" value={formData.addresses?.[0]?.subjectName || ""} disabled/>
                    </div>
                    <div className="info_orginfoitem">
                        <label>Город:</label>
                        <input type="text" value={formData.addresses?.[0]?.cityName || ""} disabled/>
                    </div>
                    <div className="info_orginfoitem">
                        <label>Улица:</label>
                        <input type="text" value={formData.addresses?.[0]?.streetName || ""} disabled/>
                    </div>
                    <div className="info_orginfoitem">
                        <label>Дом:</label>
                        <input type="text" value={formData.addresses?.[0]?.houseNumber || ""} disabled/>
                    </div>
                    <div className="info_orginfoitem">
                        <label>Доп. информация:</label>
                        <input type="text" value={formData.addresses?.[0]?.addInfo || ""} disabled/>
                    </div>

                </div>

                <div className="info_contactinfo">
                    <h2>Контактное лицо:</h2>
                    <div className="info_contactinfoitem">
                        <label>Фамилия:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.responsiblePersonSurname}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            //placeholder="Иванов"
                            className="inputinfo"
                            autoComplete="off"
                        />
                        {/*{errors.lastName && <span className="error">{errors.lastName}</span>}*/}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Имя:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.responsiblePersonName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            //placeholder="Иван"
                            className="inputinfo"
                            autoComplete="off"
                        />
                        {/*{errors.firstName && <span className="error">{errors.firstName}</span>}*/}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Фамилия:</label>
                        <input
                            type="text"
                            name="patronymic"
                            value={formData.responsiblePersonPatronymic}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            //placeholder="Иван"
                            className="inputinfo"
                            autoComplete="off"
                        />
                       {/* {errors.firstName && <span className="error">{errors.firstName}</span>}*/}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="example@mail.com"
                            className="inputinfo"
                            autoComplete="off"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Номер тел.:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.responsiblePersonPhoneNumber}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            onKeyPress={handleKeyPress}
                            placeholder="71234567890"
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="11"
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="info_contactinfoitem">
                        <label>Дополнительная информация:</label>
                        <textarea
                            name="additionalInfo"
                            value={formData.addInfo}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="inputcode"
                            autoComplete="off"
                        />
                    </div>
                    <div className="info_confirmplate">
                        {isEditing ? (
                            <button
                                className="info_savebutton"
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
