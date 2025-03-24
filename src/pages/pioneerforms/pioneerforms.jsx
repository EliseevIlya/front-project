import { useState } from "react";
import "./style.css";
<<<<<<< HEAD
import { useNavigate } from "react-router";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> parent of 4f9b9c9 (Merge pull request #39 from teampapo/akiyanara)

function PioneerForms() {
  const statuses = [
    { id: "new", label: "Новая" },
    { id: "in_progress", label: "В работе" },
    { id: "completed", label: "Исполнена" },
    { id: "rejected", label: "Отклонена" }
  ];

  const forms = [
    { id: 1, status: "new", date: "10.03.2025", org: "Компания A" },
    { id: 2, status: "in_progress", date: "08.03.2025", org: "Компания B" },
    { id: 3, status: "completed", date: "05.03.2025", org: "Компания C" },
    { id: 4, status: "rejected", date: "02.03.2025", org: "Компания D" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("new");

  return (
<<<<<<< HEAD
    <div className="maindivorgform">
      <div className="headersPioneer">
        <div className="headtextPioneer">
          <h1 className="titleorgform">ФОРМЫ ПОДКЛЮЧЕНИЯ ОРГАНИЗАЦИИ К PIONEER</h1>
=======
      <div className="background-container">
        <div className="maindivorgform">
          <div className="headersform">
            <button
                className="exitbutton"
                title="Вернуться в кабинет"
                onClick={() => navigate("/admin_acc_page")}
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
                        className={`filter-buttonorgform ${selectedStatus === id ? "active" : ""}`}
                        onClick={() => setSelectedStatus(id)}
                    >
                      {label}
                    </button>
                ))}
              </div>
            </div>
            <div className="table-containertableorgform">
              <h2>Список форм в выбранном статусе</h2>
              <table className="styled-tableorgform">
                <thead>
                <tr>
                  <th>№ Заявки</th>
                  <th>Дата Создания</th>
                  <th>Краткое наим-е организации</th>
                </tr>
                </thead>
                <tbody>
                {forms.filter(f => f.status === selectedStatus).length > 0 ? (
                    forms
                        .filter(f => f.status === selectedStatus)
                        .map(f => (
                            <tr
                                key={f.id}
                                onClick={() => handleRowClick(f.org)}
                                style={{ cursor: "pointer" }}
                            >
                              <td>{f.id}</td>
                              <td>{f.date}</td>
                              <td>{f.org}</td>
                            </tr>
                        ))
                ) : (
                    <tr>
                      <td colSpan="3" className="no-data">Нет данных</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
>>>>>>> parent of 4f9b9c9 (Merge pull request #39 from teampapo/akiyanara)
        </div>
      </div>
      <div className="contentorgform">
        <div className="table-containerfilter">
          <h2>Фильтры по значению статуса</h2>
          <div className="filterorgform">
            {statuses.map(({ id, label }) => (
              <button
                key={id}
                className={`filter-buttonorgform ${selectedStatus === id ? "active" : ""}`}
                onClick={() => setSelectedStatus(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="table-containertableorgform">
          <h2>Список форм в выбранном статусе</h2>
          <table className="styled-tableorgform">
            <thead>
              <tr>
                <th>Рег №</th>
                <th>Дата Создания</th>
                <th>Краткое наим-е организации</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {forms.filter(f => f.status === selectedStatus).length > 0 ? (
                forms
                  .filter(f => f.status === selectedStatus)
                  .map(f => (
                    <tr key={f.id}>
                      <td>{f.id}</td>
                      <td>{f.date}</td>
                      <td>{f.org}</td>
                      <td>
                        <a href={`/org_statusedit?id=${f.id}`} className="edit-button">Перейти</a>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">Нет данных</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PioneerForms;
