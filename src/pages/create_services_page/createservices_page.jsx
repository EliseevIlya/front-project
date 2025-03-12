import "./style_createservices.css";
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

function CreateServices_page() {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({
        sphere: 'Мойка',
        name: '',
        cost: '',
        time: ''
    });
    const [editingService, setEditingService] = useState(null); // Состояние для редактируемой услуги

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingService !== null) {
            // Если редактируем существующую услугу
            const updatedServices = services.map(service =>
                service.id === editingService ? { ...service, [name]: value } : service
            );
            setServices(updatedServices);
        } else {
            // Если добавляем новую услугу
            setNewService({
                ...newService,
                [name]: value
            });
        }
    };

    const addService = () => {
        if (newService.name && newService.cost && newService.time) {
            setServices([...services, { ...newService, id: services.length + 1 }]);
            setNewService({ sphere: 'Мойка', name: '', cost: '', time: '' }); // сброс полей
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    };

    const deleteService = (id) => {
        setServices(services.filter(service => service.id !== id));
    };

    const startEditing = (id) => {
        setEditingService(id); // Устанавливаем ID редактируемой услуги
    };

    const stopEditing = () => {
        setEditingService(null); // Завершаем редактирование
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="headerservices">
                <button className="exitbuttonservices" onClick={() => navigate("/org_statuscheck_page")}>Вернуться к заявке</button>
                <h1 className="textServices">Личный кабинет</h1>
            </div>
            <input type="text" className="companyinfo" disabled value="Авангард г.Самара ул.Пушкина 6"/>
            <div className="servicesTable">
                <table className="tableServ">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Сфера</th>
                        <th>Название</th>
                        <th>Стоимость</th>
                        <th>Время</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>
                                {editingService === service.id ? (
                                    <select
                                        name="sphere"
                                        value={service.sphere}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Мойка">Мойка</option>
                                        <option value="Шиномонтаж">Шиномонтаж</option>
                                    </select>
                                ) : (
                                    service.sphere
                                )}
                            </td>
                            <td>
                                {editingService === service.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={service.name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.name
                                )}
                            </td>
                            <td>
                                {editingService === service.id ? (
                                    <input
                                        type="text"
                                        name="cost"
                                        value={service.cost}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.cost
                                )}
                            </td>
                            <td>
                                {editingService === service.id ? (
                                    <input
                                        type="text"
                                        name="time"
                                        value={service.time}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    service.time
                                )}
                            </td>
                            <td>
                                {editingService === service.id ? (
                                    <button className="buttonServices" onClick={stopEditing}>Сохранить</button>
                                ) : (
                                    <button className="buttonServices" onClick={() => startEditing(service.id)}>Изменить</button>
                                )}
                                <button className="deletebuttonServices" onClick={() => deleteService(service.id)}>x</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="newServiceForm">
                    <select name="sphere" value={newService.sphere} onChange={handleInputChange}>
                        <option value="Мойка">Мойка</option>
                        <option value="Шиномонтаж">Шиномонтаж</option>
                    </select>
                    <input type="text" name="name" placeholder="Название" value={newService.name} onChange={handleInputChange} />
                    <input type="text" name="cost" placeholder="Стоимость(руб.)" value={newService.cost} onChange={handleInputChange} />
                    <input type="text" name="time" placeholder="Время(мин)" value={newService.time} onChange={handleInputChange} />
                    <button className="buttonServices" onClick={addService}>Добавить</button>
                </div>
            </div>
        </>
    );
}

export default CreateServices_page;