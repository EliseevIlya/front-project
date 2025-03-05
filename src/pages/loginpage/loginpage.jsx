import "./style.css";

function Loginpage() {
    return (
        <div className="divloginpage"> 
            <header className="headerloginpage">
                <h1>ВОЙТИ В АККАУНТ</h1>
            </header>
            <div className="input-containerloginpage">
                <h4>E-MAIL:</h4>
                <input type="text" placeholder="Введите e-mail"></input>
            </div>
            <div className = "button">
                <button>ПОЛУЧИТЬ КОД</button>
            </div>
            <div className="input-containerloginpage">
                <input type="text" placeholder="Введите код"></input>
            </div>
            <div className="footerloginpage">
                <h6>СОЗДАТЬ АККАУНТ</h6>
                <button>ВОЙТИ</button>
            </div>
        </div>
    );
}

export default Loginpage;