import { useState } from "react";
import "./style_orgstatuscheck.css";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import Deleteparthpage from "../deletepartnership/deletepartnership";

function OrgStatusCheck_page() {
    const [isEditing, setIsEditing] = useState(false);
    const [showReasonForm, setShowReasonForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
=======

function OrgStatusCheck_page() {
    const [showReasonForm, setShowReasonForm] = useState(false);
    const [status, setStatus] = useState("Отклонена");
>>>>>>> Stashed changes

    const toggleReasonForm = () => {
        setShowReasonForm(!showReasonForm);
    };

    const navigate = useNavigate();

    const validStatuses = ["Новая", "В работе", "Исполнена", "Отклонена"];

    const isStatusValid = validStatuses.includes(status);

    return (
        <>
            <div className="headersorgSC">
                <button className="exitbuttonSC" onClick={() => navigate("/")}>Выйти</button>
                <h1 className="textSC">ПРОВЕРКА ЗАЯВКИ</h1>
                <button className="deletebuttonSC" onClick={() => setShowDeleteModal(true)}>Удалить</button>
            </div>

            <div className="statusplate">
                <div className="status">
<<<<<<< Updated upstream
                    <label>Текущий статус:<input type="text" defaultValue="Новая" disabled /></label>
                    <button className="reasonbutton" onClick={toggleReasonForm}>Причина</button>
                </div>
                <div className="dates">
                    <div className="daterequest">
                        <label>Дата составления:<input type="text" defaultValue="6.03.2025" disabled /></label>
                    </div>
                    <div className="dateresponse">
                        <label>Дата рассмотрения:<input type="text" defaultValue="10.03.2025" disabled /></label>
=======
                    <label>Текущий статус:
                        <input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            disabled
                        />
                    </label>
                    {/* Кнопка "Причина" появляется только если статус "Отклонена" */}
                    {status === "Отклонена" && isStatusValid && (
                        <button className="reasonbutton" onClick={toggleReasonForm}>Причина</button>
                    )}
                </div>
                <div className="dates">
                    <div className="daterequest">
                        <label>Дата составления:
                            <input type="text" defaultValue="6.03.2025" disabled />
                        </label>
                    </div>
                    <div className="dateresponse">
                        <label>Дата рассмотрения:
                            <input type="text" defaultValue="10.03.2025" disabled />
                        </label>
>>>>>>> Stashed changes
                    </div>
                </div>
            </div>

            <div className="registrationSC">
                <div className="orginfoSC">
                    <h2>Информация об организации:</h2>
                    {['Полное название', 'Сокращенное', 'ИНН', 'КПП', 'ОГРН', 'Город', 'Адрес'].map((label, index) => (
                        <div className="orginfoitemSC" key={index}>
                            <label>{label}:</label>
                            <input type="text" disabled/>
                        </div>
                    ))}
                </div>
                <div className="contactinfoSC">
                    <h2>Контактное лицо:</h2>
                    {['Фамилия', 'Имя', 'Email', 'Номер тел.'].map((label, index) => (
                        <div className="contactinfoitemSC" key={index}>
                            <label>{label}:</label>
                            <input type="text" disabled/>
                        </div>
                    ))}
                    <div className="buttonplateSC">
<<<<<<< Updated upstream
                        {isEditing ? (
                            <button className="repeatbuttonSC" onClick={toggleEditMode}>Пересоздать заявку</button>
                        ) : (
                            <button className="editbuttonSC" onClick={toggleEditMode}>Изменить</button>
                        )}
=======
>>>>>>> Stashed changes
                        <button className="accbuttonSC" onClick={() => navigate("/create/services")}>Личный кабинет</button>
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
    );
}

export default OrgStatusCheck_page;
