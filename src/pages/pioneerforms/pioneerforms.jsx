import { useState } from "react";
import "./style.css";

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
    { id: 4, status: "rejected", date: "02.03.2025", org: "Компания D" }
    
  
  ];

  const [selectedStatus, setSelectedStatus] = useState("new");

  return (
    <div className="maindiv">
      <h1 className="title">ФОРМЫ ПОДКЛЮЧЕНИЯ ОРГАНИЗАЦИИ К PIONEER</h1>
      <div className="content">
        <div className="table-containerfilter">
          <h2>Фильтры по значению статуса</h2>
          <div className="filter">
            {statuses.map(({ id, label }) => (
              <button
                key={id}
                className={`filter-button ${selectedStatus === id ? "active" : ""}`}
                onClick={() => setSelectedStatus(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="table-containertable">
          <h2>Список форм в выбранном статусе</h2>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Рег №</th>
                <th>Дата Создания</th>
                <th>Краткое наим-е организации</th>
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
    </div>
  );
}

export default PioneerForms;
