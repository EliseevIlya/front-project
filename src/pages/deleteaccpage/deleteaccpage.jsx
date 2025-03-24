import "./style.css";

function Deleteaccpage({ onClose }) {
    return (
        <div className="overlay">
            <div className="deleteacc">
                <header>
                    <h1 className="h1_deleteaccpage">ВНИМАНИЕ!</h1>
                </header>
                <div>
                    <h3 className="warning-text">
                        ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ УДАЛИТЬ СВОЙ АККАУНТ?
                    </h3>
                </div>
                <div className="footer_deleteaccpage">
                    <button className="cancel-button" onClick={onClose}>ОТМЕНА</button>
                    <button className="delete-button">УДАЛИТЬ</button>
                </div>
            </div>
        </div>
    );
}

export default Deleteaccpage;
