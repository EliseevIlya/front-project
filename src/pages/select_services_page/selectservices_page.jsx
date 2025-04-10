import React, {useState, useEffect} from "react";
import "./style_selectservices.css";
import {useNavigate} from "react-router";
import Select from "react-select";
import {getCustomerServiceTypeOrg, requestCreateCustomer} from "../../api/Customer.js";
import {getServiceDetail} from "../../api/ServiceDetail.js";
import Modal from "react-modal";

function SelectServices_Page() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedTimeToday, setSelectedTimeToday] = useState("");
    const [selectedTimeTomorrow, setSelectedTimeTomorrow] = useState("");

    const [organizationsByServiceType, setOrganizationsByServiceType] = useState([]);
    const [listCity, setListCity] = useState([]);

    const [selectedCity, setSelectedCity] = useState(null);
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);
    const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);
    const [addInfo, setAddInfo] = useState();
    const [modalData, setModalData] = useState({});
    const [organizationServicesCriteria, setSelectedOrganizationServicesCriteria] = useState({
        organizationId: selectedOrganizationId,
        typeCode: localStorage.getItem("typeOfService"),
        page: 0,
        size: 1000
    });
    const [organizationServices, setOrganizationServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([null]);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '15vw',
            height: '5vh',
            fontSize: '1.2vw',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '20px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'transparent',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#f0f0f0' : 'white',
            color: 'black',
            fontSize: '1.2vw',
            '&:hover': {
                backgroundColor: '#f0f0f0',
            },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
            fontSize: '1.2vw',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '20px',
            marginTop: '5px',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
        }),
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrganizationsAndCities = async () => {
            try {
                const data = await getCustomerServiceTypeOrg();
                const content = data?.content || [];
                setOrganizationsByServiceType(content);

                // Collect cities from addresses
                const allCities = content
                    .flatMap(org => org.addresses || [])
                    .map(addr => addr.cityName)
                    .filter(Boolean);

                // Unique cities for Select
                const uniqueCities = [...new Set(allCities)].map(city => ({
                    value: city,
                    label: city
                }));

                setListCity(uniqueCities);
            } catch (error) {
                console.error("Error loading organizations and cities:", error);
            }
        };

        fetchOrganizationsAndCities();
    }, []);

    const citySelectOnChoose = (selectedOption) => {
        setSelectedCity(selectedOption);
    }

    useEffect(() => {
        if (selectedCity) {
            setSelectedOrganizationId(null);
            const filtered = organizationsByServiceType.filter(org =>
                org.addresses?.some(addr => addr.cityName === selectedCity.value)
            );

            const options = filtered.map(org => {
                const addr = org.addresses.find(addr => addr.cityName === selectedCity.value);
                const label = `${org.fullName} ${addr.subjectName} ${addr.cityName} ${addr.streetName} ${addr.houseNumber}`;

                return {
                    value: org.id,
                    label,
                };
            });

            setFilteredOrganizations(options);
        } else {
            setFilteredOrganizations([]);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedOrganizationId) {
            setSelectedOrganizationServicesCriteria(prev => ({
                ...prev,
                organizationId: selectedOrganizationId.value
            }));
        }
    }, [selectedOrganizationId]);

    useEffect(() => {
        const getServicesData = async () => {
            if (organizationServicesCriteria.organizationId) {
                const getData = await getServiceDetail(organizationServicesCriteria);
                setOrganizationServices(getData.content || []);
            }
        }

        getServicesData();
    }, [organizationServicesCriteria]);

    const handleServiceChange = (index, value) => {
        const newServices = [...selectedServices];
        newServices[index] = value;

        const selectedServiceIds = newServices.filter(service => service).map(service => service.id);
        if (index === selectedServices.length - 1 && value) {
            newServices.push(null);
        }

        const uniqueServices = newServices.filter((service, idx) => {
            return service === null || selectedServiceIds.indexOf(service.id) === idx;
        });

        setSelectedServices(uniqueServices);
    };

    const handleRemoveService = (index) => {
        const newServices = selectedServices.filter((_, i) => i !== index);
        setSelectedServices(newServices.length > 0 ? newServices : [null]);
    };

    useEffect(() => {
        const cost = selectedServices.reduce((acc, service) => {
            if (service) {
                return acc + (service.cost || 0);
            }
            return acc;
        }, 0);
        setTotalCost(cost);
    }, [selectedServices]);

    const generateTodayTimeOptions = () => {
        const times = [];
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        for (let hour = 10; hour <= 22; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;

            // Проверяем только для сегодняшней даты
            if (now.getDate() === new Date().getDate()) {
                // Если это сегодня и время уже прошло, пропускаем
                if (hour < currentHour || (hour === currentHour && currentMinute >= 0)) {
                    continue;
                }
            }

            times.push(time);
        }
        return times;
    };

    const generateTomorrowTimeOptions = () => {
        const times = [];
        for (let hour = 10; hour <= 22; hour++) {
            times.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return times;
    };

    const timeOptionsToday = generateTodayTimeOptions();
    const timeOptionsTomorrow = generateTomorrowTimeOptions();

    function formatLocalDate(date) {
        const pad = num => String(num).padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedTimeToday && !selectedTimeTomorrow) {
            alert("Выберите время для услуги!");
            return;
        }

        let dateService = "";

        if (selectedTimeToday) {
            const today = new Date();
            const [hours, minutes] = selectedTimeToday.split(":");
            today.setHours(hours, minutes, 0, 0);
            dateService = formatLocalDate(today);
        } else if (selectedTimeTomorrow) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const [hours, minutes] = selectedTimeTomorrow.split(":");
            tomorrow.setHours(hours, minutes, 0, 0);
            dateService = formatLocalDate(tomorrow);
        }

        const postServiceData = {
            organizationId: selectedOrganizationId.value,
            addInfo: addInfo,
            serviceDetailIds: selectedServices.filter(service => service).map(service => service.id),
            dateService: dateService
        };

        try {
            const success = await requestCreateCustomer(postServiceData);

            if (success) {
                setModalData({
                    time: selectedTimeToday || selectedTimeTomorrow,
                    day: selectedTimeToday ? "Сегодня" : "Завтра",
                    address: selectedOrganizationId ? `${selectedOrganizationId.label}` : "Не указано"
                });
                setModalOpen(true);
            } else {
                alert("Ошибка при отправке запроса. Проверьте данные и попробуйте ещё раз.");
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        navigate("/apps");
    };

    const handleTimeTodayChange = (value) => {
        setSelectedTimeToday(value);
        if (value) {
            setSelectedTimeTomorrow("");
        }
    };

    const handleTimeTomorrowChange = (value) => {
        setSelectedTimeTomorrow(value);
        if (value) {
            setSelectedTimeToday("");
        }
    };

    const isSubmitDisabled = !selectedCity || !selectedOrganizationId || selectedServices.every(service => !service) || (!selectedTimeToday && !selectedTimeTomorrow);

    const serviceType = localStorage.getItem("typeOfService");

    return (
        <div className="selectservicepage">
            <div className="header">
                <button className="exitbutton " title="Выбор услуг" onClick={() => navigate("/service")}>
                    <img src="/src/icons/exit.png" alt="Выбор услуг"/>
                </button>
                <h1 className="title">ВЫБЕРИТЕ УСЛУГИ</h1>
            </div>
            <div className="main_div"
                 style={{backgroundColor: serviceType === '1' ? 'darkblue' : 'darkgoldenrod'}}>
                <h1 className="service-title">{serviceType === '1' ? 'МОЙКА' : 'ШИНОМОНТАЖ'}</h1>
                <div className="service-selection-div">
                    <div className="left-column">
                        <div className="servdiv">
                            <label className="choose">Город:</label>
                            <Select
                                styles={customStyles}
                                options={listCity}
                                className="select"
                                placeholder="Выберите"
                                onChange={citySelectOnChoose}
                                value={selectedCity}
                            />
                        </div>
                        <div className="servicediv">
                            <label className="choose">Организация:</label>
                            <Select
                                styles={customStyles}
                                options={filteredOrganizations}
                                className="select"
                                placeholder="Выберите"
                                onChange={(selectedOrg) => {
                                    setSelectedOrganizationId(selectedOrg);
                                }}
                                value={selectedOrganizationId}
                            />
                        </div>
                    </div>

                    <div className="center-column">
                        <div className="servdiv">
                            <label className="choose">Услуги:</label>
                            <div className="services-container">
                                {selectedServices.map((service, index) => (
                                    <div key={index} className="service-dropdown">
                                        <select
                                            className="select"
                                            value={service ? service.id : ""}
                                            onChange={(e) => {
                                                handleServiceChange(index, organizationServices.find(s => s.id == e.target.value))
                                            }}
                                        >
                                            <option className="option" value="">Выберите</option>
                                            {organizationServices?.map((serviceOption) => (
                                                <option
                                                    className="option"
                                                    key={serviceOption.id}
                                                    value={serviceOption.id}
                                                >
                                                    {serviceOption.name} - {serviceOption.cost} руб.
                                                    ({serviceOption.duration} мин.)
                                                </option>
                                            ))}
                                        </select>
                                        {selectedServices.length > 1 && (
                                            <button className="remove-button"
                                                    onClick={() => handleRemoveService(index)}>
                                                ✖
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="right-column">
                        <div className="servdiv">
                            <label className="choose">Сегодня:</label>
                            <select className="select" value={selectedTimeToday}
                                    onChange={(e) => handleTimeTodayChange(e.target.value)}>
                                <option className="option" value="">Выберите</option>
                                {timeOptionsToday.map((time) => (
                                    <option className="option" key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                            <label className="choose">Завтра:</label>
                            <select className="select" value={selectedTimeTomorrow}
                                    onChange={(e) => handleTimeTomorrowChange(e.target.value)}>
                                <option className="option" value="">Выберите</option>
                                {timeOptionsTomorrow.map((time) => (
                                    <option className="option" key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="dopinfoserv">
                    <label className="dopinfotextserv">ДОП. ИНФОРМАЦИЯ:</label>
                    <textarea className="dopinfoitemserv" placeholder="Дополнительная информация..." value={addInfo}
                              onChange={(e) => setAddInfo(e.target.value)}
                    ></textarea>
                </div>

                <div className="button-containerserv">
                    <div className="total-container">
                        <label className="total">ИТОГО:</label>
                        <input className="total-amount" type="number" value={totalCost} disabled/>
                    </div>
                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled}
                    >
                        Записаться
                    </button>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                className="modal-content-confirm"
                overlayClassName="modal-overlay-confirm"
                ariaHideApp={false}
            >
                <div className="modal-overlay-confirm">
                    <div className="modal-content-confirm">
                        <h1>ПОДТВЕРЖДЕНИЕ ЗАПИСИ</h1>
                        <div className="confirmation-text">
                            <p className="confirmation-infotext">
                                ЖДЕМ
                                ВАС {selectedTimeToday ? "Сегодня" : "Завтра"} В {selectedTimeToday || selectedTimeTomorrow}
                            </p>
                            <p className="confirmation-infotext">
                                ПО
                                АДРЕСУ: {selectedOrganizationId ? `${selectedOrganizationId.label}` : "Не указано"}
                            </p>
                        </div>
                        <button className="confirmation-button" onClick={handleCloseModal}>ОК</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SelectServices_Page;