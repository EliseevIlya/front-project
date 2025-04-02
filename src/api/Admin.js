import axios from "axios"

const api = process.env.API

export function deleteAdminCustomer(surnamedeleteAdminCustomer, namedeleteAdminCustomer, patronymicdeleteAdminCustomer, phoneNumberdeleteAdminCustomer, emaildeleteAdminCustomer){
    const headers={

    }
    const body={
        surname:surnamedeleteAdminCustomer,
        name:namedeleteAdminCustomer,
        patronymic:patronymicdeleteAdminCustomer,
        phoneNumber:phoneNumberdeleteAdminCustomer,
        email:emaildeleteAdminCustomer
    }
    axios.delete(`${api}/api/aggregator/customers`,body,headers)
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

export function getAdminCustomer(){
    const headers={

    }
    axios.get(`${api}/api/aggregator/customers`,headers)
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

export function deleteAdminOrg(){
    const headers={

    }
    axios.delete(`${api}/api/aggregator/organization`,headers)
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
export function getAdminOrg(fullNamedeleteAdminOrg, shortNamedeleteAdminOrg, inndeleteAdminOrg, kppdeleteAdminOrg, ogrndeleteAdminOrg, responsiblePersonSurnamedeleteAdminOrg, 
    responsiblePersonNamedeleteAdminOrg, responsiblePersonPatronymicdeleteAdminOrg, responsiblePersonEmaildeleteAdminOrg, responsiblePersonPhoneNumberdeleteAdminOrg, typeOfServiceIddeleteAdminOrg){
    const headers={

    }
    const body={
        fullName:fullNamedeleteAdminOrg,
        shortName:shortNamedeleteAdminOrg,
        inn:inndeleteAdminOrg,
        kpp:kppdeleteAdminOrg,
        ogrn:ogrndeleteAdminOrg,
        responsiblePersonSurname:responsiblePersonSurnamedeleteAdminOrg,
        responsiblePersonName:responsiblePersonNamedeleteAdminOrg,
        responsiblePersonPatronymic:responsiblePersonPatronymicdeleteAdminOrg,
        responsiblePersonEmail:responsiblePersonEmaildeleteAdminOrg,
        responsiblePersonPhoneNumber:responsiblePersonPhoneNumberdeleteAdminOrg,
        typeOfServiceId:typeOfServiceIddeleteAdminOrg
    }
    axios.get(`${api}/api/aggregator/organization`,headers, body)
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

export function deleteAdminAgregator(){
    const headers={

    }
    axios.delete(`${api}/api/aggregator/aggreagator`,headers)
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

export function getAdminAgregator(){
    const headers={

    }
    axios.get(`${api}/api/aggregator/aggreagator`,headers)
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

export function putAdminAgregator(emailputAdminAgregator, surnameputAdminAgregator, nameputAdminAgregator, patronymicputAdminAgregator, departmentputAdminAgregator, positionputAdminAgregator,
    phoneNumberputAdminAgregator, addInfoputAdminAgregator,  jwtTokenputAdminAgregator){
    const headers={

    }
    const body={
        email:emailputAdminAgregator,
        surname:surnameputAdminAgregator,
        name:nameputAdminAgregator,
        patronymic:patronymicputAdminAgregator,
        department:departmentputAdminAgregator,
        position:positionputAdminAgregator,
        phoneNumber:phoneNumberputAdminAgregator,
        addInfo:addInfoputAdminAgregator,
        jwtToken:jwtTokenputAdminAgregator
    }
    axios.put(`${api}/api/aggregator/aggreagator`,body,headers)
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
    .catch(()=>{
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
    .catch(()=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}