import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  return (
    <div className="maindivorgform">
      <div className="headersPioneer">
        <div className="headtextPioneer">
          <h1 className="titleorgform">ФОРМЫ ПОДКЛЮЧЕНИЯ ОРГАНИЗАЦИИ К PIONEER</h1>
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
