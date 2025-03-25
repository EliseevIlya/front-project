import { useState } from "react";
import "./style_orgstatusedit.css";
import { useNavigate } from "react-router-dom";

function OrgStatusEdit_page() {
    const [status, setStatus] = useState("Новая");
    const [showPopup, setShowPopup] = useState(false);
    const [reason, setReason] = useState("");
    const navigate = useNavigate();

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = () => {
        if (status === "Отклонена") {
            setShowPopup(true);
        } else if (status === "Исполнена") {
            navigate("/org/forms");
        } else {
            alert("Заявка отправлена!");
        }
    };

    const handlePopupSubmit = () => {
        if (reason.length >= 10) {
<<<<<<< HEAD
            alert(`Заявка отклонена по причине: ${reason}`);
            setShowPopup(false);
            setReason("");
            navigate("/org/forms"); 
=======
            setShowPopup(false); // Закрываем модальное окно
            navigate("/org/forms"); // Переходим на страницу форм заявок
>>>>>>> parent of 4f9b9c9 (Merge pull request #39 from teampapo/akiyanara)
        }
    };

    const closeModal = () => {
        setShowPopup(false);
        setReason("");
    };

    return (
        <>
            <div className="headersorgSC">
                <button className="exitbuttonSC" onClick={() => navigate("/admin_acc_page")}>Вернуться</button>
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
                            <input type="text" defaultValue="6.03.2025" disabled/>
                        </label>
                    </div>
                    <div className="dateresponse">
                        <label>
                            Дата рассмотрения:
                            <input type="text" defaultValue="10.03.2025" disabled />
                        </label>
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
                    <div className="contactinfoitemSC">
                        <label>Доп. информация:</label>
                        <textarea disabled></textarea>
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
