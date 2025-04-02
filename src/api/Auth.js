import axios from "axios";
import { globalAPI } from "./config.js";

const api = globalAPI;
console.log(api); // "http://localhost:8080"
//const api = "http://217.107.34.217:9919";
export function registercustomer(surname,name,patronic,phone,addInfo,email){
    console.log(email)
    const body={
            surname:surname,
            name:name,
            patronymic:patronic,
            phoneNumber:phone,
            addInfo:addInfo,
            email:email
    }
    const headers={

    }
    return  axios.post(`${api}/auth/sign_up/customer`,body,headers)
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
        if(error.status == 409){
            alert("Пользователь зарегистрирован")
        }
        console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.log(`Ошибка: ${error.response.data.message}`);
        } else {
            console.log('Произошла ошибка при подключении к серверу.');
        }
    })
}

export function registerorg(fullNameregisterorg, shortNameregisterorg, innregisterorg, kppregisterorg, ogrnregisterorg, responsiblePersonSurnameregisterorg, responsiblePersonNameregisterorg, responsiblePersonPatronymicregisterorg, responsiblePersonEmailregisterorg, responsiblePersonPhoneNumberregisterorg, addInforegisterorg,
    subjectNameregisterorg, cityNameregisterorg, streetNameregisterorg, houseNumberregisterorg, addInfoadressregisterorg, addressTyperegisterorg, emailregisterorg){
    const body={
    fullName:fullNameregisterorg,
    shortName:shortNameregisterorg,
    inn:innregisterorg,
    kpp:kppregisterorg,
    ogrn:ogrnregisterorg,
    responsiblePersonSurname:responsiblePersonSurnameregisterorg,
    responsiblePersonName:responsiblePersonNameregisterorg,
    responsiblePersonPatronymic:responsiblePersonPatronymicregisterorg,
    responsiblePersonEmail:responsiblePersonEmailregisterorg,
    responsiblePersonPhoneNumber:responsiblePersonPhoneNumberregisterorg,
    addInfo:addInforegisterorg,
    address: {
    subjectName:subjectNameregisterorg,
    cityName:cityNameregisterorg,
    streetName:streetNameregisterorg,
    houseNumber:houseNumberregisterorg,
    addInfo:addInfoadressregisterorg,
    addressType:addressTyperegisterorg
    },
    email:emailregisterorg
    }
    const headers={

    }
    axios.post(`${api}/auth/sign_up/organization`,body,headers)
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

export function registeradmin(surnameregisteradmin, nameregisteradmin, patronymicregisteradmin, departmentregisteradmin, positionregisteradmin, phoneNumberregisteradmin, 
    addInforegisteradmin, emailregisteradmin, passwordregisteradmin){
    const body={
    surname:surnameregisteradmin,
    name:nameregisteradmin,
    patronymic:patronymicregisteradmin,
    department:departmentregisteradmin,
    position:positionregisteradmin,
    phoneNumber:phoneNumberregisteradmin,
    addInfo:addInforegisteradmin,
    email:emailregisteradmin,
    password:passwordregisteradmin
    }
    const headers={

    }
    axios.post(`${api}/auth/sign_up/admin`,body,headers)
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

export function sendcode(email) {
    const headers ={

        "Content-Type": "application/json"
    }
    return axios.post(`${api}/auth/sign_in/send_code?email=${email}`,
        {}, 
        {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                console.log('Код успешно отправлен');
                console.log(res)
                return true; // Успешная отправка
            } else {
                console.error(`Ошибка: сервер вернул статус ${res.status}`);
                return false; // Неуспешный статус
            }
        })
        .catch((error) => {
            console.error('Ошибка при отправке запроса:', error.response ? error.response.data : error.message);
            if (error.response) {
                console.log(`Ошибка: ${error.response.data.message}`);
            } else {
                console.log(error.request);
                console.log('Произошла ошибка при подключении к серверу.');
            }
            return false; // Ошибка запроса
        });
}

export function authcustomer(email,code){
    const body={
        email: email,
        code:code
    }
console.log(body)
    const headers={

    }
    axios.post(`${api}/auth/sign_in/customer`,body,headers)
    .then((res)=>{
        if (res.status == 200) {
            console.log('Код успешно отправлен');
            console.log(res)
            localStorage.setItem("jwt",res.data)
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.data}`;
            return res.data; // Успешная отправка
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

export function authorg(email,code){
    const body={
        email: email,
        code:code
    }
    const headers={

    }
    axios.post(`${api}/auth/sign_in/organization`,body,headers)
    .then((res)=>{
        if (res.status == 200) {
            console.log('Код успешно отправлен');
            console.log(res)
            localStorage.setItem("jwt",res.data)
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.data}`;
            return res.data; // Успешная отправка
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

export function authadmin(emailauthadmin, passwordauthadmin, codeauthadmin){
    const body={
    email:emailauthadmin,
    password:passwordauthadmin,
    code:codeauthadmin
    }
    const headers={

    }
    axios.post(`${api}/auth/sign_in/admin`,body,headers)
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