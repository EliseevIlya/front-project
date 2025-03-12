import { useState } from "react";
import "./style_adminacc.css";
import {useNavigate} from "react-router-dom";

function AdminAcc_page() {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const navigate = useNavigate();

    return (
        <div>
            <div className="headersAdmin">
                <div className="headexit">
                    <button className="exitbutton" title="Выйти из аккаунта" onClick={() => navigate("/")}>Выйти</button>
                </div>
                <div className="headtextAdmin">
                    <div className="headnameAdmin">
                        <h1>АДМИНИСТРАТОР</h1>
                    </div>
                    <div className="headpodtextAdmin">
                        <h2>ЛИЧНЫЙ КАБИНЕТ</h2>
                    </div>
                </div>
            </div>

            <div className="controlpanel">
                <div className="info">
                    <div className="infoitem">
                        <label>Должность*:</label>
                        <input type="text" defaultValue="Администратор" disabled={!isEditing}/>
                    </div>
                    <div className="infoitem">
                        <label>Фамилия*:</label>
                        <input type="text" defaultValue="Сидоров" disabled={!isEditing}/>
                    </div>
                    <div className="infoitem">
                        <label>Имя*:</label>
                        <input type="text" defaultValue="Сидр" disabled={!isEditing}/>
                    </div>
                    <div className="infoitem">
                        <label>Отчество:</label>
                        <input type="text" defaultValue="Сидорович" disabled={!isEditing}/>
                    </div>
                    <div className="infoitem">
                        <label>Номер тел.*:</label>
                        <input type="text" defaultValue="799900000001" disabled={!isEditing}/>
                    </div>
                    <div className="infoitem">
                        <label>E-mail*:</label>
                        <input type="text" defaultValue="sidorov@mail.ru" disabled={!isEditing}/>
                    </div>
                </div>
                <div className="control">
                    <div className="controlitem">
                        <label>Заявки: </label>
                        <button>Перейти</button>
                    </div>
                    <div className="controlitem">
                        <label>Пользователи: </label>
                        <button onClick={() => navigate("/userstable_page")}>Перейти</button>
                    </div>
                    <div className="controlitem">
                        <label>Организации: </label>
                        <button onClick={() => navigate("/orgtable_page")}>Перейти</button>
                    </div>
                </div>
            </div>

            <div className="buttonplateAdmin">
                    <button className="editbuttonAdmin" onClick={toggleEdit}>
                        {isEditing ? "Сохранить" : "Изменить"}
                    </button>
            </div>
        </div>
    );
}

export default AdminAcc_page;
