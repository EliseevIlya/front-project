import { useNavigate } from "react-router-dom";
import  { useState } from 'react';
import "./style_main.css";
import Loginpage from "../loginpage/loginpage";
import Modal from 'react-modal'

function Main_page() {
    const navigate = useNavigate();
    
    const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
    
    const openLoginModal = () => {
      setModalLoginIsOpen(true);
    };
    
    const closeLoginModal = () => {
      setModalLoginIsOpen(false);
    };
    const Login = (
        <div>
            {<Loginpage />}
            <button onClick={()=>{closeLoginModal()}}>Отмена</button>
        </div>
    )

    return (
        <>
        <div className="Main">
            <h1 className="text">PIONEER</h1>
            <h2 className="podtext">ПРЕДОСТАВЛЕНИЕ УСЛУГ ТРАНСПОРТНЫМ СРЕДСТВАМ</h2>
            <div>
                <p>
                    <button onClick={()=>{openLoginModal()}}>
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
        </div>
            <div>
            <Modal isOpen={modalLoginIsOpen} onRequestClose={closeLoginModal}>
                    {Login}
            </Modal>
            </div>
        </>
    );
}

export default Main_page;
