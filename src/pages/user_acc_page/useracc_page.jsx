import { useState } from "react";
import "./style_useracc.css";
import { useNavigate } from "react-router-dom";
import Deleteaccpage from "../deleteaccpage/deleteaccpage";

function UserAcc_page() {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Состояние для модального окна удаления

    const navigate = useNavigate();

    return (
        <div>
            <div className="headers">
                <div className="headexit">
                    <button className="exitbutton" title="Выйти из аккаунта" onClick={() => navigate("/")}>Выйти</button>
                </div>
                <div className="headtext">
                    <div className="headname">
                        <h1>PIONEER</h1>
                    </div>
                    <div className="headpodtext">
                        <h2>ЛИЧНЫЙ КАБИНЕТ</h2>
                    </div>
                </div>
                <div className="headdelete">
                    <button 
                        className="deletebutton" 
                        title="Удалить аккаунт"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        Удалить
                    </button>
                </div>
            </div>

            <div className="headers">
                <div className="info">
                    <div className="infoitem">
                        <label>ФАМИЛИЯ*:</label>
                        <input type="text" defaultValue="ИВАНОВ" disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>ИМЯ*:</label>
                        <input type="text" defaultValue="ИВАН" disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>ОТЧЕСТВО:</label>
                        <input type="text" defaultValue="ИВАНОВИЧ" disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>НОМЕР ТЕЛ.*:</label>
                        <input type="text" defaultValue="79990001110" disabled={!isEditing} />
                    </div>
                    <div className="infoitem">
                        <label>EMAIL*:</label>
                        <input type="text" defaultValue="ivanov@mail.ru" disabled={!isEditing} />
                    </div>
                </div>
                <div className="dopinfoitem">
                    <label>ДОП. ИНФОРМАЦИЯ:</label>
                    <textarea defaultValue="Дополнительная информация..." disabled={!isEditing}></textarea>
                </div>
            </div>

            <div className="buttonplate">
                <div className="editsave">
                    <button className="editbutton" onClick={() => setIsEditing((prev) => !prev)}>
                        {isEditing ? "Сохранить" : "Изменить"}
                    </button>
                </div>
                <div className="applications">
                    <button className="viewbutton" onClick={() => navigate("/user/request")}>Заявки</button>
                </div>
            </div>

            {isDeleteModalOpen && <Deleteaccpage onClose={() => setIsDeleteModalOpen(false)} />}  
        </div>
    );
}

export default UserAcc_page;
