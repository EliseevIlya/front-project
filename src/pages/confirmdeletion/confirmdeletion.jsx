import "./style.css"

function Deleteaccpage() {
    return (
        <div className="deleteacc">
            <header>
                <h1 className="h1_deleteaccpage">ВНИМАНИЕ!</h1>
            </header>
            <div>
                <h3 className="warning-text">
                    УДАЛЕНИЕ ВЫПОЛНЕНО УСПЕШНО
                </h3>
            </div>
            <div className="footer_deleteaccpage">
                <button className="cancel-button">ОК</button>
            </div>
        </div>
    );
}

export default Deleteaccpage;