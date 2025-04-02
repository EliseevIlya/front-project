import axios from "axios";


const api = "http://localhost:8080";
//const api = "http://217.107.34.217:9919";

export function registercustomer(surnameregistercustomer,nameregistercustomer, patronymicregistercustomer, phoneNumberregistercustomer, addInforegistercustomer, emailregistercustomer){
    const body={
    surname:surnameregistercustomer,
    name:nameregistercustomer,
    patronymic:patronymicregistercustomer,
    phoneNumber:phoneNumberregistercustomer,
    addInfo:addInforegistercustomer,
    email:emailregistercustomer
}
    const headers={

    }
    axios.post(`${api}/auth/sign_up/customer`,body,headers)
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
                console.log(res);
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
export function authcustomer(emailauthcustomer, codeauthcustomer){
    const body={
    email:emailauthcustomer,
    code:codeauthcustomer
}
console.log(body)
    const headers={

    }
    axios.post(`${api}/auth/sign_in/customer`,body,headers)
    .then((response)=>{
        const token = response.data; // или response.data.accessToken, зависит от сервера
        localStorage.setItem('jwtToken', token);
        console.log(data);
        return response.data; // Возвращаем данные для дальнейшей обработки
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

export function authorg(emailauthorg, codeauthorg){
    const body={
    email:emailauthorg,
    code:codeauthorg
    }
    const headers={

    }
    axios.post(`${api}/auth/sign_in/organization`,body,headers)
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