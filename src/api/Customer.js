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