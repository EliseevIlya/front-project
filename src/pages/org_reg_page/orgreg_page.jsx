import React, { useState } from "react";
import "./style_orgreg.css";
import { useNavigate } from "react-router-dom";
import { registerorg, sendcode } from "../../api/Auth.js";

function OrgReg_page() {
    const [formAddress, setFormAddress] = useState({
        subjectName: "",
        cityName: "",
        streetName: "",
        houseNumber: "",
        addInfo: "",
        addressType: ""  // Поле для типа адреса
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
        patronymic: "",
        email: "",
        phone: "",
        code: "",
        acceptedPolicy: false,
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [codeRequested, setCodeRequested] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => {
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

        // Validate field on change
        const errorMessage = validateField(name, value) ? "" : getErrorMessage(name);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setFormData({ ...formData, acceptedPolicy: isChecked });
        setTouched((prevTouched) => ({ ...prevTouched, acceptedPolicy: true }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            acceptedPolicy: isChecked ? "" : "Необходимо принять условия",
        }));
    };

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
            case "addressType":
                return value !== "";  // Проверка на выбор типа адреса
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
            case "addressType":
                return "Необходимо выбрать тип адреса";  // Сообщение об ошибке для типа адреса
            default:
                return "";
        }
    };

    const handleNext = () => {
        const firstError = getFirstError();
        if (firstError) {
            console.log(firstError);
            return; // Prevent moving to the next step if there are errors
        }
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleGetCode = async () => {
        if (!formData.email) {
            console.log("Введите корректный email перед получением кода.");
            return;
        }

        const success = await sendcode(formData.email);
        if (success) {
            console.log("Код отправлен на почту", formData.email);
            setCodeRequested(true);
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
                console.log("ВСЕ НЕ ОК");
            } else {
                console.log("ВСЕ ОК");
            }
        } catch (error) {
            console.error("Ошибка при регистрации организации:", error);
        }
        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    const getFirstError = () => {
        for (const field in formData) {
            if (touched[field] && !validateField(field, formData[field])) {
                return getErrorMessage(field);
            }
        }
        return "";
    };

    return (
        <>
            <div className="headersorg">
                <button className="exitbuttonsc" title="Вернуться на главную" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <h1 className="textorg">СОЗДАНИЕ ЗАЯВКИ</h1>
            </div>

            <div className="registration-card">
                {currentStep === 0 && (
                    <div className="orginfo">
                        <h2>Информация об организации</h2>
                        <input type="text" className="inputinfo" name="fullName" autoComplete="off"
                               placeholder="Полное название"
                               value={formData.fullName}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="shortName" autoComplete="off"
                               placeholder="Сокращенное"
                               value={formData.shortName}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="inn" maxLength="10" autoComplete="off"
                               placeholder="ИНН" value={formData.inn}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="kpp" maxLength="9" autoComplete="off"
                               placeholder="КПП" value={formData.kpp}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="ogrn" maxLength="13" autoComplete="off"
                               placeholder="ОГРН"
                               value={formData.ogrn}
                               onChange={handleInputChange}/>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="addressinfo">
                        <h2>Адрес</h2>
                        <select
                            name="addressType"
                            value={formData.address.addressType}
                            onChange={handleInputChange}
                            className="selectinfo"
                        >
                            <option className="optioninfo" value="" disabled hidden>Выберите тип адреса</option>
                            <option className="optioninfo" value="INDIVIDUAL">Физический</option>
                            <option className="optioninfo" value="LEGAL">Юридический</option>
                        </select>
                        <input type="text" className="inputinfo" name="subjectName" autoComplete="off"
                               placeholder="Регион"
                               value={formData.address.subjectName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="cityName" autoComplete="off" placeholder="Город"
                               value={formData.address.cityName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="streetName" autoComplete="off"
                               placeholder="Улица"
                               value={formData.address.streetName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="houseNumber" autoComplete="off" placeholder="Дом"
                               value={formData.address.houseNumber} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="addInfo" autoComplete="off"
                               placeholder="Дополнительная информация"
                               value={formData.address.addInfo} onChange={handleInputChange}/>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="contactinfo">
                        <h2>Контактное лицо</h2>
                        <input type="text" className="inputinfo" name="lastName" autoComplete="off"
                               placeholder="Фамилия"
                               value={formData.lastName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="firstName" autoComplete="off" placeholder="Имя"
                               value={formData.firstName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="email" autoComplete="off" placeholder="Email"
                               value={formData.email}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="phone" autoComplete="off" maxLength="11"
                               placeholder="Номер тел."
                               value={formData.phone} onChange={handleInputChange}/>
                        <p>
                            <input
                                type="checkbox"
                                checked={formData.acceptedPolicy}
                                onChange={handleCheckboxChange}
                            />
                            <label className="confirmlabel">
                                Я принимаю <a href="https://policies.google.com/terms?hl=ru">пользовательское
                                соглашение</a>
                            </label>
                        </p>
                        <p>
                            <button className="getcode_button" onClick={handleGetCode}
                                    disabled={!formData.email}>Получить код
                            </button>
                        </p>
                        <input type="text" className="inputcode" name="code" autoComplete="off" placeholder="Код"
                               value={formData.code}
                               onChange={handleInputChange} disabled={!codeRequested}/>
                    </div>
                )}

                {/* Navigation Buttons and Progress Bar */}
                <div className="navigation-buttons">
                    {currentStep > 0 && <button onClick={handlePrev}>←</button>}

                    {/* Progress Bar */}
                    <div className="progress-bar">
                        <div className="progress-fill"
                             style={{ width: currentStep === 0 ? '0%' : `${(currentStep) * 33.33}%` }}></div>
                    </div>

                    {currentStep < 2 ? (
                        <button className="next-button" onClick={handleNext}>→</button>
                    ) : null}
                </div>

                {/* Error Message Display */}
                <div className="error-message">
                    {getFirstError() && <p className="error-text">{getFirstError()}</p>}
                </div>

                {/* Confirmation Button placed outside the navigation div */}
                {currentStep === 2 && (
                    <div className="confirm-button-container">
                        <button className="confirmbutton" onClick={handleCreateOrganization}>Подать заявку</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default OrgReg_page;