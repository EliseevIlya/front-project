import "./style.css";

function Org_loginpage() {
    return (
        <div className="org_loginpage">
            <header className="org_loginpageheader">
                <h1>ОРГАНИЗАЦИЯ - ПАРТНЕР</h1>
            </header>
            <div className="input-container">
                <div className="label-container">
                    <h4>E-MAIL:</h4>
                    <h6 className="sub-text">(контактного лица)</h6>
                </div>
                <input type="text" placeholder="Введите e-mail"></input>
            </div>
            <div className="button">
                <button>ПОЛУЧИТЬ КОД</button>
            </div>
            <div className="input-container">
                <input type="text" placeholder="Введите код"></input>
            </div>
            <div className="footer">
                <h6>СТАТЬ ПАРТНЕРОМ</h6>
                <button>ВОЙТИ</button>
            </div>
        </div>
    );
}

export default Org_loginpage;