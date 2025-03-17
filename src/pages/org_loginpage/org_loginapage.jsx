import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";

function Loginpage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(true); 
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (isValidEmail.test(emailValue)) {
            setEmail(emailValue);
            setErrorMessage(""); 
        } else {
            setEmail(emailValue);
            setErrorMessage("Пожалуйста, введите корректный email.");
        }
    };

    const handleSubmit = () => {
        if (errorMessage || !email || !code) {
            setErrorMessage("Пожалуйста, заполните все поля корректно.");
            return;
        }
        navigate("/"); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
        window.location.reload(); 
    };

    if (!isModalOpen) {
        return null; 
    }

    return (
        <div className="overlay">
            <div className="orgloginpage">
                <button className="orgclose-button" onClick={handleCloseModal}>×</button>
                <header className="headerorgpage"> 
                    <h1>ОРГАНИЗАЦИЯ - ПАРТНЕР</h1>
                </header>
                <div className="input-group">
                    <h4>E-MAIL :</h4>
                    <input 
                        className="inputorg"
                        type="text" 
                        placeholder="Введите e-mail" 
                        value={email} 
                        onChange={handleEmailChange} 
                    />
                </div>
                <div>
                    <button className="orgbutton">ПОЛУЧИТЬ КОД</button>
                </div>
                <div className="input-group">
                    <input 
                        className="inputorg"
                        type="text" 
                        placeholder="Введите код" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                {errorMessage && <div className="orgerror-message">{errorMessage}</div>} 
                <div className="orgfooter">
                    <h6 onClick={() => navigate("/org/reg")} >СТАТЬ ПАРТНЕРОМ</h6>
                    <button className="orgfooterbutton" onClick={() => navigate ("/org/statuscheck")}>ВОЙТИ</button>
                </div>
            </div>
        </div>
    );
}

export default Loginpage;
