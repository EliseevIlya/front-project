import "./style_createservices.css";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateServices_page() {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({
        sphere: 'Мойка',
        name: '',
        cost: '',
        time: ''
    });
    const [editingService, setEditingService] = useState(null); // Состояние для редактируемой услуги
    const [errors, setErrors] = useState({
        name: '',
        cost: '',
        time: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingService !== null) {
            const updatedServices = services.map(service =>
                service.id === editingService ? { ...service, [name]: value } : service
            );
            setServices(updatedServices);
        } else {
            setNewService({
                ...newService,
                [name]: value
            });
        }
    };

    const validateService = () => {
        const errors = {};

        // Валидация поля "name"
        if (!newService.name) {
            errors.name = "Название услуги не может быть пустым.";
        }

        // Валидация поля "cost" (стоимость) - должно быть числом
        if (!newService.cost) {
            errors.cost = "Стоимость не может быть пустой.";
        } else if (isNaN(newService.cost)) {
            errors.cost = "Стоимость должна быть числом.";
        }

        // Валидация поля "time" (время) - должно быть числом
        if (!newService.time) {
            errors.time = "Время не может быть пустым.";
        } else if (isNaN(newService.time)) {
            errors.time = "Время должно быть числом.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Если ошибок нет, возвращаем true
    };

    const addService = () => {
        if (validateService()) {
            setServices([...services, { ...newService, id: services.length + 1 }]);
            setNewService({ sphere: 'Мойка', name: '', cost: '', time: '' }); // сброс полей
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
                <button className="exitbutton" title="Вернуться к заявке" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <h1 className="textServices">Личный кабинет</h1>
            </div>
            <input type="text" className="companyinfo" disabled value="Авангард г.Самара ул.Пушкина 6"/>
            <button className="infoButton" onClick={() => navigate("/org_info_page")}>Подробная
                информация
            </button>
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
                    {services.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{textAlign: "center"}}>Нет доступных услуг</td>
                        </tr>
                    ) : (
                        services.map(service => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>
                                    {editingService === service.id ? (
                                        <select
                                            name="sphere"
                                            value={service.sphere}
                                            onChange={handleInputChange}
                                            className="tableselect"
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
                                            className="tableinput"
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
                                            className="tableinput"
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
                                            className="tableinput"
                                        />
                                    ) : (
                                        service.time
                                    )}
                                </td>
                                <td>
                                    {editingService === service.id ? (
                                        <button className="buttonServices" onClick={stopEditing}>
                                            <img src='/src/icons/save.png' alt='Save' />
                                        </button>
                                    ) : (
                                        <button className="buttonServices" onClick={() => startEditing(service.id)}>
                                            <img src='/src/icons/edit.png' alt='Edit' />
                                        </button>
                                    )}

                                    <button className="deletebuttonServices" title="Удалить услугу"
                                            onClick={() => deleteService(service.id)}>
                                        <img src="/src/icons/close.png" alt="Delete"/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                <div className="newServiceForm">
                <select name="sphere" value={newService.sphere} onChange={handleInputChange}>
                        <option value="Мойка">Мойка</option>
                        <option value="Шиномонтаж">Шиномонтаж</option>
                    </select>
                    <input
                        type="text"
                        name="name"
                        placeholder="Название"
                        value={newService.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}

                    <input
                        type="text"
                        name="cost"
                        placeholder="Стоимость(руб.)"
                        value={newService.cost}
                        onChange={handleInputChange}
                    />
                    {errors.cost && <p className="error">{errors.cost}</p>}

                    <input
                        type="text"
                        name="time"
                        placeholder="Время(мин)"
                        value={newService.time}
                        onChange={handleInputChange}
                    />
                    {errors.time && <p className="error">{errors.time}</p>}

                    <button className="buttonServices" title="Добавить услугу" onClick={addService}>
                        <img src="/src/icons/create.png" alt="Создать"/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateServices_page;
