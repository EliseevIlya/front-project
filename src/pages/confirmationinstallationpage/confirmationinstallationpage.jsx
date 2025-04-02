import React from "react";
import "./style.css";
import { useNavigate } from "react-router";

function Confirmationinstallationpage({ isOpen, onClose }) {
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    const onConfirmation = () => {
        onClose();
        navigate("/user");
    };

    return (
        <div className="modal-overlayconfirm">
            <div className="modal-contentconfirmtyre">
                <h1>ПОДТВЕРЖДЕНИЕ ЗАПИСИ</h1>
                <h3 className="confirmationtyre-text">
                    ЖДЕМ ВАС СЕГОДНЯ В // ПО АДРЕСУ:
                </h3>
                <button className="confirmation-buttontyre" onClick={onConfirmation}>ОК</button>
        </div>
        </div>
    );
}

export default Confirmationinstallationpage;