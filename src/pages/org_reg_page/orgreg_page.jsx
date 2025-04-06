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
        addressType: ""
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
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
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
    };

    const handleNext = () => {
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
                console.log("ВСЕ ОК");
            } else {
                console.log("ВСЕ НЕ ОК");
            }
        } catch (error) {
            console.error("Ошибка при регистрации организации:", error);
        }
        setTimeout(() => { navigate("/"); }, 1500);
    };

    return (
        <>
            <div className="headersorg">
                <button className="exitbuttonsc" title="Вернуться на главную" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Exit" />
                </button>
                <h1 className="textorg">СОЗДАНИЕ ЗАЯВКИ</h1>
            </div>

            <div className="registration-card">
                {currentStep === 0 && (
                    <div className="orginfo">
                        <h2>Информация об организации:</h2>
                        <input type="text" className="inputinfo" name="fullName" placeholder="Полное название"
                               value={formData.fullName}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="shortName" placeholder="Сокращенное"
                               value={formData.shortName}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="inn" placeholder="ИНН" value={formData.inn}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="kpp" placeholder="КПП" value={formData.kpp}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="ogrn" placeholder="ОГРН" value={formData.ogrn}
                               onChange={handleInputChange}/>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="addressinfo">
                        <h2>Адрес:</h2>
                        <input type="text" className="inputinfo" name="subjectName" placeholder="Регион"
                               value={formData.address.subjectName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="cityName" placeholder="Город"
                               value={formData.address.cityName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="streetName" placeholder="Улица"
                               value={formData.address.streetName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="houseNumber" placeholder="Дом"
                               value={formData.address.houseNumber} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="addInfo" placeholder="Дополнительная информация"
                               value={formData.address.addInfo} onChange={handleInputChange}/>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="contactinfo">
                        <h2>Контактное лицо:</h2>
                        <input type="text" className="inputinfo" name="lastName" placeholder="Фамилия"
                               value={formData.lastName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="firstName" placeholder="Имя"
                               value={formData.firstName} onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="email" placeholder="Email" value={formData.email}
                               onChange={handleInputChange}/>
                        <input type="text" className="inputinfo" name="phone" placeholder="Номер тел."
                               value={formData.phone} onChange={handleInputChange}/>
                        <p>
                            <button className="getcode_button" onClick={handleGetCode}
                                    disabled={!formData.email}>Получить код
                            </button>
                        </p>
                        <input type="text" className="inputcode" name="code" placeholder="Код" value={formData.code}
                               onChange={handleInputChange} disabled={!codeRequested}/>
                    </div>
                )}

                {/* Navigation Buttons and Progress Bar */}
                <div className="navigation-buttons">
                    {currentStep > 0 && <button onClick={handlePrev}>←</button>}

                    {/* Progress Bar */}
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: currentStep === 0 ? '0%' : `${(currentStep) * 33.33}%` }}></div>
                    </div>

                    {currentStep < 2 ? (
                        <button className="next-button" onClick={handleNext}>→</button>
                    ) : null}
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