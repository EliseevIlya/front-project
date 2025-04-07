import React, { useState, useEffect } from "react";
import "./style_orgstatusedit.css";
import { useNavigate } from "react-router-dom";
import { getOneOrganization } from "../../api/Org";

function OrgStatusEdit_page() {
    const [status, setStatus] = useState("Новая");
    const [showPopup, setShowPopup] = useState(false);
    const [reason, setReason] = useState("");
    const [reviewDate, setReviewDate] = useState(""); // состояние для даты рассмотрения
    const navigate = useNavigate();
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

    // Функция для получения текущей даты в нужном формате
    const getCurrentDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    // При монтировании компонента установим текущую дату
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

        setReviewDate(getCurrentDate());
    }, []);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async () => {
        if (status === "Отклонена") {
            await putAdminConnectionRequest(localStorage.getItem("connectionRequestid"),"Отклонена")
            setShowPopup(true);
        } else if (status === "Исполнена") {
            await putAdminConnectionRequest(localStorage.getItem("connectionRequestid"),"Исполнения")
            navigate("/org/forms");
        } else {
            alert("Заявка отправлена!");
        }
    };

    const handlePopupSubmit = async () => {
        if (reason.length >= 10) {
            await putAdminConnectionRequest(localStorage.getItem("connectionRequestid"),"Отклонена")
            setShowPopup(false); // Закрываем модальное окно
            navigate("/org/forms"); // Переходим на страницу форм заявок
        }
    };

    const closeModal = () => {
        setShowPopup(false);
        setReason("");
    };

    return (
        <>
            <div className="headersorgSC">
                <button className="exitbuttonsc" title="Вернуться к заявкам" onClick={() => navigate("/org_apps")}>
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <h1 className="textorgSE">РАССМОТРЕНИЕ ЗАЯВКИ</h1>
            </div>

            <div className="statusplate">
                <div className="status">
                    <label>
                        Текущий статус:
                        <select value={status} onChange={handleStatusChange}>
                            <option value="Новая">Новая</option>
                            <option value="В работе">В работе</option>
                            <option value="Исполнена">Исполнена</option>
                            <option value="Отклонена">Отклонена</option>
                        </select>
                    </label>
                </div>
                <div className="dates">
                    <div className="daterequest">
                        <label>
                            Дата составления:
                            <input type="text" defaultValue="6.03.2025" disabled />
                        </label>
                    </div>
                    <div className="dateresponse">
                        <label>
                            Дата рассмотрения:
                            <input type="text" value={reviewDate} disabled />
                        </label>
                    </div>
                </div>
            </div>

            <div className="registrationSC">
                <div className="orginfoSC">
                     <h2>Информация об организации</h2>
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
                    <h2>Контактное лицо</h2>
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
                </div>
                    <div className="buttonplateSC">
                        <button
                            className="accbuttonSC"
                            disabled={!(status === "Исполнена" || status === "Отклонена")}
                            onClick={handleSubmit}
                        >
                            Отправить
                        </button>
                    </div>
                </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Причина отклонения</h2>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Введите причину..."
                        />
                        <div className="popup-buttons">
                            <button
                                onClick={handlePopupSubmit}
                                disabled={reason.length < 10}
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default OrgStatusEdit_page;
