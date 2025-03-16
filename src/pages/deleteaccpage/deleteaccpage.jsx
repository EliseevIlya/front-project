import "./style.css"

function Deleteaccpage() {
    return (
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
                <button className="cancel-button">ОТМЕНА</button>
                <button className="delete-button">УДАЛИТЬ</button>
            </div>
        </div>
    );
}

export default Deleteaccpage;
