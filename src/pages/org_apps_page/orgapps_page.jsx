import "./style_orgapps.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Deleterequest from "../deleterequestpage/deleterequestpage";
import { getOrganizationServicesRequests } from "../../api/Org.js";

function OrgApps_page() {
    const [apps, setApps] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [size, setSize] = useState(3);

    const fetchData = async () => {
        try {
            const response = await getOrganizationServicesRequests();
            console.log(response);

            return response.map(item => {
                const [date, duration] = item.dateService.split(" ");

                return {
                    userid: item.customerOrganizationResponseDTO.id,
                    surname: item.customerOrganizationResponseDTO.surname,
                    name: item.customerOrganizationResponseDTO.name,
                    patronymic: item.customerOrganizationResponseDTO.patronymic,
                    phoneNumber: item.customerOrganizationResponseDTO.phoneNumber,
                    dateService: date,
                    time: duration,
                    id: item.id,
                    addInfo: item.addInfo ?? "Доп. информация отсутствует",
                    serviceDetails: item.serviceDetails,
                    cost: item.serviceDetails.reduce((total, service) => total + service.cost, 0)
                };
            });
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchNewData = async () => {
            const newData = await fetchData();
            setApps(newData.slice(0, size));
            console.log("Заявки обновлены");
        };

        fetchNewData();
    }, [size]);

    const loadMoreApps = () => {
        setSize(prevSize => prevSize + 3);
    };

    const closeModal = () => {
        setSelectedApp(null);
        setShowDeleteModal(false);
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
                                <p><strong className="carddata">Дата:</strong> {app.dateService}</p>
                                <p><strong className="carddata">Клиент:</strong> {app.surname} {app.name}</p>
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
                                <strong className="infoapp">Дата:</strong> {selectedApp.dateService}
                            </label>
                            <label className="label-inline">
                                <strong className="infoapp">Время:</strong> {selectedApp.time}
                            </label>
                        </div>

                        <div className="clientdata">
                            <label className="label-inline">
                                <strong className="infoapp">Клиент:</strong> {selectedApp.surname} {selectedApp.name} {selectedApp.patronymic}
                            </label>
                            <label className="label-inline">
                                <strong className="infoapp">Телефон:</strong> {selectedApp.phoneNumber}
                            </label>
                        </div>

                        <div className="services">
                            <label className="label-inline">
                                <strong className="infoapp">Выбранные услуги:</strong>
                            </label>
                            <ul>
                                {selectedApp.serviceDetails.map((service, index) => (
                                    <li key={index}>{service.name}: {service.cost}₽ - {service.duration} мин.</li>
                                ))}
                            </ul>
                        </div>

                        <div className="pricedata">
                            <label className="label-inline">
                                <strong className="infoapp">Доп. информация:</strong> {selectedApp.addInfo}
                            </label>
                            <label className="label-inline">
                                <strong className="infoapp">Итоговая стоимость:</strong> {selectedApp.cost}₽
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <Deleterequest
                    onClose={closeModal}
                    onDelete={() => console.log("Заявка удалена (заглушка)")}
                />
            )}
        </>
    );
}

export default OrgApps_page;
