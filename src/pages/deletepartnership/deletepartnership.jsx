import "./style.css"

function Deleteparthpage() {
    return (
        <div className="overlay">
        <div className="deleteacc">
            <header>
                <h1 className="h1_deleteaccpage">ВНИМАНИЕ!</h1>
            </header>
            <div>
                <h3 className="warning-text">
                    ВЫ ДЕЙСТВИТЕЛЬНО ХОТИТЕ ОТКАЗАТЬСЯ ОТ ПРАТНЕРСТВА?
                </h3>
            </div>
            <div className="footer_deleteaccpage">
                <button className="cancel-button">ОСТАТЬСЯ</button>
                <button className="delete-button">ОТКАЗАТЬСЯ</button>
            </div>
        </div>
        </div>
    );
}

export default Deleteparthpage;
