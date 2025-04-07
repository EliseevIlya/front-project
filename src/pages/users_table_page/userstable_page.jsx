import { useState, useEffect } from "react";
import "./style_userstable.css";
import { useNavigate } from "react-router-dom";
import { getAdminCustomer } from "../../api/Admin.js";
import {deleteAdminCustomer} from "../../api/Admin.js";

function UsersTable_page() {
    const [rows, setRows] = useState(5);
    const [users, setUsers] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        document.body.style.backgroundColor = '#f0f0f0';

        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            getAdminCustomer(jwt, {
                surname: "",
                name: "",
                patronymic: "",
                phoneNumber: "",
                email: "",
                size: 15
            }).then(data => {
                setUsers(data.content || []);
            });
        }
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const loadMoreRows = () => {
        setRows(prevRows => prevRows + 5);
    };

    const handleSortById = () => {
        setSortAsc(!sortAsc);
    };

    const sortedUsers = [...users].sort((a, b) => {
        return sortAsc
            ? a.customerId - b.customerId
            : b.customerId - a.customerId;
    });

    const handleDelete = (customerId) => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) return;

        if (window.confirm("Вы уверены, что хотите удалить пользователя?")) {
            deleteAdminCustomer(jwt, customerId)
                .then(() => {
                    setUsers(prev => prev.filter(user => user.customerId !== customerId));
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
                <h1 className="textTable">СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h1>
            </div>
            <div className="bodytable">
                <table className="usersTable">
                    <thead>
                    <tr>
                        <th onClick={handleSortById} style={{ cursor: "pointer" }}>
                            ID {sortAsc ? "▲" : "▼"}
                        </th>
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
                    {sortedUsers.map((user, index) => {
                        if (index >= rows) return null;
                        return (
                            <tr key={user.customerId}>
                                <td>{user.customerId}</td>
                                <td><input type="text" className="utbitem" value={user.customerSurname || ""} disabled /></td>
                                <td><input type="text" className="utbitem" value={user.customerName || ""} disabled /></td>
                                <td><input type="text" className="utbitem" value={user.customerPatronymic || ""} disabled /></td>
                                <td><input type="text" className="utbitem" value={user.customerEmail || ""} disabled /></td>
                                <td><input type="text" className="utbitem" value={user.customerPhoneNumber || ""} disabled /></td>
                                <td><input type="text" className="utbitem" value="" disabled /></td>
                                <td><button className="blockButton" onClick={() => handleDelete(user.customerId)}>X</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            {users.length >= 0 && (
                <button className="loadMoreButton" onClick={loadMoreRows}>Загрузить еще</button>
            )}
        </>
    );
}

export default UsersTable_page;
