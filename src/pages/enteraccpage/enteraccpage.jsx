import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom"; // исправлен импорт

function Enteraccpage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(true); // Добавлено состояние модального окна
    const navigate = useNavigate();

    const closeModal = () => {
        setIsModalOpen(false);
        window.location.reload(); 
    };

    if (!isModalOpen) {
        return null; // Если окно закрыто, ничего не рендерим
    }

    return (
        <div className="overlay">
            <div className="enteracc">
                <div className="header-container">
                    <h3 className="header-title">ВОЙТИ В АККАУНТ АДМИНИСТРАТОРА</h3>
                    <button className="enteraccclosebutton" onClick={closeModal}>×</button> 
                </div>
<<<<<<< HEAD
                <div className="input-group">
                <h3 className="login-enterpage">ЛОГИН :</h3>
                <input
                    type="text"
                    className="login-textfield" 
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                </div>
                <div className="input-group">
                <h3 className="password-enterpage">ПАРОЛЬ :</h3>
                <input 
                    type="text"
                    className="password-textfield" 
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button className="enter-enterpage" onClick={() => navigate("/admin_acc_page")}>ВОЙТИ</button>
=======

                <h3 className="login-enterpage">ЛОГИН :</h3>
                <input
                    className="login-textfield"
                    placeholder="Введите логин"
                    value={login}
                    onChange={handleLoginChange}
                />
                {loginError && <div className="error">{loginError}</div>}

                <h3 className="password-enterpage">ПАРОЛЬ :</h3>
                <input
                    type="password"
                    className="password-textfield"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passwordError && <div className="error">{passwordError}</div>}

                <button className="enter-enterpage" onClick={handleSubmit} disabled={loginError || passwordError || !login || !password}>ВОЙТИ</button>
>>>>>>> parent of 4f9b9c9 (Merge pull request #39 from teampapo/akiyanara)
            </div>
        </div>
    );
}

export default Enteraccpage;
