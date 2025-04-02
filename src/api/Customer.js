import axios from "axios"

const api = "http://localhost:8581";

export function getCustomer(jwt){
    const header={
        Authorization: `Bearer ${jwt}`
    }
    axios.get(`${api}/api/customer`,{
        Authorization: `Bearer ${jwt}`
    })
    .then((res)=>{
        console.log(res)
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
    .catch(()=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}

export function getCustomerServiceRequest(organizationIdgetCustomerServiceRequest, startDategetCustomerServiceRequest, fromDateServicegetCustomerServiceRequest, toDateServicegetCustomerServiceRequest){
    const headers={

    }
    const body={
        organizationId:organizationIdgetCustomerServiceRequest,
        startDate:startDategetCustomerServiceRequest,
        fromDateService:fromDateServicegetCustomerServiceRequest,
        toDateService:toDateServicegetCustomerServiceRequest
    }
    axios.get(`${api}/api/customer/service_requests`,headers,body)
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

export function updateCustomer(emailupdateCustomer, surnameupdateCustomer, nameupdateCustomer, patronymicupdateCustomer, phoneNumberupdateCustomer, addInfoupdateCustomer){
    const body={
    email:emailupdateCustomer,
    surname:surnameupdateCustomer,
    name:nameupdateCustomer,
    patronymic:patronymicupdateCustomer,
    phoneNumber:phoneNumberupdateCustomer,
    addInfo:addInfoupdateCustomer
    }
    const headers={

    }
    axios.put(`${api}/api/customer/update`,body,headers)
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
export function deleteCustomer(){
    const headers={

    }
    axios.delete(`${api}/api/organization/`,headers)
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

export function RequestCreateCustomer(organizationIdRequestCreateCustomer, addInfoRequestCreateCustomer, serviceDetailIdsRequestCreateCustomer, dateServiceRequestCreateCustomer){
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
    .catch(()=>{
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}