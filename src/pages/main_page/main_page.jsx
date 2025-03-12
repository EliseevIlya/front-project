import { useNavigate } from "react-router-dom";
import "./style_main.css";

function Main_page() {
    const navigate = useNavigate();

    return (
        <>
            <h1 className="text">PIONEER</h1>
            <h2 className="podtext">ПРЕДОСТАВЛЕНИЕ УСЛУГ ТРАНСПОРТНЫМ СРЕДСТВАМ</h2>
            <div>
                <p>
                    <button onClick={() => navigate("/user_acc_page")}>
                        ВЛАДЕЛЬЦЫ ТРАНСПОРТНЫХ СРЕДСТВ
                    </button>
                </p>
                <p>
                    <button onClick={() => navigate("/org_reg_page")}>
                        ОРГАНИЗАЦИИ-ПАРТНЁРЫ
                    </button>
                </p>
                <p>
                    <button onClick={() => navigate("/admin_acc_page")}>
                        АДМИНИСТРИРОВАНИЕ
                    </button>
                </p>
            </div>
        </>
    );
}

export default Main_page;
