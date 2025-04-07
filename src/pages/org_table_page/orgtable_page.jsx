import { useState, useEffect } from "react";
import "./style_orgtable.css";
import { useNavigate } from "react-router-dom";
import {getAdminOrg} from "../../api/Admin.js";
import {deleteAdminOrg} from "../../api/Admin.js";

function OrgTable_page() {
    const [rows, setRows] = useState(5);
    const [org, setOrg] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            getAdminOrg(jwt, {
                fullName: "",
                shortName: "",
                inn: "",
                kpp: "",
                ogrn: "",
                responsiblePersonSurname: "",
                responsiblePersonName: "",
                responsiblePersonPatronymic: "",
                responsiblePersonEmail: "",
                responsiblePersonPhoneNumber: "",
                typeOfServiceId: "",
                page: 0,
                size: 15
            }).then(data => {
                setOrg(data.content || []);
            });
        }
    }, []);

    const loadMoreRows = () => {
        setRows(prevRows => prevRows + 5);
    };

    const handleSortById = () => {
        setSortAsc(!sortAsc);
    };

    const sortedOrg = [...org].sort((a, b) => {
        if (sortAsc) {
            return a.organizationId - b.organizationId;
        } else {
            return b.organizationId - a.organizationId;
        }
    });

    const handleDelete = (organizationId) => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) return;

        if (window.confirm("Вы уверены, что хотите удалить организацию?")) {
            deleteAdminOrg(jwt, organizationId)
                .then(() => {
                    setOrg(prev => prev.filter(org => org.organizationId !== organizationId));
                })
        }
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="headersTable">
                <button className="exitbuttonTable" title="Вернуться в кабинет" onClick={() => navigate("/adminacc")}>
                    <img src="/src/icons/exitblack.png" alt="Exit" />
                </button>
                <h1 className="textTable">СПИСОК ОРГАНИЗАЦИЙ</h1>
            </div>

            <div className="bodytable">
                <table className="orgTable">
                    <thead>
                    <tr>
                        <th onClick={handleSortById} style={{ cursor: "pointer" }}>
                            ID {sortAsc ? "▲" : "▼"}
                        </th>
                        <th>Полное</th>
                        <th>Краткое</th>
                        <th>ИНН</th>
                        <th>КПП</th>
                        <th>ОГРН</th>
                        <th>Город</th>
                        <th>Адрес</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Номер тел.</th>
                        <th>Доп.инф.</th>
                        <th>Блокировка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedOrg.map((org, index) => {
                        if (index >= rows) return null;
                        return (
                            <tr key={org.organizationId}>
                                <td>{org.organizationId}</td>
                                <td><input type="text" className="otbitem" value={org.organizationFullName || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.organizationShortName || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.organizationInn || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.organizationKpp || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.organizationOgrn || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.organizationCity || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.organizationAddress || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.responsiblePersonSurname || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.responsiblePersonName || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.responsiblePersonEmail || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.responsiblePersonPhoneNumber || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value="" disabled /></td>
                                <td><button className="blockButton" onClick={() => handleDelete(org.organizationId)}>X</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <button className="loadMoreButton" onClick={loadMoreRows}>Загрузить еще</button>
        </>
    );
}

export default OrgTable_page;
