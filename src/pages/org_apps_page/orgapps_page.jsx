import "./style_orgapps.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Deleterequest from "../deleterequestpage/deleterequestpage";
import { getCustomerServiceRequest, deleteServiceRequest } from "../../api/Customer";

function OrgApps_page() {
    const [apps, setApps] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [organizationId, setOrganizationId] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [size, setSize] = useState(3);

    const fetchData = async () => {
        try {
            const jwt = localStorage.getItem("jwt"); // Получаем токен
            const response = await getCustomerServiceRequest(jwt, organizationId, startDate, size);
            console.log(response);

            // Преобразуем данные в нужный формат
            return response.map(item => ({
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
        const isDeleted = await deleteServiceRequest(localStorage.getItem("jwt"), selectedApp.id);
        if (isDeleted) {
            closeModal();
            setSelectedApp(null);
            window.location.reload();
        }
    };

    const navigate = useNavigate();
    return (
        <>
            <div className="headersApps">
                <button className="accbuttonApps" title="Личный кабинет" onClick={() => navigate("/create_services")}>
                    <img src="/src/icons/orgprofile.png" alt="Личный кабинет" />
                </button>
                <h1 className="textOrgApp">ЗАЯВКИ</h1>
            </div>

            <div className="apps-container">
                <div className="cards-grid">
                    {apps.length > 0 ? (
                        apps.map((app) => (
                            <div key={app.id} className="card" onClick={() => setSelectedApp(app)}>
                                <h2 className="cardhead">Заявка №{app.id}</h2>
                                <p><strong className="carddata">Дата:</strong> {app.date}</p>
                                <p><strong className="carddata">Тип услуги:</strong> {app.organization}</p>
                                <p><strong className="carddata">Стоимость:</strong> {app.cost}₽</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-apps-message">У вас пока нет активных заявок!</div>
                    )}
                </div>
                {apps.length >= 3 && (
                    <button className="load-more" onClick={loadMoreApps}>Загрузить еще</button>
                )}
            </div>

            {selectedApp && (
                <div className="modalapp">
                    <div className="modalapp-content">
                        <span className="closemodalapp" onClick={() => setSelectedApp(null)}>&times;</span>
                        <h2 className="textmodalapp">Заявка №{selectedApp.id}</h2>

                        <div className="datetime">
                            <label className="label-inline">
                                <strong className="infoapp">Дата:</strong> {selectedApp.date}
                            </label>
                            <label className="label-inline">
                                <strong className="infoapp">Время:</strong> {selectedApp.time}
                            </label>
                        </div>

                        <div className="orgdata">
                            <label className="label-inline">
                                <strong className="infoapp">Организация:</strong> {selectedApp.organization}
                            </label>
                            <label className="label-inline">
                                <strong className="infoapp">Адрес:</strong> {selectedApp.address}
                            </label>
                        </div>

                        <div className="services">
                            <label className="label-inline">
                                <strong className="infoapp">Выбранные услуги:</strong>
                            </label>
                            <ul>
                                {selectedApp.services.map((service, index) => (
                                    <li key={index}>{service.name}: {service.cost}₽ - {service.duration} мин.</li>
                                ))}
                            </ul>
                        </div>
                        <div className="pricedata">
                            <label className="label-inline">
                                <strong className="infoapp">Итоговая стоимость:</strong> {selectedApp.cost}₽
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

export default OrgApps_page;