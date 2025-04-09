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
                        <p>Тип: {org.typeOfServiceId}</p>
                        <p>Регион: {org.region}</p>
                        <p>Город: {org.city}</p>
                        <p>Улица: {org.street}</p>
                        <p>Дом: {org.house}</p>
                    </div>
                    <div className="modalColumn">
                        <h3>Контактная информация</h3>
                        <p>Фамилия: {org.responsiblePersonSurname}</p>
                        <p>Имя: {org.responsiblePersonName}</p>
                        <p>Email: {org.responsiblePersonEmail}</p>
                        <p>Номер телефона: {org.responsiblePersonPhoneNumber}</p>
                        <p>Доп информация: {org.additionalInfo}</p>
                    </div>
                </div>
                <button className="blockButton" onClick={() => onBlock(org.organizationId)}>Заблокировать</button>
            </div>
        </div>
    );
};

export default OrgDetailModal;