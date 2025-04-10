import React from 'react';
import './style_orgdetail.css';

const OrgDetailModal = ({ org, onClose, onBlock }) => {
    if (!org) return null;

    console.log(org)
    
    return (
        <div className="modalOverlayTable">
            <div className="modalContentTable">
                <div className="modalHeader">
                    <h2 className="textModalTable">ID Организации: {org.organizationId}</h2>
                    <button className="closeButtonModalTable" onClick={onClose}>✖</button>
                </div>
                <div className="modalBodyTable">
                    <div className="modalColumn">
                        <h3 className="podtextModalTable">Информация</h3>
                        <p className="infoModalTable">Полное название: {org.organizationFullName}</p>
                        <p className="infoModalTable">Краткое название: {org.organizationShortName}</p>
                        <p className="infoModalTable">ИНН: {org.inn}</p>
                        <p className="infoModalTable">КПП: {org.kpp}</p>
                        <p className="infoModalTable">ОГРН: {org.ogrn}</p>
                    </div>
                    <div className="modalColumn">
                        <h3 className="podtextModalTable">Адрес</h3>
                        <p className="infoModalTable">Тип: {org.addresses?.[0]?.addressType || "LEGAL"}</p>
                        <p className="infoModalTable">Регион: {org.addresses?.[0]?.subjectName || ""}</p>
                        <p className="infoModalTable">Город: {org.addresses?.[0]?.cityName || ""}</p>
                        <p className="infoModalTable">Улица: {org.addresses?.[0]?.streetName || ""}</p>
                        <p className="infoModalTable">Дом: {org.addresses?.[0]?.houseNumber || ""}</p>
                    </div>
                    <div className="modalColumn">
                        <h3 className="podtextModalTable">Контактная информация</h3>
                        <p className="infoModalTable">Фамилия: {org.responsiblePersonSurname}</p>
                        <p className="infoModalTable">Имя: {org.responsiblePersonName}</p>
                        <p className="infoModalTable">Отчество: {org.responsiblePersonPatronymic}</p>
                        <p className="infoModalTable">Email: {org.responsiblePersonEmail}</p>
                        <p className="infoModalTable">Номер телефона: {org.responsiblePersonPhone}</p>

                    </div>
                </div>
                <button className="blockButtonModalTable" onClick={() => onBlock(org.organizationId)}>Заблокировать
                </button>
            </div>
        </div>
    );
};

export default OrgDetailModal;