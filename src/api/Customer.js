import axios from "axios"
import { globalAPI } from "./config.js";

const api = globalAPI;
console.log("API",api); // "http://localhost:8080"


export function getCustomer(jwt,setEmail,setSurname,setName,setPhone,setAddInfo,setPatronymic){
    const header={
        Authorization: `Bearer ${jwt}`
    }

    axios.get(`${api}/api/customer/`, {
        headers: header
    })
    .then((res)=>{
        console.log(res)
        const data = res.data;
        setEmail(data.email);
        setSurname(data.surname);
        setName(data.name);
        setPhone(data.phoneNumber);
        setAddInfo(data.addInfo);
        setPatronymic(data.patronymic);
    })
    .catch((error)=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}

export function getCustomerServiceTypeOrg(){
    const headers={

    }
    axios.get(`${api}/api/customer/service_type/organizations`,headers)
    .then(()=>{

    })
    .catch((error)=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}

export function getCustomerServiceRequest(jwt,  organizationId,startDate,size){
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
    };
    const body={
        organizationId:organizationId,
        startDate:startDate,
        size:size
    }
    return  axios.post(`${api}/api/customer/service_requests`,body,{headers:headers})
    .then((response)=>{
        return response.data.content;
    })
    .catch((error)=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}

export function updateCustomer(jwt,email, surname, name,patronymic, phone, addInfo){
    const body={
    email:email,
    surname:surname,
    name:name,
    patronymic:patronymic,
    phoneNumber:phone,
    addInfo:addInfo
    }
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
    };
    return axios.put(`${api}/api/customer/update`, body, { headers  })
        .then(response => {
            return response.data; // Возвращаем данные сервера
        })
    .catch((error)=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}
export function deleteCustomer(jwt){
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
    };
    return axios.delete(`${api}/api/customer/delete`,{headers:headers})
    .then((res)=>{
        if (res.status === 200) {
            console.log('Код успешно отправлен');
            console.log(res)
            return true; // Успешная отправка
        } else {
            console.error(`Ошибка: сервер вернул статус ${res.status}`);
            return false; // Неуспешный статус
        }
    })
    .catch((error)=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}

export function requestCreateCustomer(organizationIdRequestCreateCustomer, addInfoRequestCreateCustomer, serviceDetailIdsRequestCreateCustomer, dateServiceRequestCreateCustomer){
    const headers={

    }
    const body ={
        organizationId:organizationIdRequestCreateCustomer,
        addInfo:addInfoRequestCreateCustomer,
        serviceDetailIds:serviceDetailIdsRequestCreateCustomer,
        dateService:dateServiceRequestCreateCustomer
      }
    axios.delete(`${api}/api/customer/service_request/create`,headers, body)
    .then(()=>{

    })
    .catch((error)=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}

export function deleteServiceRequest(jwt,serviceRequestId){
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
    };
    axios.delete(`${api}/api/customer/delete/request?serviceRequestId=${serviceRequestId}`,{headers:headers})
        .then(() =>{})
        .catch((error)=>{
            console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
            if (error.response) {
                console.log(`Ошибка: ${error.response.data.message}`);
            } else {
                console.log('Произошла ошибка при подключении к серверу.');
            }
        })
}