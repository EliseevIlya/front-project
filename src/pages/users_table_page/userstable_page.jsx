import { useState, useEffect } from "react";
import "./style_userstable.css";
import {useNavigate} from "react-router-dom";

function UsersTable_page() {
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
                <button className="exitbutton" title="Вернуться в кабинет" onClick={() => navigate("/adminacc")}>
                    <img src="/src/icons/exitblack.png" alt="Exit"/>
                </button>
                <h1 className="textTable">СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h1>
            </div>

            <div className="bodytable">
                <table className="usersTable">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>E-mail</th>
                        <th>Номер телефона</th>
                        <th>Доп информация</th>
                        <th>Блокировка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(rows)].map((_, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><input type="text" className="utbitem" disabled/></td>
                            <td><input type="text" className="utbitem" disabled/></td>
                            <td><input type="text" className="utbitem" disabled/></td>
                            <td><input type="text" className="utbitem" disabled/></td>
                            <td><input type="text" className="utbitem" disabled/></td>
                            <td><input type="text" className="utbitem" disabled/></td>
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

export default UsersTable_page;
