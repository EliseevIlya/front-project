import "./style_createservices.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getServiceDetail, postServiceDetail, deleteServiceDetail } from "../../api/ServiceDetail";
import { putServiceDetail } from "../../api/ServiceDetail";
import { getTypeService } from "../../api/TypeService";

function CreateServices_page() {
    const [Sphere, setSphere] = useState([]);
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({
        sphere: 0,
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


    const getTypeServices = async () => {

        const data = await getTypeService();
        const formattedServices = data.map((element) => ({
                id: element.id,
                code: element.code,
                name: element.name
        })
        )
        setSphere(formattedServices)
    }

    const GetServiceDetail = async () => {
        const data = await getServiceDetail(localStorage.getItem("jwt"));
        const formattedServices = data.content.map((element) => ({
            id: element.id,
            sphere: element.typeOfServiceName,
            name: element.name,
            cost: element.cost,
            time: element.duration  
    })
    )
    setServices(formattedServices)
    };

    useEffect(() => {
        getTypeServices();
        GetServiceDetail();
    }, [])


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

    const addService = async () => {
        if (validateService()) {
            const data = {
                code: "SRV-011",
                name: newService.name,
                cost: newService.cost,
                duration: newService.time,
                addInfo: "Гарантия 1 год",
                typeOfServiceName: newService.sphere
            }
            console.log(data)
            const data2 = await postServiceDetail(data);
            if (data2 == true) {
                window.location.reload();
            } else {
                window.location.reload();
            }

            setNewService({ sphere: 'Мойка', name: '', cost: '', time: '' }); // сброс полей
        }
    };

    const deleteService = async (id) => {
        const data = await deleteServiceDetail(id);
        if (data == true) {
            window.location.reload();
        } else {
            window.location.reload();
        }

    };

    const startEditing = (id) => {
        setEditingService(id); // Устанавливаем ID редактируемой услуги
    };

    const stopEditing = async (id) => {
        const data = {
            id: editingService.id,
            code: "SRV-011",
            name: editingService.name,
            cost: editingService.cost,
            duration: editingService.time,
            addInfo: "Гарантия 1 год",
            typeOfServiceName: editingService.sphere
        }
        console.log(data)
      //  const data2 = await putServiceDetail(data);

        setEditingService(null); // Завершаем редактирование
    };

    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        const char = String.fromCharCode(e.which);
        if (!/^\d$/.test(char)) {
            e.preventDefault();
        }
    };

    return (
        <>
            <div className="headerservices">
                <button className="exitbuttonservices" title="Вернуться к заявке" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Exit"/>
                </button>
                <div className="headerservtext">
                    <button className="homebutton" title="Вернуться на главную" onClick={() => navigate("/")}>
                        <h1 className="textAdmin">PIONEER</h1>
                        <img src="/src/icons/home.png" alt="Home"/>
                    </button>
                    <p className="pserv">
                        <h2 className="textServices">Личный кабинет</h2>
                    </p>
                </div>
                <button className="exitbuttonservices" title="Проверить заявки" onClick={() => navigate("/org_apps")}>
                    <img src="/src/icons/orgapps.png" alt="Apps"/>
                </button>
            </div>
            <input type="text" className="companyinfo" disabled value="Авангард г.Самара ул.Пушкина 6"/>
            <button className="infoButton" onClick={() => navigate("/org_info")}>Подробная информация</button>
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
                                <td colSpan="6" style={{ textAlign: "center" }}>Нет доступных услуг</td>
                            </tr>
                        ) : (
                            services.map(service => (
                                <tr key={service.id}>
                                    <td>{service.id}</td>
                                    <td className="tdsphere">
                                        {editingService === service.id ? (
                                            <select
                                                name="sphere"
                                                value={service.sphere}
                                                onChange={handleInputChange}
                                                className="tableselect"
                                            >

                                                {Sphere.map((element) => {
                                                    console.log(element)
                                                    return (
                                                        <option value={element.id}>{element.name}</option>
                                                    )
                                                })}
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
                                                onKeyPress={handleKeyPress} // Добавляем обработчик для поля стоимости
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
                                                onKeyPress={handleKeyPress} // Добавляем обработчик для поля времени
                                                className="tableinput"
                                            />
                                        ) : (
                                            service.time
                                        )}
                                    </td>
                                    <td>
                                        {editingService === service.id ? (
                                            <button className="editbuttonServices" onClick={()=>{stopEditing(service.id)}}>
                                                <img src='/src/icons/save.png' alt='Save' />
                                            </button>
                                        ) : (
                                            <button className="editbuttonServices" onClick={() => startEditing(service.id)}>
                                                <img src='/src/icons/edit.png' alt='Edit' />
                                            </button>
                                        )}

                                        <button className="deletebuttonServices" title="Удалить услугу"
                                            onClick={() => { console.log(service.id); deleteService(service.id) }}>
                                            <img src="/src/icons/closeblack.png" alt="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="newServiceForm">
                    <select name="sphere" value={newService.sphere} onChange={handleInputChange}>

                        {Sphere.map((element) => {
                            return (
                                <option value={element.id}>{element.name}</option>
                            )
                        })}
                    </select>
                    <div className="input-group">
                        <input
                            className="inputserviceinfo"
                            type="text"
                            name="name"
                            placeholder="Название"
                            value={newService.name}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="input-group">
                        <input
                            className="inputserviceinfo"
                            type="text"
                            name="cost"
                            placeholder="Стоимость (руб.)"
                            value={newService.cost}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            maxLength="5"
                            autoComplete="off"
                        />
                        {errors.cost && <p className="error">{errors.cost}</p>}
                    </div>

                    <div className="input-group">
                        <input
                            className="inputserviceinfo"
                            type="text"
                            name="time"
                            placeholder="Время (мин)"
                            value={newService.time}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            maxLength="3"
                            autoComplete="off"
                        />
                        {errors.time && <p className="error">{errors.time}</p>}
                    </div>

                    <button className="buttonServices" title="Добавить услугу" onClick={addService}>
                        <img src="/src/icons/create.png" alt="Создать" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateServices_page;