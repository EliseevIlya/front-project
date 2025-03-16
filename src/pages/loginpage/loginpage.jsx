import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";

function Loginpage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const navigate = useNavigate(); 
    return (

        <div className="divloginpage"> 
            <header className="headerloginpage">
                <h1>ВОЙТИ В АККАУНТ</h1>
            </header>
            <div className="input-containerloginpage">
                <h4>E-MAIL:</h4>
                <input 
                    type="text" 
                    placeholder="Введите e-mail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="button">
                <button>ПОЛУЧИТЬ КОД</button>
            </div>
            <div className="input-containerloginpage">
                <input 
                    type="text" 
                    placeholder="Введите код" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <div className="footerloginpage">
                <h6>СОЗДАТЬ АККАУНТ</h6>
                <button onClick={()=>{navigate("/user/request")}}>ВОЙТИ</button>
            </div>
        </div>
    );
}

export default Loginpage;
