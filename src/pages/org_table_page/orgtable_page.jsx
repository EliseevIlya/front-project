import { useState, useEffect } from "react";
import "./style_orgtable.css";
import { useNavigate } from "react-router-dom";
import { getAdminOrg, deleteAdminOrg } from "../../api/Admin.js";
import OrgDetailModal from "../org_detail_modal/org_detailmodal.jsx";

function OrgTable_page() {
    const [rows, setRows] = useState(5);
    const [org, setOrg] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = '#f0f0f0';

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
                addresses: [],
                typeOfServiceId: "",
                page: 0,
                size: 15
            }).then(data => {
                setOrg(data.content || []);
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

    const sortedOrg = [...org].sort((a, b) => {
        return sortAsc ? a.organizationId - b.organizationId : b.organizationId - a.organizationId;
    });

    const handleDelete = (organizationId) => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) return;

        if (window.confirm("Вы уверены, что хотите удалить организацию?")) {
            deleteAdminOrg(jwt, organizationId)
                .then(() => {
                    setOrg(prev => prev.filter(org => org.organizationId !== organizationId));
                });
        }
    };

    const handleRowClick = (org) => {
        setSelectedOrg(org);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedOrg(null);
    };

    const handleBlock = (organizationId) => {
        // Implement the block functionality here
        alert(`Заблокировать организацию с ID: ${organizationId}`);
        handleCloseModal();
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
                        <th>Название</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Номер телефона</th>
                        <th>Блокировка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedOrg.map((org, index) => {
                        if (index >= rows) return null;
                        return (
                            <tr key={org.organizationId} onClick={() => handleRowClick(org)}>
                                <td>{org.organizationId}</td>
                                <td><input type="text" className="otbitem" value={org.organizationShortName || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.responsiblePersonSurname || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.responsiblePersonName || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.responsiblePersonEmail || ""} disabled /></td>
                                <td><input type="text" className="otbitem" value={org.responsiblePersonPhone || ""} disabled /></td>
                                <td><button className="blockButtonTable" onClick={() => handleDelete(org .organizationId)}>X</button></td>

                            </tr>
                        );
                    })}

                    </tbody>
                </table>
            </div>
            {org.length >= 15 && (
                <button className="loadMoreButton" onClick={loadMoreRows}>Загрузить еще</button>
            )}
            {modalOpen && (
                <OrgDetailModal
                    org={selectedOrg}
                    onClose={handleCloseModal}
                    onBlock={handleBlock}
                />
            )}
        </>
    );
}

export default OrgTable_page;