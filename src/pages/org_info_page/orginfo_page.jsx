import React, {useState, useEffect} from "react";
import "./style_orginfo.css"; // Убедитесь, что стили соответствуют
import {useNavigate} from "react-router-dom";
import {getOneOrganization, updateOrganization} from "../../api/Org.js";

function OrgInfo_page() {
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
        addresses: [],
        connectionRequestStatus: "",
        connectionRequestAddInfo: "",
        jwtToken: "",
        acceptedPolicy: false
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [errors, setErrors] = useState({}); // Для хранения ошибок валидации

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
            const {fullName, shortName, inn, kpp, ogrn, city, address, lastName, firstName, email, phone} = formData;
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
        };

        getOrganizationData();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

        // Валидация при изменении поля
        if (!validateField(name, value)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: "Некорректное значение"
            }));
        } else {
            setErrors(prevErrors => {
                const {[name]: removedError, ...rest} = prevErrors;
                return rest;
            });
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setIsButtonDisabled(true);
        setIsSaveDisabled(false);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        setIsButtonDisabled(false);
        setIsSaveDisabled(true);
        // Проверка на корректность всех полей
        const isValid = Object.keys(formData).every((key) => {
            return validateField(key, formData[key]);
        });
        if (isValid) {
            const data = await updateOrganization(localStorage.getItem("jwt"), formData);
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
                    connectionRequestAddInfo: data.connectionRequestAddInfo || ""
                });

                const currentJwt = localStorage.getItem("jwt");
                if (data.jwtToken && data.jwtToken !== currentJwt) {
                    localStorage.setItem("jwt", data.jwtToken);
                    console.log("JWT token был обновлён");
                }

                const newErrors = {};
                Object.keys(formData).forEach((key) => {
                    if (!validateField(key, formData[key])) {
                        newErrors[key] = "Некорректное значение";
                    }
                });
                setErrors(newErrors);
            }
        }
    };

    const handleKeyPress = (e) => {
        const char = String.fromCharCode(e.which);
        if (!/^\d$/.test(char)) {
            e.preventDefault();
        }
    };

    const handleAddressChange = (e) => {
        const {name, value} = e.target;

        const updatedAddress = {
            ...formData.addresses?.[0],
            [name]: value
        };

        setFormData(prevData => ({
            ...prevData,
            addresses: [updatedAddress]
        }));
    };

    return (
        <>
            <div className="info_headersorg">
                <button className="info_exitbutton"
                        title="Личный кабинет"
                        onClick={() => navigate("/create_services")}
                        disabled={isButtonDisabled}>
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <h1 className="info_textorg">ИНФОРМАЦИЯ</h1>
            </div>

            <div className="cardsContainer">
                <div className="card">
                    <h2>Информация об организации</h2>
                    <div className="orginfoitemSC">
                        <label>Полное название:</label>
                        <input type="text" value={oranizationData.fullName} disabled/>
                    </div>
                    <div className="orginfoitemSC">
                        <label>Сокращенное название:</label>
                        <input type="text" value={oranizationData.shortName} disabled/>
                    </div>
                    <div className="orginfoitemSC">
                        <label>ИНН:</label>
                        <input type="text" value={oranizationData.inn} disabled/>
                    </div>
                    <div className="orginfoitemSC">
                        <label>КПП:</label>
                        <input type="text" value={oranizationData.kpp} disabled/>
                    </div>
                    <div className="orginfoitemSC">
                        <label>ОГРН:</label>
                        <input type="text" value={oranizationData.ogrn} disabled/>
                    </div>
                </div>

                <div className="card">
                    <h2>Адрес</h2>
                    <div className="orginfoitemSC">
                        <label>Тип адреса:</label>
                        <input
                            type="text"
                            value={oranizationData.addresses?.[0]?.addressType === "LEGAL" ? "Юридический" : "Физический"}
                            disabled
                        />
                    </div>
                    <div className="orginfoitemSC">
                        <label>Регион:</label>
                        <input type="text" value={oranizationData.addresses?.[0]?.subjectName || ""} disabled/>
                    </div>
                    <div className="orginfoitemSC">
                        <label>Город:</label>
                        <input type="text" value={oranizationData.addresses?.[0]?.cityName || ""} disabled/>
                    </div>
                    <div className="orginfoitemSC">
                        <label>Улица:</label>
                        <input type="text" value={oranizationData.addresses?.[0]?.streetName || ""} disabled/>
                    </div>
                    <div className="orginfoitemSC">
                        <label>Дом:</label>
                        <input type="text" value={oranizationData.addresses?.[0]?.houseNumber || ""} disabled/>
                    </div>
                </div>

                <div className="card">
                    <h2>Контактное лицо</h2>
                    <div className="contactinfoitemSC">
                        <label>Фамилия:</label>
                        <input type="text" value={oranizationData.responsiblePersonSurname} disabled/>
                    </div>
                    <div className="contactinfoitemSC">
                        <label>Имя:</label>
                        <input type="text" value={oranizationData.responsiblePersonName} disabled/>
                    </div>
                    <div className="contactinfoitemSC">
                        <label>Email:</label>
                        <input type="text" value={oranizationData.responsiblePersonEmail} disabled/>
                    </div>
                    <div className="contactinfoitemSC">
                        <label>Номер телефона:</label>
                        <input type="text" value={oranizationData.responsiblePersonPhoneNumber} disabled/>
                    </div>
                    <div className="contactinfoitemSC">
                        <label>Доп. информация:</label>
                        <input type="text" value={oranizationData.addresses?.[0]?.addInfo || ""} disabled/>
                    </div>
                </div>
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
        </>
    );
}

export default OrgInfo_page;