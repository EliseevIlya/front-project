import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import Confirmationwashingpage from "../confirmationwashingpage/confirmationwashingpage";
import Select from "react-select";
import { getCustomerServiceTypeOrg, requestCreateCustomer } from "../../api/Customer.js";
import { getServiceDetail } from "../../api/ServiceDetail.js";

function Washingservice() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedTimeToday, setSelectedTimeToday] = useState("");
    const [selectedTimeTomorrow, setSelectedTimeTomorrow] = useState("");

    const [organizationChooseDisabled, setSelectedOrganizationChooseDisabled] = useState(true);
    const [serviceChooseDisabled, setSelectedServiceChooseDisabled] = useState(true);

    const [organizationsByServiceType, setOrganizationsByServiceType] = useState([]);
    const [listCity, setListCity] = useState([]);

    const [selectedCity, setSelectedCity] = useState(null);

    const [filteredOrganizations, setFilteredOrganizations] = useState([]);
    const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);

    const [addInfo, setAddInfo] = useState();

    const [postServiceToCustomer, setPostServiceToCustomer] = useState();

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
            localStorage.setItem("typeOfService", "1");
            await Promise.resolve();
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
            console.log("Selected organization ID:", selectedOrganizationId.value);

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
                console.log(getData, "RESPONSE")
                setOrganizationServices(getData.content || []);
            }
        }

        getServicesData()
    }, [organizationServicesCriteria]);

    const handleServiceChange = (index, value) => {
        const newServices = [...selectedServices];
        newServices[index] = value;

        // Prevent duplicate service selection
        const selectedServiceIds = newServices.filter(service => service).map(service => service.id);
        if (index === selectedServices.length - 1 && value) {
            newServices.push(null);
        }

        // Remove duplicates
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

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 10; hour <= 22; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            times.push(time);
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

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


    const handleSubmit = async () => {
        console.log(organizationServices, "organizationServices");
        console.log(selectedServices, "selectedServices");

        // Проверяем, что хотя бы одно время выбрано
        if (!selectedTimeToday && !selectedTimeTomorrow) {
            alert("Выберите время для услуги!");
            return;
        }
        console.log(selectedTimeToday,selectedTimeTomorrow,"TIME");
        let dateService = ""; // Инициализируем переменную для даты


        if (selectedTimeToday) {
            const today = new Date();
            const [hours, minutes] = selectedTimeToday.split(":");
            today.setHours(hours, minutes, 0, 0);
            dateService = formatLocalDate(today); // ✅ теперь локальное время
        } else if (selectedTimeTomorrow) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const [hours, minutes] = selectedTimeTomorrow.split(":");
            tomorrow.setHours(hours, minutes, 0, 0);
            dateService = formatLocalDate(tomorrow); // ✅ теперь локальное время
            console.log(tomorrow,"TOMORROW")
            console.log(dateService,"dateService");
        }


        const postServiceData = {
            organizationId: selectedOrganizationId.value, // Предполагается, что selectedOrganizationId имеет объект с value
            addInfo: addInfo, // Дополнительная информация
            serviceDetailIds: selectedServices.filter(service => service).map(service => service.id), // Получаем массив id услуг
            dateService: dateService
        };

        console.log(postServiceData, "FINAL");

        const success = await requestCreateCustomer(postServiceData);

        if (success) {
            navigate("/apps");
        } else {
            alert("Ошибка при отправке запроса. Проверьте данные и попробуйте ещё раз.");
        }

    };

    const handleTimeTodayChange = (value) => {
        setSelectedTimeToday(value);
        if (value) {
            setSelectedTimeTomorrow(""); // Reset tomorrow's time
        }
    };

    const handleTimeTomorrowChange = (value) => {
        setSelectedTimeTomorrow(value);
        if (value) {
            setSelectedTimeToday(""); // Reset today's time
        }
    };

    // Check if the button should be disabled
    const isSubmitDisabled = !selectedCity || !selectedOrganizationId || selectedServices.every(service => !service) || (!selectedTimeToday && !selectedTimeTomorrow);

    return (
        <div className="servicepage">
            <div className="headerS">
                <button className="exitbuttonS" title="Выбор услуг" onClick={() => navigate("/service")}>
                    <img src="/src/icons/exit.png" alt="Выбор услуг" />
                </button>
                <h1 className="titleS">ВЫБЕРИТЕ УСЛУГИ</h1>
            </div>
            <div className="washingmaindiv">
                <h1 className="service-title">МОЙКА</h1>
                <div className="washingservicediv">
                    <div className="left-column">
                        <div className="servdiv">
                            <label className="choose">Город:</label>
                            <Select
                                styles={customStyles}
                                options={listCity}
                                className="washingselect"
                                placeholder="Выберите"
                                onChange={citySelectOnChoose}
                                value={selectedCity}
                            />
                        </div>
                        <div className="servdiv">
                            <label className="choose">Организация:</label>
                            <Select
                                styles={customStyles}
                                options={filteredOrganizations}
                                className="washingselect"
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
                                            className="washingselect"
                                            value={service ? service.id : ""}
                                            onChange={(e) => { handleServiceChange(index, organizationServices.find(s => s.id == e.target.value)) }}
                                        >
                                            <option className="optionS" value="">Выберите</option>
                                            {organizationServices?.map((serviceOption) => (
                                                <option
                                                    className="optionS"
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
                            <select className="washingselect" value={selectedTimeToday}
                                    onChange={(e) => handleTimeTodayChange(e.target.value)}>
                                <option className="optionS" value="">Выберите</option>
                                {timeOptions.map((time) => (
                                    <option className="optionS" key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="servdiv">
                            <label className="choose">Завтра:</label>
                            <select className="washingselect" value={selectedTimeTomorrow}
                                    onChange={(e) => handleTimeTomorrowChange(e.target.value)}>
                                <option className="optionS" value="">Выберите</option>
                                {timeOptions.map((time) => (
                                    <option className="optionS" key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="dopinfoservice">
                    <label className="dopinfotextservice">ДОП. ИНФОРМАЦИЯ:</label>
                    <textarea className="dopinfoitemservice" placeholder="Дополнительная информация..." value={addInfo}
                              onChange={(e) => setAddInfo(e.target.value)}
                    ></textarea>
                </div>

                <div className="washingbutton-container">
                    <div className="itog-container">
                        <label className="itog">ИТОГО:</label>
                        <input className="summa" type="number" value={totalCost} disabled />
                    </div>
                    <button
                        className="washingbutton"
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled} // Disable button based on validation
                    >
                        Записаться
                    </button>
                </div>
            </div>
            <Confirmationwashingpage isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default Washingservice;