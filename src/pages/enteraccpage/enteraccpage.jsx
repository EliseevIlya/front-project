import { useState } from "react";
import "./style.css";

function Enteraccpage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="enteraccpage">
            <div className="enteraccpage">
                <h3 className="login-enterpage">ЛОГИН</h3>
                <input 
                    className="login-textfield" 
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <h3 className="password-enterpage">ПАРОЛЬ</h3>
                <input 
                    type="password"
                    className="password-textfield" 
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="enter-enterpage">ВОЙТИ</button>
            </div>
        </div>
    );
}

export default Enteraccpage;