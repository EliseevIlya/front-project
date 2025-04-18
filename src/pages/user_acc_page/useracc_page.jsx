import { useEffect, useState } from "react";
import "./style_useracc.css";
import { useNavigate } from "react-router-dom";
import Deleteaccpage from "../deleteaccpage/deleteaccpage";
import { getCustomer,updateCustomer } from "../../api/Customer";

 function UserAcc_page() {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Состояние для модального окна удаления
    useEffect(() => {
        getCustomer(
            localStorage.getItem("jwt"),
            (email) => setEmail((prev) => prev || email),
            (surname) => setSurname((prev) => prev || surname),
            (name) => setName((prev) => prev || name),
            (phone) => setPhone((prev) => prev || phone),
            (addInfo) => setAddInfo((prev) => prev || addInfo),
            (patronymic) => setPatronymic((prev) => prev || patronymic)
        );
    }, []);


    // State variables for form fields
    const [email, setEmail] = useState("");
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [addInfo, setAddInfo] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    // Validation functions
    const validateEmail = (emailValue) => {
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
        return isValidEmail.test(emailValue);
    };

    const validateSurname = (surnameValue) => {
        const isValidSurname = /^[А-ЯЁа-яё\-]+$/;
        return isValidSurname.test(surnameValue);
    };

    const validateName = (nameValue) => {
        const isValidName = /^[А-ЯЁа-яё\-]+$/;
        return isValidName.test(nameValue);
    };

    const validatePhone = (phoneValue) => {
        const isValidPhone = /^(\8|7)\d{10}$/;
        return isValidPhone.test(phoneValue);
    };

    // Handlers for input changes
    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
    };

    const handleSurnameChange = (e) => {
        const surnameValue = e.target.value;
        setSurname(surnameValue);
    };

    const handleNameChange = (e) => {
        const nameValue = e.target.value;
        setName(nameValue);
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/\D/g, "").slice(0, 11);
        setPhone(phoneValue);
    };

    const handleAddInfoChange = (e) =>{
        setAddInfo(e.target.value);
    }

    const handlePatronymicChange = (e) =>{
        setPatronymic(e.target.value);
    }

    // Function to check if all required fields are filled and valid
    const areRequiredFieldsValid = () => {
        if (!validateEmail(email) || !validateSurname(surname) || !validateName(name) || !validatePhone(phone)) {
            setErrorMessage("Заполните все обязательные поля корректно!");
            return false;
        }
        setErrorMessage("");
        return true;
    };

     const handleSaveChanges = async () => {
         if (areRequiredFieldsValid()) {
             try {
                 const response = await updateCustomer(
                     localStorage.getItem("jwt"),
                     email,
                     surname,
                     name,
                     patronymic,
                     phone,
                     addInfo
                 );

                 console.log("Успешное обновление:", response);

                 // Обновляем состояние
                 setEmail(response.email);
                 setSurname(response.surname);
                 setName(response.name);
                 setPatronymic(response.patronymic);
                 setPhone(response.phoneNumber);
                 setAddInfo(response.addInfo);

                 // Проверяем и обновляем jwtToken, если он пришел в ответе
                 if (response.jwtToken) {
                     localStorage.setItem("jwt", response.jwtToken);
                     console.log("JWT обновлен");
                 }

                 setIsEditing(false);
             } catch (error) {
                 console.error("Ошибка обновления:", error);
             }
         }
     };

    return (
        <div>
            <div class="headers">
                <div class="headexit">
                    <button className="exitbuttonuser" title="Выйти из аккаунта" onClick={() => navigate("/")}>
                        <img src="/src/icons/exit.png" alt="Exit"/>
                    </button>
                </div>

                <div class="headtext">
                    <button className="homebuttonuser" title="Вернуться на главную" onClick={() => navigate("/")}>
                        <h1>PIONEER</h1> <img src="/src/icons/home.png" alt="Home"/></button>
                    <div class="headpodtext"><h2>ЛИЧНЫЙ КАБИНЕТ</h2></div>
                </div>

                <div class="headdelete">
                    <button className="deletebutton" title="Удалить аккаунт" onClick={() => setIsDeleteModalOpen(true)}>
                        <img src="src/icons/close.png" alt="Delete"/>
                    </button>
                </div>
            </div>

            <div className="headers">
                <div className="info">
                    <div className="infoitem">
                        <label>ФАМИЛИЯ*:</label>
                        <input
                            type="text"
                            disabled={!isEditing}
                            value={surname}
                            onChange={handleSurnameChange}
                        />
                    </div>
                    <div className="infoitem">
                        <label>ИМЯ*:</label>
                        <input
                            type="text"
                            disabled={!isEditing}
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="infoitem">
                        <label>ОТЧЕСТВО:</label>
                        <input type="text" disabled={!isEditing}
                        value={patronymic}
                               onChange={handlePatronymicChange}
                        />
                    </div>
                    <div className="infoitem">
                        <label>НОМЕР ТЕЛ.*:</label>
                        <input
                            type="text"
                            placeholder="79000000001"
                            disabled={!isEditing}
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <div className="infoitem">
                        <label>EMAIL*:</label>
                        <input
                            type="text"
                            placeholder="mail@mail.ru"
                            disabled={!isEditing}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                </div>
                <div className="dopinfoitem">
                    <label>ДОП. ИНФОРМАЦИЯ:</label>
                    <textarea placeholder="Дополнительная информация..." disabled={!isEditing} value={addInfo}
                    onChange={handleAddInfoChange}
                    ></textarea>
                </div>
            </div>

            <div className="buttonplate">
            {!isEditing ? (
                <button className="editbutton" onClick={() => setIsEditing(true)}>
                    Изменить
                </button>
            ) : (
                <button
                    className="editbutton"
                    onClick={handleSaveChanges}
                >
                    Сохранить
                </button>
            )}
            {errorMessage && <span className="error">{errorMessage}</span>}
            <div className="applications">
                <button className="viewbutton" onClick={() => navigate("/apps")}>Заявки</button>
            </div>
        </div>

            {isDeleteModalOpen && <Deleteaccpage onClose={() => setIsDeleteModalOpen(false)}/>}
        </div>
    );
}

export default UserAcc_page;