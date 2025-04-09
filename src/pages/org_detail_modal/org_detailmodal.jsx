import React from 'react';
import './style_orgdetail.css';

const OrgDetailModal = ({ org, onClose, onBlock }) => {
    if (!org) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={onClose}>✖</button>
                <h2>ID: {org.organizationId}</h2>
                <div className="modalBody">
                    <div className="modalColumn">
                        <h3>Информация</h3>
                        <p>Полное название: {org.organizationFullName}</p>
                        <p>Краткое название: {org.organizationShortName}</p>
                        <p>ИНН: {org.inn}</p>
                        <p>КПП: {org.kpp}</p>
                        <p>ОГРН: {org.ogrn}</p>
                    </div>
                    <div className="modalColumn">
                        <h3>Адрес</h3>
                        <p>Тип: {org.addresses?.[0]?.addressType === "LEGAL" ? "Юридический" : "Физический"}</p>
                        <p>Регион: {org.addresses?.[0]?.subjectName || ""}</p>
                        <p>Город: {org.addresses?.[0]?.cityName || ""}</p>
                        <p>Улица: {org.addresses?.[0]?.streetName || ""}</p>
                        <p>Дом: {org.addresses?.[0]?.houseNumber || ""}</p>
                    </div>
                    <div className="modalColumn">
                        <h3>Контактная информация</h3>
                        <p>Фамилия: {org.responsiblePersonSurname}</p>
                        <p>Имя: {org.responsiblePersonName}</p>
                        <p>Email: {org.responsiblePersonEmail}</p>
                        <p>Номер телефона: {org.responsiblePersonPhone}</p>
                    </div>
                </div>
                <button className="blockButton" onClick={() => onBlock(org.organizationId)}>Заблокировать</button>
            </div>
        </div>
    );
};

export default OrgDetailModal;