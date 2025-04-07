import React, { useEffect, useState } from "react";
import "./style_orgstatuscheck.css";
import { useNavigate } from "react-router-dom";
import Deleteparthpage from "../deletepartnership/deletepartnership";
import { getOneOrganization } from "../../api/Org.js";

function OrgStatusCheck_page() {
    const [showReasonForm, setShowReasonForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [oranizationData, setOranizationData] = useState({
        fullName: "",
        shortName: "",
        inn: "",
        kpp: "",
        ogrn: "",
        responsiblePersonSurname: "",
        responsiblePersonName: "",
        responsiblePersonEmail: "",
        responsiblePersonPhoneNumber: "",
        addInfo: "",
        email: "",
        addresses: [],
        connectionRequestStatus: "",
        connectionRequestAddInfo: "",
        jwtToken: ""
    });

    const statusMap = {
        NEW: "Новая",
        IN_PROGRESS: "В работе",
        REJECTED: "Отклонена",
        COMPLETED: "Исполнена"
    };

    const currentStatus = statusMap[oranizationData.connectionRequestStatus] || "Неизвестно";

    useEffect(() => {
        const getOrganizationData = async () => {
            try {
                const data = await getOneOrganization(localStorage.getItem("jwt"));

                if (data) {
                    setOranizationData({
                        fullName: data.fullName || "",
                        shortName: data.shortName || "",
                        inn: data.inn || "",
                        kpp: data.kpp || "",
                        ogrn: data.ogrn || "",
                        responsiblePersonSurname: data.responsiblePersonSurname || "",
                        responsiblePersonName: data.responsiblePersonName || "",
                        responsiblePersonEmail: data.responsiblePersonEmail || "",
                        responsiblePersonPhoneNumber: data.responsiblePersonPhoneNumber || "",
                        addInfo: data.addInfo || "",
                        email: data.email || "",
                        addresses: data.addresses || [],
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

    const navigate = useNavigate();

    const toggleReasonForm = () => {
        setShowReasonForm(!showReasonForm);
    };

    const [cardOrder, setCardOrder] = useState([0, 1, 2]); // Порядок карточек

    const handleCardClick = (index) => {
        if (index === cardOrder[1] || isTransitioning) return;

        setIsTransitioning(true);

        const newOrder = [...cardOrder];
        const centerIndex = newOrder[1];
        const clickedIndexInOrder = newOrder.indexOf(index);

        newOrder[1] = index;
        newOrder[clickedIndexInOrder] = centerIndex;

        setCardOrder(newOrder);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 300); // зависит от transition-duration в CSS
    };


    return (
        <>
            <div className="headersorgSC">
                <button className="exitbuttonsc" title="Вернуться на главную" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Exit" />
                </button>
                <h1 className="textSC">ПРОВЕРКА ЗАЯВКИ</h1>
                <button className="deletebuttonSC" title="Удалить заявку" onClick={() => setShowDeleteModal(true)}>
                    <img src="/src/icons/close.png" alt="Delete" />
                </button>
            </div>

            <div className="statusplate">
                <div className="status">
                    <label>Текущий статус: <input type="text" value={currentStatus} disabled /></label>
                    {oranizationData.connectionRequestStatus === "REJECTED" && (
                        <button className="reasonbutton" onClick={toggleReasonForm}>Причина</button>
                    )}
                </div>
            </div>

            <div className="cardsContainer">
                {cardOrder.map((cardIndex) => {
                    const cardData = [
                        {
                            title: "Адрес",
                            content: (
                                <>
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
                                        <input type="text" value={oranizationData.addresses?.[0]?.subjectName || ""} disabled />
                                    </div>
                                    <div className="orginfoitemSC">
                                        <label>Город:</label>
                                        <input type="text" value={oranizationData.addresses?.[0]?.cityName || ""} disabled />
                                    </div>
                                    <div className="orginfoitemSC">
                                        <label>Улица:</label>
                                        <input type="text" value={oranizationData.addresses?.[0]?.streetName || ""} disabled />
                                    </div>
                                    <div className="orginfoitemSC">
                                        <label>Дом:</label>
                                        <input type="text" value={oranizationData.addresses?.[0]?.houseNumber || ""} disabled />
                                    </div>
                                </>
                            )
                        },
                        {
                            title: "Информация об организации",
                            content: (
                                <>
                                    <div className="orginfoitemSC">
                                        <label>Полное название:</label>
                                        <input type="text" value={oranizationData.fullName} disabled />
                                    </div>
                                    <div className="orginfoitemSC">
                                        <label>Сокращенное название:</label>
                                        <input type="text" value={oranizationData.shortName} disabled />
                                    </div>
                                    <div className="orginfoitemSC">
                                        <label>ИНН:</label>
                                        <input type="text" value={oranizationData.inn} disabled />
                                    </div>
                                    <div className="orginfoitemSC">
                                        <label>КПП:</label>
                                        <input type="text" value={oranizationData.kpp} disabled />
                                    </div>
                                    <div className="orginfoitemSC">
                                        <label>ОГРН:</label>
                                        <input type="text" value={oranizationData.ogrn} disabled />
                                    </div>
                                </>
                            )

                        },
                        {
                            title: "Контактное лицо",
                            content: (
                                <>
                                    <div className="contactinfoitemSC">
                                        <label>Фамилия:</label>
                                        <input type="text" value={oranizationData.responsiblePersonSurname} disabled />
                                    </div>
                                    <div className="contactinfoitemSC">
                                        <label>Имя:</label>
                                        <input type="text" value={oranizationData.responsiblePersonName} disabled />
                                    </div>
                                    <div className="contactinfoitemSC">
                                        <label>Email:</label>
                                        <input type="text" value={oranizationData.responsiblePersonEmail} disabled />
                                    </div>
                                    <div className="contactinfoitemSC">
                                        <label>Номер телефона:</label>
                                        <input type="text" value={oranizationData.responsiblePersonPhoneNumber} disabled />
                                    </div>
                                    <div className="contactinfoitemSC">
                                        <label>Доп. информация:</label>
                                        <input type="text" value={oranizationData.addresses?.[0]?.addInfo || ""} disabled />
                                    </div>
                                </>
                            )
                        }
                    ][cardIndex];

                    return (
                        <div
                            key={cardIndex}
                            className={`card ${cardOrder.indexOf(cardIndex) === 1 ? 'center' : cardOrder.indexOf(cardIndex) === 0 ? 'left' : 'right'}`}
                            onClick={() => handleCardClick(cardIndex)}
                        >
                            <h2>{cardData.title}</h2>
                            {cardData.content}
                        </div>
                    );
                })}
            </div>

            {showReasonForm && (
                <div className="modalSC">
                    <div className="modalSC-content">
                        <span className="closemodalSC" onClick={toggleReasonForm}>&times;</span>
                        <h2>Причина отклонения</h2>
                        <textarea className="reason-textarea" value={oranizationData.connectionRequestAddInfo} disabled />
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <Deleteparthpage onClose={() => setShowDeleteModal(false)} />
            )}
        </>
    );
}

export default OrgStatusCheck_page;