import axios from "axios"
import { globalAPI } from "./config.js";

const api = globalAPI;

export function deleteAdminCustomer(jwt, customerId){
    const headers = {
        Authorization: `Bearer ${jwt}`
    };
    return  axios.delete(`${api}/api/aggregator/customers?customerId=${customerId}`, {headers: headers})
        .then((res)=>{
        console.log(res.data)
        return res.data;
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

export function getAdminCustomer(jwt, data){
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    const body ={
        surname:data.surname || "",
        name:data.name || "",
        patronymic:data.patronymic || "",
        phoneNumber:data.phoneNumber || "",
        email:data.email || "",
        page: 0,
        size: 15
    }
    return axios.post(`${api}/api/aggregator/customers`,body,{headers: headers})
        .then((res)=>{
            console.log(res.data)
            return res.data;
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

export function deleteAdminOrg(jwt, organizationId){
    const headers = {
        Authorization: `Bearer ${jwt}`
    };
    return axios.delete(`${api}/api/aggregator/organization?organizationId=${organizationId}`, {headers:headers})
    .then((res)=>{
        console.log(res.data)
        return res.data;
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
export function getAdminOrg(jwt, data){
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    const body={
        fullName:data.fullName || "",
        shortName:data.shortName || "",
        inn:data.inn || "",
        kpp:data.kpp || "",
        ogrn:data.ogrn || "",
        responsiblePersonSurname:data.responsiblePersonSurname || "",
        responsiblePersonName:data.responsiblePersonName || "",
        responsiblePersonPatronymic:data.responsiblePersonPatronymic || "",
        responsiblePersonEmail:data.responsiblePersonEmail || "",
        responsiblePersonPhoneNumber:data.responsiblePersonPhoneNumber || "",
        typeOfServiceId:data.typeOfServiceId || "",
        page: 0,
        size: 15
    }
    return axios.post(`${api}/api/aggregator/organization`, body,{headers:headers})
    .then((res)=>{
        console.log(res.data);
        return res.data;
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

export function deleteAdminAgregator(){
    const headers={

    }
    axios.delete(`${api}/api/aggregator/aggreagator`,headers)
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

export function getAdminAgregator(jwt){
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    return axios.get(`${api}/api/aggregator/aggreagator`, {headers: headers})
    .then((res)=>{
        console.log(res.data);
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

export function putAdminAgregator(jwt, data){
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    const body={
        addInfo: data.addInfo || "",
        department: data.department || "",
        email: data.email || "",
        jwtToken: data.jwtToken || "",
        name: data.name || "",
        patronymic: data.patronymic || "",
        phoneNumber: data.phoneNumber || "",
        position: data.position || "",
        surname: data.surname || ""
    }
    return axios.put(`${api}/api/aggregator/aggreagator`,body,{headers: headers})
    .then((res)=>{
        console.log(res.data);
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
export function getAdminConnectionRequest(organizationIdgetAdminConnectionRequest, registrationNumbergetAdminConnectionRequest, fromDateBegingetAdminConnectionRequest, toDateBegingetAdminConnectionRequest,
    fromDateEndgetAdminConnectionRequest, toDateEndgetAdminConnectionRequest, statusgetAdminConnectionRequest, sortBygetAdminConnectionRequest){
    const headers={

    }
    const body={
        organizationId:organizationIdgetAdminConnectionRequest,
        registrationNumber:registrationNumbergetAdminConnectionRequest,
        fromDateBegin:fromDateBegingetAdminConnectionRequest,
        toDateBegin:toDateBegingetAdminConnectionRequest,
        fromDateEnd:fromDateEndgetAdminConnectionRequest,
        toDateEnd:toDateEndgetAdminConnectionRequest,
        status:statusgetAdminConnectionRequest,
        sortBy:sortBygetAdminConnectionRequest
    }

    axios.get(`${api}/api/aggregator/connectionRequest`,headers, body)
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

export function putAdminConnectionRequest(idputAdminConnectionRequest, statusputAdminConnectionRequest){
    const headers={

    }
    const body={
        id:idputAdminConnectionRequest,
        status:statusputAdminConnectionRequest
    }
    axios.put(`${api}/api/aggregator/connectionRequest`,body,headers)
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