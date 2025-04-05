import React, { useState } from "react";
import "./style_orgreg.css";
import { useNavigate } from "react-router-dom";
import { registerorg, sendcode} from "../../api/Auth.js";

function OrgReg_page() {
    const [formAddress, setFormAddress] = useState({
        subjectName:"",
        cityName:"",
        streetName:"",
        houseNumber:"",
        addInfo:"",
        addressType:""
    });
    const [formData, setFormData] = useState({
        fullName: "",
        shortName: "",
        inn: "",
        kpp: "",
        ogrn: "",
        address: formAddress,
        lastName: "",
        firstName: "",
        patronymic:"",
        email: "",
        phone: "",
        code: "",
        acceptedPolicy: false,
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [codeRequested, setCodeRequested] = useState(false); // Новое состояние для отслеживания запроса кода

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => {
            // Проверяем, является ли поле частью адреса
            if (Object.prototype.hasOwnProperty.call(prevFormData.address, name)) {
                return {
                    ...prevFormData,
                    address: {
                        ...prevFormData.address,
                        [name]: value,
                    },
                };
            }

            return {
                ...prevFormData,
                [name]: value,
            };
        });

        setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));

        if (touched[name] || value !== "") {
            const errorMessage = validateField(name, value) ? "" : getErrorMessage(name);
            setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
        }
    };


    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, acceptedPolicy: e.target.checked });
        setTouched((prevTouched) => ({ ...prevTouched, acceptedPolicy: true }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            acceptedPolicy: e.target.checked ? "" : "Необходимо принять условия",
        }));
    };

    const navigate = useNavigate();

    const validateField = (name, value) => {
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
        const isValidText = /^[А-Яа-яёЁ\s-]{2,}$/;

        switch (name) {
            case "fullName":
            case "shortName":
            case "subjectName":
            case "cityName":
            case "streetName":
            case "lastName":
            case "firstName":
                return isValidText.test(value);
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
            case "code":
                return /^\d{6}$/.test(value);
            case "houseNumber":
                return /^[\dА-Яа-я\-\\/]{1,10}$/.test(value);
            default:
                return true;
        }
    };

    const getErrorMessage = (name) => {
        switch (name) {
            case "fullName":
                return "Полное название должно содержать минимум 2 русские буквы";
            case "shortName":
                return "Сокращенное название должно содержать минимум 2 русские буквы";
            case "subjectName":
                return "Название субъекта РФ должно содержать минимум 2 русские буквы";
            case "cityName":
                return "Город должен содержать минимум 2 русские буквы";
            case "streetName":
                return "Улица должна содержать минимум 2 русские буквы";
            case "houseNumber":
                return "Дом должен содержать цифры или буквы (до 10 символов)";
            case "lastName":
                return "Фамилия должна содержать минимум 2 русские буквы";
            case "firstName":
                return "Имя должно содержать минимум 2 русские буквы";
            case "inn":
                return "ИНН должен содержать ровно 10 цифр";
            case "kpp":
                return "КПП должен содержать ровно 9 цифр";
            case "ogrn":
                return "ОГРН должен содержать ровно 13 цифр";
            case "email":
                return "Введите корректный email";
            case "phone":
                return "Телефон должен начинаться с 7 или 8 и содержать 11 цифр";
            case "code":
                return "Код должен содержать ровно 6 цифр";
            case "acceptedPolicy":
                return "Необходимо принять условия";
            default:
                return "";
        }
    };

    const fieldOrder = [
        "fullName", "shortName", "inn", "kpp", "ogrn", "subjectName", "cityName", "streetName", "houseNumber",
        "lastName", "firstName", "email", "phone", "code", "acceptedPolicy"
    ];

    const getFirstError = () => {
        for (const field of fieldOrder) {
            if (touched[field]) {
                if (field === "acceptedPolicy" && !formData[field]) {
                    return getErrorMessage(field);
                }
                if (!validateField(field, formData[field])) {
                    return getErrorMessage(field);
                }
            }
        }
        return "";
    };

    const isFormValid = fieldOrder.every((key) => {
        if (key === "acceptedPolicy") {
            return formData[key];
        }
        return true
    });

    const handleKeyPress = (e) => {
        if (!/\d/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleGetCode = async () => {
        if (!formData.email ) {
            console.log("Введите корректный email перед получением кода.");
            return;
        }


        const success = await sendcode(formData.email);
        if (success) {
            console.log("Код отправлен на почту", formData.email);
            setCodeRequested(true); // Устанавливаем состояние, что код был запрошен
            console.log(formData);
        } else {
            console.log("Ошибка при отправке кода. Попробуйте снова.");
        }
    };

    const handleCreateOrganization = async () => {
        if (!formData.acceptedPolicy) {
            console.log("Примите условия");
            return;
        }

        try {
            const success = await registerorg(formData);
            console.log("SUCCESS", success);
            if (!success) {
                console.log("ВСЕ ОК");
            } else {
                console.log("ВСЕ НЕ ОК");
            }
        } catch (error) {
            console.error("Ошибка при регистрации организации:", error);
        }
        setTimeout(() => { navigate("/");}, 1500)

    };
    return (
        <>
            <div className="headersorg">
                <button className="exitbuttonsc" title="Вернуться на главную" onClick={() => navigate("/")}>
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
                            className="inputinfo"
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>Сокращенное:</label>
                        <input
                            type="text"
                            name="shortName"
                            value={formData.shortName}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>ИНН:</label>
                        <input
                            type="text"
                            name="inn"
                            value={formData.inn}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>КПП:</label>
                        <input
                            type="text"
                            name="kpp"
                            value={formData.kpp}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitem">
                        <label>ОГРН:</label>
                        <input
                            type="text"
                            name="ogrn"
                            value={formData.ogrn}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitem">

                    </div>
                    <div className="orginfoitem">
                        <h2>Адрес</h2>
                        <label>Субъект РФ:</label>
                        <input
                            type="text"
                            name="subjectName"
                            value={formData.address.subjectName}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                        <label>Город:</label>
                        <input
                            type="text"
                            name="cityName"
                            value={formData.address.cityName}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                        <label>Улица:</label>
                        <input
                            type="text"
                            name="streetName"
                            value={formData.address.streetName}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                        <label>Дом</label>
                        <input
                            type="text"
                            name="houseNumber"
                            value={formData.address.houseNumber}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                        <label>Тип Адреса</label>
                        <select
                            name="addressType"
                            value={formData.address.addressType}
                            onChange={(event) => {
                                const {name, value} = event.target; // Достаем name и value из события
                                console.log(name, value)
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    address: {
                                        ...prevFormData.address,
                                        [name]: value
                                    }
                                }));
                                console.log(formData.address);
                            }}
                            className="inputinfo"
                        >
                            <option value="" disabled selected hidden>Выберите тип адреса</option>
                            <option value="INDIVIDUAL">Физический</option>
                            <option value="LEGAL">Юридический</option>
                        </select>


                        <label>Дополнительная информация</label>
                        <input
                            type="text"
                            name="addInfo"
                            value={formData.address.addInfo}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
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
                            className="inputinfo"
                            autoComplete="off"
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Имя:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="inputinfo"
                            autoComplete="off"
                        />
                    </div>
                    <div className="contactinfoitem">
                        <label>Номер тел.:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className="inputinfo"
                            autoComplete="off"
                            maxLength="11"
                        />
                    </div>
                    <div className="contactinfoitem">
                        <button
                            className="getCodeButton"
                            onClick={handleGetCode}
                            disabled={!validateField("email", formData.email)} // Блокировка кнопки, если email некорректный
                        >
                            Получить код
                        </button>
                    </div>
                    <div className="contactinfoitem">
                        <label>Код:</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Введите код"
                            className="inputcode"
                            autoComplete="off"
                            disabled={!codeRequested} // Блокировка поля, если код не был запрошен
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
                        {getFirstError() && <span className="error">{getFirstError()}</span>}
                        <button
                            className="crappbutton"
                            onClick={handleCreateOrganization}
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