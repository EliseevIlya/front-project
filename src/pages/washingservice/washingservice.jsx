import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import Confirmationwashingpage from "../confirmationwashingpage/confirmationwashingpage";
import Select from "react-select";

function Washingservice() {
    const [selectedServices, setSelectedServices] = useState([null]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [city, setCity] = useState(null);
    const [org, setOrg] = useState(null);
    const [selectedTimeToday, setSelectedTimeToday] = useState("");
    const [selectedTimeTomorrow, setSelectedTimeTomorrow] = useState("");

    const services = [
        { value: "Услуга 1 - 200 руб. (20 мин.)", label: "Услуга 1 - 200 руб. (20 мин.)", price: 200 },
        { value: "Услуга 2 - 300 руб. (30 мин.)", label: "Услуга 2 - 300 руб. (30 мин.)", price: 300 },
        { value: "Услуга 3 - 400 руб. (40 мин.)", label: "Услуга 3 - 400 руб. (40 мин.)", price: 400 }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '15vw',
            height: '5vh',
            fontSize: '1.2vw',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '20px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'transparent',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#f0f0f0' : 'white',
            color: 'black',
            fontSize: '1.2vw',
            '&:hover': {
                backgroundColor: '#f0f0f0',
            },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
            fontSize: '1.2vw',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '20px',
            marginTop: '5px',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
        }),
    };

    const cities = [
        { value: 'samara', label: 'Самара' },
    ];

    const orgs = [
        { value: 'avangard', label: 'АВАНГАРД ул. Пушкина 6' },
    ];

    const navigate = useNavigate();

    const handleServiceChange = (index, value) => {
        const newServices = [...selectedServices];
        newServices[index] = value;

        if (index === selectedServices.length - 1 && value) {
            newServices.push(null);
        }

        setSelectedServices(newServices);
    };

    const handleRemoveService = (index) => {
        const newServices = selectedServices.filter((_, i) => i !== index);
        setSelectedServices(newServices.length > 0 ? newServices : [null]);
    };

    useEffect(() => {
        const cost = selectedServices.reduce((acc, service) => {
            if (service) {
                const selectedService = services.find(s => s.value === service.value);
                return acc + (selectedService ? selectedService.price : 0);
            }
            return acc;
        }, 0);
        setTotalCost(cost);
    }, [selectedServices]);

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 10; hour <= 22; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            times.push(time);
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    const isFormValid = () => {
        return city && org && (selectedServices.length > 0 && selectedServices.some(service => service)) && (selectedTimeToday || selectedTimeTomorrow);
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            setModalOpen(true);
        }
    };

    return (
        <div className="servicepage">
            <div className="headerS">
                <button className="exitbuttonS" title="Выбор услуг" onClick={() => navigate("/")}>
                    <img src="/src/icons/exit.png" alt="Выбор услуг"/>
                </button>
                <h1 className="titleS">ВЫБЕРИТЕ УСЛУГИ</h1>
            </div>
            <div className="washingmaindiv">
                <h1 className="service-title">МОЙКА</h1>
                <div className="washingservicediv">
                    <div className="left-column">
                        <div className="servdiv">
                            <label className="choose">Город:</label>
                            <Select
                                styles={customStyles}
                                options={cities}
                                className="washingselect"
                                placeholder="Выберите"
                                onChange={setCity} 
                            />
                        </div>
                        <div className="servdiv">
                            <label className="choose">Организация:</label>
                            <Select
                                styles={customStyles}
                                options={orgs}
                                className="washingselect"
                                placeholder="Выберите"
                                onChange={setOrg}
                            />
                        </div>
                    </div>
                    <div className="center-column">
                        <div className="servdiv">
                            <label className="choose">Услуги:</label>
                            {selectedServices.map((service, index) => (
                                <div key={index} className="service-dropdown">
                                    <select
                                        className="washingselect"
                                        value={service ? service.value : ""}
                                        onChange={(e) => handleServiceChange(index, services.find(s => s.value === e.target.value))}
                                    >
                                        <option className="optionS" value="">Выберите услугу</option>
                                        {services.map((serviceOption) => (
                                            <option className="optionS" key={serviceOption.value} value={serviceOption.value}>
                                                {serviceOption.label}
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
                            <label className="choose">Сегодня:</label>
                            <select className="washingselect" onChange={(e) => setSelectedTimeToday(e.target.value)}>
                                <option value="">Выберите время</option>
                                {timeOptions.map((time) => (
                                    <option className="optionS" key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="servdiv">
                            <label className="choose">Завтра:</label>
                            <select className="washingselect" onChange={(e) => setSelectedTimeTomorrow(e.target.value)}>
                                <option value="">Выберите время</option>
                                {timeOptions.map((time) => (
                                    <option className="optionS" key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="washingbutton-container">
                    <div className="itog-container">
                        <label className="itog">ИТОГО:</label>
                        <input className="summa" type="number" value={totalCost} disabled />
                    </div>
                    <button
                        className="washingbutton"
                        onClick={handleSubmit}
                        disabled={!isFormValid()} // Блокируем кнопку, если форма не валидна
                    >
                        Оставить заявку
                    </button>
                </div>
            </div>
            <Confirmationwashingpage isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default Washingservice;