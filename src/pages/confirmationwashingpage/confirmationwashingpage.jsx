import React from "react";
import "./style.css";
import { useNavigate } from "react-router";

function Confirmationwashingpage({ isOpen, onClose }) {
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    const onConfirmation = () => {
        onClose();
        navigate("/user");
    };

    return (
        <div className="modal-overlayconfirm">
            <div className="modal-contentconfirm">
                <h1>ПОДТВЕРЖДЕНИЕ ЗАПИСИ</h1>
                <h3 className="confirmationwashing-text">
                    ЖДЕМ ВАС СЕГОДНЯ В 10:00 - 11:40 ПО АДРЕСУ:
                </h3>
                <button className="confirmation-buttonwashing" onClick={onConfirmation}>ОК</button>
        </div>
        </div>
    );
}

export default Confirmationwashingpage;