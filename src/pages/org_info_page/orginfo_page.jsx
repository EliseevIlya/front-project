import React, {useState, useEffect} from "react";
import "./style_orginfo.css";
import {useNavigate} from "react-router-dom";
import {getOneOrganization, updateOrganization} from "../../api/Org.js";
import Deleteparthpage from "../deletepartnership/deletepartnership.jsx";

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

    const [activeCard, setActiveCard] = useState(null); // "org", "address", "contact"
    const [isEditing, setIsEditing] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrg = async () => {
            try {
                const data = await getOneOrganization(localStorage.getItem("jwt"));
                if (data) {
                    setFormData({
                        ...data,
                        addresses: data.addresses || []
                    });
                }
            } catch (e) {
                console.error("Ошибка при получении данных:", e);
            }
        };

        fetchOrg();
    }, []);

    useEffect(() => {
        const allFilled = formData.fullName && formData.shortName && formData.inn &&
            formData.kpp && formData.ogrn && formData.responsiblePersonSurname &&
            formData.responsiblePersonName && formData.responsiblePersonEmail &&
            formData.responsiblePersonPhoneNumber;
        setIsSaveDisabled(!allFilled);
    }, [formData]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleAddressChange = (e) => {
        const {name, value} = e.target;
        const updatedAddress = {
            ...formData.addresses?.[0],
            [name]: value
        };
        setFormData(prev => ({...prev, addresses: [updatedAddress]}));
    };


    const handleKeyPress = (event) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const handleCardClick = (card) => {
        if (isEditing) return; // Блокируем переключение карточки во время редактирования
        setActiveCard(card);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        if (activeCard) {
            setIsEditing(true);
        }
    };

    const handleSaveClick = async () => {
        try {
            const updated = await updateOrganization(localStorage.getItem("jwt"), formData);
            if (updated) {
                setFormData({...updated, addresses: updated.addresses || []});
                setIsEditing(false);
                if (updated.jwtToken && updated.jwtToken !== localStorage.getItem("jwt")) {
                    localStorage.setItem("jwt", updated.jwtToken);
                }
            }
        } catch (err) {
            console.error("Ошибка сохранения:", err);
        }
    };

    const isCardEditable = (card) => activeCard === card && isEditing;

    return (
        <>
            <div className="info_headersorg">
                <button className="info_exitbutton"
                        title="Личный кабинет"
                        onClick={() => navigate("/create_services")}
                        disabled={isEditing}
                >
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <h1 className="info_textorg">ИНФОРМАЦИЯ</h1>
                <button className="info_deletebutton"
                        title="Удалить аккаунт"
                        onClick={() => setIsDeleteModalOpen(true)}
                        disabled={isEditing}
                >
                    <img src="src/icons/close.png" alt="Delete"/>
                </button>
            </div>

            <div className="cardsContainer">
                <div
                    className={`card ${activeCard !== "org" ? "disabled-card" : ""}`}
                    onClick={() => handleCardClick("org")}
                >
                    <h2>Информация об организации</h2>
                    <div className="orginfoitemSC">
                        <label>Полное название:</label>
                        <input
                            type="text"
                            name="fullName"
                            className="infoinput"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={!isCardEditable("org")}
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitemSC">
                        <label>Сокращенное название:</label>
                        <input
                            type="text"
                            name="shortName"
                            className="infoinput"
                            value={formData.shortName}
                            onChange={handleInputChange}
                            disabled={!isCardEditable("org")}
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitemSC">
                        <label>ИНН:</label>
                        <input
                            type="text"
                            name="inn"
                            className="infoinput"
                            value={formData.inn}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            disabled={!isCardEditable("org")}
                            autoComplete="off"
                            maxLength="10"
                        />
                    </div>
                    <div className="orginfoitemSC">
                        <label>КПП:</label>
                        <input
                            type="text"
                            name="kpp"
                            className="infoinput"
                            value={formData.kpp}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            disabled={!isCardEditable("org")}
                            autoComplete="off"
                            maxLength="9"
                        />
                    </div>
                    <div className="orginfoitemSC">
                        <label>ОГРН:</label>
                        <input
                            type="text"
                            name="ogrn"
                            className="infoinput"
                            value={formData.ogrn}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            disabled={!isCardEditable("org")}
                            autoComplete="off"
                            maxLength="13"
                        />
                    </div>
                </div>

                <div
                    className={`card ${activeCard !== "address" ? "disabled-card" : ""}`}
                    onClick={() => handleCardClick("address")}
                >
                    <h2>Адрес</h2>
                    <div className="orginfoitemSC">
                        <label>Тип адреса:</label>
                        <select
                            name="addressType"
                            className="infoselect"
                            value={formData.addresses?.[0]?.addressType || "LEGAL"}
                            onChange={handleAddressChange}
                            disabled={!isCardEditable("address")}
                        >
                            <option className="infoselectoption" value="LEGAL">Юридический</option>
                            <option className="infoselectoption" value="PHYSICAL">Физический</option>
                        </select>
                    </div>

                    <div className="orginfoitemSC">
                        <label>Регион:</label>
                        <input
                            type="text"
                            name="subjectName"
                            className="infoinput"
                            value={formData.addresses?.[0]?.subjectName || ""}
                            onChange={handleAddressChange}
                            disabled={!isCardEditable("address")}
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitemSC">
                        <label>Город:</label>
                        <input
                            type="text"
                            name="cityName"
                            className="infoinput"
                            value={formData.addresses?.[0]?.cityName || ""}
                            onChange={handleAddressChange}
                            disabled={!isCardEditable("address")}
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitemSC">
                        <label>Улица:</label>
                        <input
                            type="text"
                            name="streetName"
                            className="infoinput"
                            value={formData.addresses?.[0]?.streetName || ""}
                            onChange={handleAddressChange}
                            disabled={!isCardEditable("address")}
                            autoComplete="off"
                        />
                    </div>
                    <div className="orginfoitemSC">
                        <label>Дом:</label>
                        <input
                            type="text"
                            name="houseNumber"
                            className="infoinput"
                            value={formData.addresses?.[0]?.houseNumber || ""}
                            onChange={handleAddressChange}
                            onKeyPress={handleKeyPress}
                            disabled={!isCardEditable("address")}
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div
                    className={`card ${activeCard !== "contact" ? "disabled-card" : ""}`}
                    onClick={() => handleCardClick("contact")}
                >
                    <h2>Контактное лицо</h2>
                    <div className="contactinfoitemSC">
                        <label>Фамилия:</label>
                        <input
                            type="text"
                            name="responsiblePersonSurname"
                            className="infoinput"
                            value={formData.responsiblePersonSurname}
                            onChange={handleInputChange}
                            disabled={!isCardEditable("contact")}
                            autoComplete="off"
                        />
                    </div>
                    <div className="contactinfoitemSC">
                        <label>Имя:</label>
                        <input
                            type="text"
                            name="responsiblePersonName"
                            className="infoinput"
                            value={formData.responsiblePersonName}
                            onChange={handleInputChange}
                            disabled={!isCardEditable("contact")}
                            autoComplete="off"
                        />
                    </div>
                    <div className="contactinfoitemSC">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="responsiblePersonEmail"
                            className="infoinput"
                            value={formData.responsiblePersonEmail}
                            onChange={handleInputChange}
                            disabled={!isCardEditable("contact")}
                            autoComplete="off"
                        />
                    </div>
                    <div className="contactinfoitemSC">
                        <label>Номер телефона:</label>
                        <input
                            type="text"
                            name="responsiblePersonPhoneNumber"
                            className="infoinput"
                            value={formData.responsiblePersonPhoneNumber}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            disabled={!isCardEditable("contact")}
                            autoComplete="off"
                            maxLength="11"
                        />
                    </div>
                    <div className="contactinfoitemSC">
                        <label>Доп. информация:</label>
                        <input
                            type="text"
                            name="addInfo"
                            className="infoinput"
                            value={formData.addresses?.[0]?.addInfo || ""}
                            onChange={handleAddressChange}
                            disabled={!isCardEditable("contact")}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>

            <div className="info_confirmplate">
                {activeCard && !isEditing ? (
                    <button className="info_editbutton" onClick={handleEditClick}>
                        Изменить
                    </button>
                ) : activeCard && isEditing ? (
                    <button className="info_savebutton"
                            onClick={handleSaveClick}
                            disabled={isSaveDisabled}>
                        Сохранить
                    </button>
                ) : null}
            </div>

            {isDeleteModalOpen && <Deleteparthpage onClose={() => setIsDeleteModalOpen(false)}/>}
        </>
    );
}

export default OrgInfo_page;
