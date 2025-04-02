import axios from "axios"

const api = process.env.API

export function getOneOrganization(){
    const headers={

    }
    axios.get(`${api}/api/organization/get_organization`,headers)
    .then(()=>{

    })
    .catch(()=>{
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
    .catch(()=>{
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
    .catch(()=>{
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
    addInfoupdateOrganization, subjectNameupdateOrganization, cityNameupdateOrganization, streetNameupdateOrganization, houseNumberupdateOrganization, addInfoupdateOrganization, 
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
    .catch(()=>{
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
    .catch(()=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}

