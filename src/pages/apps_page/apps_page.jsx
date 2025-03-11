import "./style_apps.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const initialApps = Array.from({length: 5}, (_, i) => ({
    id: i + 1,
    date: "",
    time: "",
    organization: "",
    address: "",
    services: [],
    cost: ""
}));

const availableServices = [
    {name: "Услуга 1", cost: 500, duration: "2 часа"},
];

function Apps_page() {
    const [apps, setApps] = useState(initialApps);
    const [selectedApp, setSelectedApp] = useState(null);
    const [showAllServices, setShowAllServices] = useState(false);

    const loadMoreApps = () => {
        const newApps = Array.from({length: 5}, (_, i) => ({
            id: apps.length + i + 1,
            date: "",
            time: "",
            organization: "",
            address: "",
            services: [],
            cost: ""
        }));
        setApps([...apps, ...newApps]);
    };

    const closeModal = () => {
        setSelectedApp(null);
    };

    function deleteApp(id) {
        setApps(apps.map(app =>
            app.id === id
                ? { ...app, date: "", time: "", organization: "", address: "", services: [], cost: "" }
                : app
        ));
        closeModal();
    }

    const toggleServices = () => {
        setShowAllServices(!showAllServices);
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="headersApps">
                <button className="exitbuttonApps" onClick={() => navigate("/user_acc_page")}>Личный кабинет</button>
                <h1 className="textApp">ЗАЯВКИ</h1>
                <button className="createbuttonApps">Создать</button>
            </div>

            <div className="apps-container">
                <div className="cards-grid">
                    {apps.map((app) => (
                        <div key={app.id} className="card" onClick={() => setSelectedApp(app)}>
                            <h2 className="cardhead">Заявка №{app.id}</h2>
                            <p><strong className="carddata">Дата:</strong> {app.date}</p>
                            <p><strong className="carddata">Организация:</strong> {app.organization}</p>
                            <p><strong className="carddata">Стоимость:</strong> {app.cost}</p>
                        </div>
                    ))}
                    <button className="load-more" onClick={loadMoreApps}>Загрузить еще</button>
                </div>
            </div>

            {selectedApp && (
                <div className="modalapp">
                    <div className="modalapp-content">
                        <span className="closemodalapp" onClick={closeModal}>&times;</span>
                        <h2 className="textmodalapp">Заявка №{selectedApp.id}</h2>

                        <div className="datetime">
                        <label className="label-inline">
                            Дата: <input type="text" readOnly/>
                            Время: <input type="text"  readOnly/>
                        </label>
                        </div>

                        <div className="orgdata">
                        <label className="label-inline">
                            Организация: <input type="text" value={selectedApp.organization} readOnly/>
                        </label>
                        <label className="label-inline">
                            Адрес: <input type="text" value={selectedApp.address} readOnly/>
                        </label>
                        </div>

                        <div className="pricedata">
                        <label className="label-inline">
                            Выбранные услуги:
                            <div className="services-select" onClick={toggleServices}>
                                <span>{availableServices[0].name}: {availableServices[0].cost}₽ - {availableServices[0].duration}</span>
                            </div>
                        </label>

                        <label className="label-inline">
                            Итоговая стоимость: <input type="text" value={selectedApp.cost} readOnly/>
                        </label>
                        </div>

                        <div className="modal-buttons">
                            <button onClick={() => deleteApp(selectedApp.id)} className="deleteappbutton">Удалить заявку</button>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}

export default Apps_page;
