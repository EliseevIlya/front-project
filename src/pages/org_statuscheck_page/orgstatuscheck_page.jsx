import React, {useEffect, useState} from "react";
import "./style_orgstatuscheck.css";
import {data, useNavigate} from "react-router-dom";
import Deleteparthpage from "../deletepartnership/deletepartnership";
import {getOneOrganization} from "../../api/Org.js";

function OrgStatusCheck_page() {
    const [showReasonForm, setShowReasonForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [status, setStatus] = useState("Отклонена");
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

    // Сопоставляем статусы
    const statusMap = {
        NEW: "Новая",
        IN_PROGRESS: "В работе",
        REJECTED: "Отклонена",
        COMPLETED: "Исполнена"
    };

    const currentStatus = statusMap[oranizationData.connectionRequestStatus] || "Неизвестно";

    useEffect(()=>{
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
    },[])

    const navigate = useNavigate();

    const toggleReasonForm = () => {
        setShowReasonForm(!showReasonForm);
    };

/*    const validStatuses = ["Новая", "В работе", "Исполнена", "Отклонена"];
    const isStatusValid = validStatuses.includes(status);*/

    /*return (
        <>
            <div className="headersorgSC">
                <button className="exitbuttonsc" title="Вернуться на главную" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <h1 className="textSC">ПРОВЕРКА ЗАЯВКИ</h1>
                <button className="deletebuttonSC" title="Удалить заявку" onClick={() => setShowDeleteModal(true)}>
                    <img src="/src/icons/close.png" alt="Delete"/>
                </button>
            </div>

            <div className="statusplate">
                <div className="status">
                    <label>Текущий статус: <input type="text" value={status} disabled/></label>
                    {status === "Отклонена" && isStatusValid && (
                        <button className="reasonbutton" onClick={toggleReasonForm}>Причина</button>
                    )}
                </div>
                <div className="dates">
                    <div className="daterequest">
                        <label>Дата составления: <input type="text" defaultValue="6.03.2025" disabled /></label>
                    </div>
                    <div className="dateresponse">
                        <label>Дата рассмотрения: <input type="text" defaultValue="10.03.2025" disabled /></label>
                    </div>
                </div>
            </div>

            <div className="registrationSC">
                <div className="orginfoSC">
                    <h2>Информация об организации:</h2>
                    {["Полное название", "Сокращенное", "ИНН", "КПП", "ОГРН", "Город", "Адрес"].map((label, index) => (
                        <div className="orginfoitemSC" key={index}>
                            <label>{label}:</label>
                            <input type="text" disabled />
                        </div>
                    ))}
                </div>
                <div className="contactinfoSC">
                    <h2>Контактное лицо:</h2>
                    {["Фамилия", "Имя", "Email", "Номер тел."].map((label, index) => (
                        <div className="contactinfoitemSC" key={index}>
                            <label>{label}:</label>
                            <input type="text" disabled />
                        </div>
                    ))}
                    <div className="buttonplateSC">
                        <button
                            className="accbuttonSCheck"
                            onClick={() => navigate("/create/services")}
                            disabled={status !== "Исполнена"} // Блокировка кнопки, если статус не "Исполнена"
                        >
                            Личный кабинет
                        </button>
                    </div>
                </div>
            </div>

            {showReasonForm && (
                <div className="modalSC">
                    <div className="modalSC-content">
                        <span className="closemodalSC" onClick={toggleReasonForm}>&times;</span>
                        <h2>Причина отклонения</h2>
                        <textarea className="reason-textarea" disabled></textarea>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <Deleteparthpage onClose={() => setShowDeleteModal(false)} />
            )}
        </>
    );*/
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
                    {currentStatus === "Отклонена" && (
                        <button className="reasonbutton" onClick={toggleReasonForm}>Причина</button>
                    )}
                </div>
                {/*<div className="dates">
                    <div className="daterequest">
                        <label>Дата составления: <input type="text" defaultValue="6.03.2025" disabled /></label>
                    </div>
                    <div className="dateresponse">
                        <label>Дата рассмотрения: <input type="text" defaultValue="10.03.2025" disabled /></label>
                    </div>
                </div>*/}
            </div>

            <div className="registrationSC">
                <div className="orginfoSC">
                    <h2>Информация об организации:</h2>
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
                    <div className="orginfoitemSC">
                        <label>Доп. информация:</label>
                        <input type="text" value={oranizationData.addInfo} disabled/>
                    </div>

                    <h2>Адрес:</h2>
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
                    <div className="orginfoitemSC">
                        <label>Доп. информация:</label>
                        <input type="text" value={oranizationData.addresses?.[0]?.addInfo || ""} disabled/>
                    </div>

                </div>

                <div className="contactinfoSC">
                    <h2>Контактное лицо:</h2>
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
                </div>
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