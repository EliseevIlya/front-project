import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { useState } from 'react';
import "./style_main.css";
import Modal from 'react-modal';
import LoginPage from "../loginpage/loginpage";
import OrgLoginPage from "../org_loginpage/org_loginapage";

function MainPage() {
  const navigate = useNavigate(); // Инициализация navigate

  const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
  const openLoginModal = () => {
    setModalLoginIsOpen(true);
  };

  const closeLoginModal = () => {
    setModalLoginIsOpen(false);
  };

  const [modalOrgIsOpen, setModalOrgIsOpen] = useState(false);
  const openOrgModal = () => {
    setModalOrgIsOpen(true);
  };

  const closeOrgModal = () => {
    setModalOrgIsOpen(false);
  };

  return (
    <>
      <div className="Main">
        <h1 className="text">PIONEER</h1>
        <h2 className="podtext">ПРЕДОСТАВЛЕНИЕ УСЛУГ ТРАНСПОРТНЫМ СРЕДСТВАМ</h2>
        <div>
          <p>
            <button onClick={() => openLoginModal()}>ВЛАДЕЛЬЦЫ ТРАНСПОРТНЫХ СРЕДСТВ</button>
          </p>
          <p>
            <button onClick={() => openOrgModal()}>
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

      <Modal
        isOpen={modalLoginIsOpen}
        onRequestClose={closeLoginModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <LoginPage />
      </Modal>

      <Modal
        isOpen={modalOrgIsOpen}
        onRequestClose={closeOrgModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <OrgLoginPage />
      </Modal>
    </>
  );
}

export default MainPage;
