import axios from "axios"
import { globalAPI } from "./config.js";

const api = globalAPI;

export function getOneOrganization(jwt){
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    return  axios.get(`${api}/api/organization/get_organization`,{headers: headers})
    .then((response)=>{
        console.log(response.data);
        return response.data;
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
export function deleteOrganization(){
    const headers={

    }
    const body={

    }
    axios.delete(`${api}/api/organization/`,body,headers)
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

export function getOrganizationServices(jwt){
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    
    axios.get(`${api}/api/organization/get_organization_service`,{headers: headers})
    .then((req)=>{
        return (req.content)
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

export function updateOrganization(jwt, data){
    const body = {
        fullName: data.fullName,
        shortName: data.shortName,
        inn: data.inn,
        kpp: data.kpp,
        ogrn: data.ogrn,
        responsiblePersonSurname: data.responsiblePersonSurname,
        responsiblePersonName: data.responsiblePersonName,
        responsiblePersonPatronymic: data.responsiblePersonPatronymic,
        responsiblePersonEmail: data.responsiblePersonEmail,
        responsiblePersonPhoneNumber: data.responsiblePersonPhoneNumber,
        addInfo: data.addInfo,
        email: data.email,
        // Извлечение данных из массива addresses и сохранение в массиве
        addresses: data.addresses.length > 0 ? [{
            id: data.addresses[0].id,
            subjectName: data.addresses[0].subjectName,
            cityName: data.addresses[0].cityName,
            streetName: data.addresses[0].streetName,
            houseNumber: data.addresses[0].houseNumber,
            addInfo: data.addresses[0].addInfo,
            addressType: data.addresses[0].addressType
        }] : []  // Если массив пустой, сохраняем пустой массив
    };

    console.log(body, "safsadfas");
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    return axios.put(`${api}/api/organization/update/organization`,body, {headers:headers})
    .then((res)=>{
        console.log(res.data)
        return res.data
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

export function getOrganizationServicesRequests(){
    const headers={

    }
    axios.get(`${api}/api/organization/get_organization_services_requests`,headers)
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

