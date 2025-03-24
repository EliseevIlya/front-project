import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Installationservice() {
    const [selectedServices, setSelectedServices] = useState([""]);
    const services = ["Услуга 1 - 200 руб. (20 мин.)", "Услуга 2 - 300 руб. (30 мин.)", "Услуга 3 - 400 руб. (40 мин.)"];
    const navigate = useNavigate(); 

    const handleServiceChange = (index, value) => {
        const newServices = [...selectedServices];
        newServices[index] = value;

        if (index === selectedServices.length - 1 && value !== "") {
            newServices.push("");
        }

        setSelectedServices(newServices);
    };

    const handleRemoveService = (index) => {
        const newServices = selectedServices.filter((_, i) => i !== index);
        setSelectedServices(newServices.length > 0 ? newServices : [""]);
    };

    const handleSubmit = () => {
        navigate("/user/request"); 
    };

    return (
        <div className="servicepage">
            <h1 className="title">ВЫБЕРИТЕ УСЛУГУ</h1>
            <div className="installationmaindiv">
                <h1 className="service-title">ШИНОМОНТАЖ</h1>
                <div className="installationservicediv">
                    <div className="left-column">
                        <div className="servdiv">
                            <label className="choose-city">Выберите город:</label>
                            <select className="installationselect">
                                <option>Самара</option>
                            </select>
                        </div>
                        <div className="servdiv">
                            <label className="choose-org">Организация:</label>
                            <select className="installationselect">
                                <option>АВАНГАРД ул. Пушкина 6</option>
                            </select>
                        </div>
                        <div className="servdiv">
                            <label className="cost">ИТОГО:</label>
                            <input type="number" value="950" disabled />
                        </div>
                    </div>
                    <div className="center-column">
                        <div className="servdiv">
                            <label className="choose-service">Выберите желаемые услуги:</label>
                            {selectedServices.map((service, index) => (
                                <div key={index} className="service-dropdown">
                                    <select
                                        className="installationselect"
                                        value={service}
                                        onChange={(e) => handleServiceChange(index, e.target.value)}
                                    >
                                        <option value="">Выберите услугу</option>
                                        {services.map((s, i) => (
                                            <option key={i} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedServices.length > 1 && (
                                        <button className="remove-button" onClick={() => handleRemoveService(index)}>
                                            ✖
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="servdiv">
                            <label className="choose-time">Выберите время на сегодня:</label>
                            <select className="installationselect">
                                <option>10:00 - 11:40</option>
                            </select>
                        </div>
                        <div className="servdiv">
                            <label className="choose-time">Выберите время на завтра:</label>
                            <select className="installationselect">
                                <option>10:00 - 11:40</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="installationbutton-container">
                    <button className="installationbutton" onClick={handleSubmit}>
                        Оставить заявку
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Installationservice;