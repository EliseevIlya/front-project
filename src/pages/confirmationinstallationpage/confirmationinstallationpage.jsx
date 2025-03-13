import { useState } from "react";
import "./style.css";

function ConfirmationModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="installationcontent">
                <header>
                    <h1>ПОДТВЕРЖДЕНИЕ ЗАПИСИ</h1>
                </header>
                <div>
                    <h3 className="confirmation-text">
                        ЖДЕМ ВАС СЕГОДНЯ В 10:00 - 11:40 ПО АДРЕСУ:
                    </h3>
                </div>
                <div>
                    <button className="confirmation-button" onClick={onClose}>ОК</button>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [isModalOpen, setModalOpen] = useState(true);

    return (
        <div>
            <ConfirmationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default App;