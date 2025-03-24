import { useState, useEffect } from "react";
import "./style_orgtable.css";
import {useNavigate} from "react-router-dom";

function OrgTable_page() {
    const [rows, setRows] = useState(5);

    useEffect(() => {
        document.body.classList.add("usersTableBody");

        return () => {
            document.body.classList.remove("usersTableBody");
        };
    }, []);

    const loadMoreRows = () => {
        setRows(prevRows => prevRows + 5);
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="headersTable">
                <button className="exitbuttonTable" onClick={() => navigate("/admin_acc_page")}>Выйти</button>
                <h1 className="textTable">СПИСОК ОРГАНИЗАЦИЙ</h1>
            </div>

            <div className="bodytable">
                <table className="orgTable">
                    <thead>
                    <tr>
                        <th>ID</th>
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
                    {[...Array(rows)].map((_, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td><input type="text" className="otbitem" disabled/></td>
                            <td>
                                <button className="blockButton">X</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button className="loadMoreButton" onClick={loadMoreRows}>Загрузить еще</button>
        </>
    );
}

export default OrgTable_page;
