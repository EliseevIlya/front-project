import "./style.css";

function Createaccpage() {
    return (
        <div>
            <header>
                <h1>СОЗДАНИЕ АККАУНТА</h1>
            </header>
            <div className="input-container" >
                <div className="input-group">
                    <h4>E-MAIL:</h4>
                    <input type="text" placeholder="Введите e-mail" />
                </div>
                <div className="input-group">
                    <h4>ФАМИЛИЯ:</h4>
                    <input type="text" placeholder="Введите фамилию" />
                </div>
                <div className="input-group">
                    <h4>ИМЯ:</h4>
                    <input type="text" placeholder="Введите имя" />
                </div>
                <div className="input-group">
                    <h4>НОМЕР ТЕЛЕФОНА:</h4>
                    <input type="text" placeholder="Введите номер" />
                </div>
            </div>
            <div className="terms-container">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">Я принимаю пользовательское соглашение</label>
                </div>
            <div className="footer">
                <button>ПОЛУЧИТЬ КОД</button>
                <input type="text" className="code-input" placeholder="Введите код"/>
                <button>СОЗДАТЬ АККАУНТ</button>
            </div>
        </div>
    );
}

export default Createaccpage;
