import { useState } from "react";
import "./style.css";

function OrgLoginPage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    return (
        <div className="overlay">
            <div className="org_loginpage">
                <header className="org_loginpageheader">
                    <h1>ОРГАНИЗАЦИЯ - ПАРТНЕР</h1>
                </header>
                <div className="input-containerorg">
                    <div className="label-containerorg">
                        <h4>E-MAIL :</h4>
                        <h6 className="sub-text">(контактного лица)</h6>
                    </div>
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
                <div className="input-containerorg">
                    <input 
                        type="text" 
                        placeholder="Введите код" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className="footer">
                    <h6>СТАТЬ ПАРТНЕРОМ</h6>
                    <button>ВОЙТИ</button>
                </div>
            </div>
        </div>
    );
}

export default OrgLoginPage;