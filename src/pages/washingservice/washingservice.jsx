import React, { useState } from "react";
import "./style.css";
import { useState } from "react";
import Modal from 'react-modal'
import Confirmationwashingpage from "../confirmationwashingpage/confirmationwashingpage";

function Washingservice() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const openModal = () => {
      setModalIsOpen(true);
    };
    
    const closeModal = () => {
      setModalIsOpen(false);
    };
    const Confirmation = (
        <div>
            {<Confirmationwashingpage />}
            <button onClick={()=>{closeModal()}}>Отмена</button>
        </div>
    )
    return (
        <div className="servicepage">
            <h1 className="title">ВЫБЕРИТЕ УСЛУГУ</h1>
            <div className="washingmaindiv">
                <h1 className="service-title">МОЙКА</h1>
                <div className="washingservicediv">
                    <div className="left-column">
                        <div className="servdiv">
                            <label className="choose-city">Выберите город:</label>
                            <select>
                                <option>Самара</option>
                            </select>
                        </div>
                        <div className="servdiv">
                            <label className="choose-org">Организация:</label>
                            <select>
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
                            <select>
                                <option>10:00 - 11:40</option>
                            </select>
                        </div>
                        <div className="servdiv">
                            <label className="choose-time">Выберите время на завтра:</label>
                            <select>
                                <option>10:00 - 11:40</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="washingbutton-container">
                    <button className="washingbutton"onClick={()=>{openModal()}}>Оставить заявку</button>
                </div>
            </div>
            <div>
                 <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                     {Confirmation}
                </Modal>
             </div>
        </div>
    );
}

export default Washingservice;