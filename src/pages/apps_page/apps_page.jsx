import "./style_apps.css";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Deleterequest from "../deleterequestpage/deleterequestpage";
import { getCustomerServiceRequest,deleteServiceRequest } from "../../api/Customer";

/*const initialApps = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    date: "",
    time: "",
    organization: "",
    address: "",
    services: [],
    cost: ""
}));*/
// TODO если хотите это объявление можете переделать под то как оно в fetchData если не хотите оно и так работает



function Apps_page() {
    //const [apps, setApps] = useState(initialApps);
    const [apps, setApps] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [organizationId, setOrganizationId] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [size, setSize] = useState(3);


    const fetchData = async () => {
        try {
            const jwt = localStorage.getItem("jwt"); // Получаем токен
            const response = await getCustomerServiceRequest(jwt,  organizationId,startDate,size);
            console.log(response);

            // Преобразуем данные в нужный формат
            return  response.map(item => ({
                id: item.id,
                date: item.dateService.split("T")[0], // Оставляем только дату
                time: item.dateService.split("T")[1], // Время отдельно
                organization: item.organization.fullName,
                address: item.organization.addresses.length > 0
                    ? `${item.organization.addresses[0].cityName}, ${item.organization.addresses[0].streetName}, ${item.organization.addresses[0].houseNumber}`
                    : "Адрес не указан",
                services: item.serviceDetails.map(service => ({
                    name: service.name,
                    cost: service.cost,
                    duration: service.duration
                })),
                cost: item.serviceDetails.reduce((total, service) => total + service.cost, 0) // Считаем общую стоимость
            }));


        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            return [];
        }

    };
/*
    useEffect(() => {
        const loadInitialData = async () => {
            const newData = await fetchData();
            setApps(newData); // Устанавливаем полученные данные
            console.log("Заявки загружены")
        };

        loadInitialData();

    }, []); // [] — эффект выполняется только при первом рендере


    const loadMoreApps = async () => {
        await setSize(size + 3);

        const newData = await fetchData(); // Ждём новые данные

        setApps(newData); // Полностью перезаписываем apps
        console.log("Заявки обновлены")
    };
*/
    useEffect(() => {
        const fetchNewData = async () => {
            const newData = await fetchData();
            setApps(newData);
            console.log("Заявки обновлены");
        };

        fetchNewData();
    }, [size]); // Теперь fetchData() вызывается после обновления size

    const loadMoreApps = () => {
        setSize(prevSize => prevSize + 3);
    };


    const closeModal = () => {
        setSelectedApp(null);
        setShowDeleteModal(false);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const deleteApp = async () => {

        await deleteServiceRequest(localStorage.getItem("jwt"), selectedApp.id);
        closeModal();
        setSelectedApp(null);
        window.location.reload()

    };

    const navigate = useNavigate();

    /*return (
        <>
            <div className="headersApps">
                <button className="accbuttonApps"  title="Личный кабинет" onClick={() => navigate("/user")}>
                    <img  src="/src/icons/profile.png" alt="Личный кабинет"/>
                </button>
                <h1 className="textApp">ЗАЯВКИ</h1>
                <button className="createbuttonApps" title="Добавить заявку" onClick={() => navigate("/service")}>
                    <img  src="/src/icons/create.png" alt="Создать"/>
                </button>
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
                </div>
                <div></div>
                <button className="load-more" onClick={loadMoreApps}>Загрузить еще</button>
            </div>

            {selectedApp && (
                <div className="modalapp">
                    <div className="modalapp-content">
                        <span className="closemodalapp" onClick={closeModal}>&times;</span>
                        <h2 className="textmodalapp">Заявка №{selectedApp.id}</h2>

                        <div className="datetime">
                            <label className="label-inline">
                                Дата: <input type="text" readOnly />
                                Время: <input type="text" readOnly />
                            </label>
                        </div>

                        <div className="orgdata">
                            <label className="label-inline">
                                Организация: <input type="text" value={selectedApp.organization} readOnly />
                            </label>
                            <label className="label-inline">
                                Адрес: <input type="text" value={selectedApp.address} readOnly />
                            </label>
                        </div>

                        <div className="pricedata">
                            <label className="label-inline">
                                Выбранные услуги:
                                <div className="services-select">
                                    <span>{availableServices[0].name}: {availableServices[0].cost}₽ - {availableServices[0].duration}</span>
                                </div>
                            </label>

                            <label className="label-inline">
                                Итоговая стоимость: <input type="text" value={selectedApp.cost} readOnly />
                            </label>
                        </div>

                        <div className="modal-buttons">
                            <button className="deleteappbutton" onClick={handleDeleteClick}>Удалить заявку</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <Deleterequest
                    onClose={closeModal}
                    onDelete={deleteApp}
                />
            )}
        </>
    );*/

   /* return (
        <>
            <div className="headersApps">
                <button className="accbuttonApps" title="Личный кабинет" onClick={() => navigate("/user")}>
                    <img src="/src/icons/profile.png" alt="Личный кабинет"/>
                </button>
                <h1 className="textApp">ЗАЯВКИ</h1>
                <button className="createbuttonApps" title="Добавить заявку" onClick={() => navigate("/service")}>
                    <img src="/src/icons/create.png" alt="Создать"/>
                </button>
                <button className="load-more" onClick={loadMoreApps}>Загрузить еще</button>
            </div>

            <div className="apps-container">
                <div className="cards-grid">
                    {apps.map((app) => (
                        <div key={app.id} className="card" onClick={() => setSelectedApp(app)}>
                            <h2 className="cardhead">Заявка №{app.id}</h2>
                            <p><strong className="carddata">Дата:</strong> {app.date}</p>
                            <p><strong className="carddata">Организация:</strong> {app.organization}</p>
                            <p><strong className="carddata">Стоимость:</strong> {app.cost}₽</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedApp && (
                <div className="modalapp">
                    <div className="modalapp-content">
                        <span className="closemodalapp" onClick={() => setSelectedApp(null)}>&times;</span>
                        <h2 className="textmodalapp">Заявка №{selectedApp.id}</h2>

                        <div className="datetime">
                            <p><strong>Дата:</strong> {selectedApp.date}</p>
                            <p><strong>Время:</strong> {selectedApp.time}</p>
                        </div>

                        <div className="orgdata">
                            <p><strong>Организация:</strong> {selectedApp.organization}</p>
                            <p><strong>Адрес:</strong> {selectedApp.address}</p>
                        </div>

                        <div className="services">
                            <p><strong>Выбранные услуги:</strong></p>
                            <ul>
                                {selectedApp.services.map((service, index) => (
                                    <li key={index}>{service.name}: {service.cost}₽ - {service.duration} мин.</li>
                                ))}
                            </ul>
                        </div>

                        <p><strong>Итоговая стоимость:</strong> {selectedApp.cost}₽</p>
                    </div>
                </div>
            )}
        </>
    );*/
    return (
        <>
            <div className="headersApps">
                <button className="accbuttonApps" title="Личный кабинет" onClick={() => navigate("/user")}>
                    <img src="/src/icons/profile.png" alt="Личный кабинет" />
                </button>
                <h1 className="textApp">ЗАЯВКИ</h1>
                <button className="createbuttonApps" title="Добавить заявку" onClick={() => navigate("/service")}>
                    <img src="/src/icons/create.png" alt="Создать" />
                </button>
            </div>

            <div className="apps-container">
                <div className="cards-grid">
                    {apps.map((app) => (
                        <div key={app.id} className="card" onClick={() => setSelectedApp(app)}>
                            <h2 className="cardhead">Заявка №{app.id}</h2>
                            <p><strong className="carddata">Дата:</strong> {app.date}</p>
                            <p><strong className="carddata">Организация:</strong> {app.organization}</p>
                            <p><strong className="carddata">Стоимость:</strong> {app.cost}₽</p>
                        </div>
                    ))}
                </div>
                <div></div>
                <button className="load-more" onClick={loadMoreApps}>Загрузить еще</button>
            </div>

            {selectedApp && (
                <div className="modalapp">
                    <div className="modalapp-content">
                        <span className="closemodalapp" onClick={() => setSelectedApp(null)}>&times;</span>
                        <h2 className="textmodalapp">Заявка №{selectedApp.id}</h2>

                        <div className="datetime">
                            <label className="label-inline">
                                <p ><strong>Дата:</strong> {selectedApp.date}</p>
                            </label>
                            <label className="label-inline">
                                <p type="text"><strong>Время:</strong> {selectedApp.time}</p>
                            </label>
                        </div>

                        <div className="orgdata">
                            <label className="label-inline">
                                <p><strong>Организация:</strong> {selectedApp.organization}</p>
                            </label>
                            <label className="label-inline">
                                <p><strong>Адрес:</strong> {selectedApp.address}</p>
                            </label>
                        </div>

                        <div className="services">

                            <label className="label-inline">
                                <p><strong>Выбранные услуги:</strong></p>
                            </label>
                                <ul>
                                    {selectedApp.services.map((service, index) => (
                                        <li key={index}>{service.name}: {service.cost}₽ - {service.duration} мин.</li>
                                    ))}
                                </ul>

                        </div>
                        <div className="pricedata">
                            <label className="label-inline">
                                <p><strong>Итоговая стоимость:</strong> {selectedApp.cost}₽</p>
                            </label>
                        </div>
                        <div className="modal-buttons">
                            <button className="deleteappbutton" onClick={handleDeleteClick}>Удалить заявку</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <Deleterequest
                    onClose={closeModal}
                    onDelete={deleteApp}
                />
            )}
        </>
    );
}

export default Apps_page;
