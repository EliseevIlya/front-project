import "./style.css";

function Deleterequest({ onClose, onDelete }) {
    return (
        <div className="overlay">
            <div className="deleteacc">
                <header>
                    <h1 className="h1_deleteaccpage">ВНИМАНИЕ!</h1>
                </header>
                <div>
                    <h3 className="warning-text">
                        ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ УДАЛИТЬ ЗАЯВКУ?
                    </h3>
                </div>
                <div className="footer_deleteaccpage">
                    <button className="cancel-button" onClick={onClose}>ОТМЕНА</button>
                    <button className="delete-button" onClick={onDelete}>УДАЛИТЬ</button>
                </div>
            </div>
        </div>
    );
}

export default Deleterequest;
