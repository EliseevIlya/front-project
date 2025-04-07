import "./style.css";

function Deleteparthpage({ onClose }) {
    return (
        <div className="overlay">
            <div className="deleteacc">
                <header>
                    <h1 className="h1_deleteaccpage">ВНИМАНИЕ!</h1>
                </header>
                <div>
                    <h3 className="warning-text">
                        ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ ОТКАЗАТЬСЯ ОТ ПАРТНЕРСТВА?
                    </h3>
                </div>
                <div className="footer_deleteaccpage">
                    <button className="cancel-button" >ДА</button>
                    <button className="delete-button" onClick={onClose}>НЕТ</button>
                </div>
            </div>
        </div>
    );
}

export default Deleteparthpage;
