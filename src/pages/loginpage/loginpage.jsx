import "./style.css";

function Loginpage() {
    return (
        <div>
            <header>
                <h1>ВОЙТИ В АККАУНТ</h1>
            </header>
            <div className="input-container">
                <h4>E-MAIL:</h4>
                <input type="text" placeholder="Введите e-mail"></input>
            </div>
            <div className = "button">
                <button>ПОЛУЧИТЬ КОД</button>
            </div>
            <div className="input-container">
                <input type="text" placeholder="Введите код"></input>
            </div>
            <div className="footer">
                <h6>СОЗДАТЬ АККАУНТ</h6>
                <button>ВОЙТИ</button>
            </div>
        </div>
    );
}

export default Loginpage;