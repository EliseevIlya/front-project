import "./style.css"

function Enteraccpage() {
    return (
        <div className="enteraccpage">
            <div className="enteraccpage">
                <h3 className="login-enterpage">ЛОГИН</h3>/*2 переменные onchange */
                <input className="login-textfield" placeholder="Введите логин"/>
            <h3 className="password-enterpage">ПАРОЛЬ</h3>
            <input className="password-textfield" placeholder="Введите пароль"/>
                <button className="enter-enterpage">ВОЙТИ</button>
            </div>
        </div>
    );
}

export default Enteraccpage;