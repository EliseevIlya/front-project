import {useEffect, useState} from "react";
import "./style.css";

import { useNavigate } from "react-router";
import {getConnectionRequest} from "../../api/ConnectionRequest.js";
import {getAdminConnectionRequest} from "../../api/Admin.js";



function PioneerForms() {
  const statuses = [
    { id: "NEW", label: "Новая" },
    //{ id: "IN_PROGRESS", label: "В работе" },
    { id: "COMPLETED", label: "Исполнена" },
    { id: "REJECTED", label: "Отклонена" }
  ];

  const forms = [
    { id: 1, status: "new", date: "10.03.2025", org: "Компания A" },
    { id: 2, status: "in_progress", date: "08.03.2025", org: "Компания B" },
    { id: 3, status: "completed", date: "05.03.2025", org: "Компания C" },
    { id: 4, status: "rejected", date: "02.03.2025", org: "Компания D" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("NEW");

  const [connectionRequestGet, setConnectionRequestGet] = useState({

  })
  const [connectionRequestPut, setConnectionRequestPut] = useState({
    size: 10,
    page: 0,
    status: selectedStatus
  })

  const navigate = useNavigate();

  // Функция для перехода на страницу организации
  const handleRowClick = (id) => {
    localStorage.setItem("connectionRequestId",id);
    navigate(`/org_statusedit`); // Переход на страницу организации
  };


  const loadConnectionRequest = async () => {

    if (selectedStatus === "NEW") {
      setConnectionRequestGet(await getConnectionRequest(connectionRequestPut))

    } else {
      setConnectionRequestGet(await getAdminConnectionRequest(connectionRequestPut))
    }
    console.log(selectedStatus)
  }

  useEffect(() => {


        loadConnectionRequest();
      },
      [selectedStatus, connectionRequestPut])

  useEffect(() => {
    console.log(connectionRequestGet,"connectionRequestGet")
  }, [connectionRequestGet]);

  const loadMoreApps = () => {
    setConnectionRequestPut(prev => ({
      ...prev,
      size: prev.size + 5
    }));

  };

  const changeStatus = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    setConnectionRequestPut(prev => ({
      ...prev,
      status: newStatus
    }));
  };


  return (

      <div className="background-container">
        <div className="maindivorgform">
          <div className="headersform">
            <button
                className="exitbutton"
                title="Вернуться в кабинет"
                onClick={() => navigate("/adminacc")}
            >
              <img src="/src/icons/exit.png" alt="Exit" />
            </button>
            <h1 className="titleorgform">ФОРМЫ ПОДКЛЮЧЕНИЯ ОРГАНИЗАЦИИ К PIONEER</h1>
          </div>
          <div className="contentorgform">
            <div className="table-containerfilter">
              <div className="filterorgform">
                {statuses.map(({ id, label }) => (
                    <button
                        key={id}
                        value={id}
                        className={`filter-buttonorgform ${selectedStatus === id ? "active" : ""}`}
                        onClick={changeStatus}
                    >
                      {label}
                    </button>
                ))}
              </div>
            </div>
            <div className="table-containertableorgform">
              <h2 className="texth2">Список форм в выбранном статусе</h2>
              <table className="styled-tableorgform">
                <thead>
                <tr>
                  <th>№ Заявки</th>
                  <th>Дата Создания</th>
                  <th>Наименование организации</th>
                </tr>
                </thead>
                <tbody>
                {connectionRequestGet?.content?.length > 0 ? (
                    connectionRequestGet.content.map(f => (
                        <tr
                            key={f.id}
                            onClick={() => handleRowClick(f.id)}
                            style={{ cursor: "pointer" }}
                        >
                          <td>{f.id}</td>
                          <td>{f.dateBegin}</td>
                          <td>{f.organization.fullName}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan="3" className="no-data">Нет данных</td>
                    </tr>
                )}
                </tbody>
              </table>
              <div>


              <button className="load-more" onClick={loadMoreApps}>Загрузить еще</button>


              </div>
            </div>
          </div>

        </div>
      </div>
  );
}

export default PioneerForms;
