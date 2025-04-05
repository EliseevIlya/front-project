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

export function getOrganizationServices(){
    const headers={

    }
    
    axios.get(`${api}/api/organization/get_organization_service`,headers)
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

export function updateOrganization(fullNameupdateOrganization, shortNameupdateOrganization, innupdateOrganization, kppupdateOrganization, ogrnupdateOrganization, responsiblePersonSurnameupdateOrganization,
    responsiblePersonNameupdateOrganization, responsiblePersonPatronymicupdateOrganization, responsiblePersonEmailupdateOrganization, responsiblePersonPhoneNumberupdateOrganization,
    addInfoupdateOrganization, subjectNameupdateOrganization, cityNameupdateOrganization, streetNameupdateOrganization, houseNumberupdateOrganization,
    addressTypeupdateOrganization, emailupdateOrganization){
    const body={
        fullName:fullNameupdateOrganization,
        shortName:shortNameupdateOrganization,
        inn:innupdateOrganization,
        kpp:kppupdateOrganization,
        ogrn:ogrnupdateOrganization,
        responsiblePersonSurname:responsiblePersonSurnameupdateOrganization,
        responsiblePersonName:responsiblePersonNameupdateOrganization,
        responsiblePersonPatronymic:responsiblePersonPatronymicupdateOrganization,
        responsiblePersonEmail:responsiblePersonEmailupdateOrganization,
        responsiblePersonPhoneNumber:responsiblePersonPhoneNumberupdateOrganization,
        addInfo:addInfoupdateOrganization,
        address:{
            subjectName:subjectNameupdateOrganization,
            cityName:cityNameupdateOrganization,
            streetName:streetNameupdateOrganization,
            houseNumber:houseNumberupdateOrganization,
            addInfo:addInfoupdateOrganization,
            addressType:addressTypeupdateOrganization
            },
        email:emailupdateOrganization
        }
    const headers={

    }
    axios.put(`${api}/api/organization/update/organization`,body,headers)
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

