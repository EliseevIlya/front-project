import { useState } from "react";
import "./style.css";

function Createaccpage() {
    const [email, setEmail] = useState("");
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    return (
        <div>
            <header>
                <h1>СОЗДАНИЕ АККАУНТА</h1>
            </header>
            <div className="input-container" >
                <div className="input-group">
                    <h4>E-MAIL:</h4>
                    <input 
                        type="text" 
                        placeholder="Введите e-mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <h4>ФАМИЛИЯ:</h4>
                    <input 
                        type="text" 
                        placeholder="Введите фамилию" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <h4>ИМЯ:</h4>
                    <input 
                        type="text" 
                        placeholder="Введите имя" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <h4>НОМЕР ТЕЛЕФОНА:</h4>
                    <input 
                        type="text" 
                        placeholder="Введите номер" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="terms-container">
                <input 
                    type="checkbox" 
                    id="terms" 
                    checked={termsAccepted} 
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms">Я принимаю <a href="#" target="_blank" rel="noopener noreferrer">пользовательское соглашение</a></label>
            </div>
            <div className="footer">
                <button>ПОЛУЧИТЬ КОД</button>
                <input 
                    type="text" 
                    className="code-input" 
                    placeholder="Введите код" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)}
                />
                <button>СОЗДАТЬ АККАУНТ</button>
            </div>
        </div>
    );
}

export default Createaccpage;
