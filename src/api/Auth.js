import axios from "axios";

const api = "http://localhost:8581";

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
    axios.post(`${api}/auth/sign_up/customer`,body,headers)
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
export function registerorg(){
    const body={

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
export function registeradmin(){
    const body={

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
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials':true
    }
    console.log(headers)
    return axios.post(`${api}/auth/sign_in/send_code?email=${email}`,
        {}, // Пустой объект в body, если сервер требует тело запроса
        {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true // Если сервер требует куки
        })
        .then((res) => {
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

export function authadmin(){
    const body={

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