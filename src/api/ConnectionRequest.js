import axios from "axios"

const api = process.env.API

export function deleteConnectionRequest(){
    const body={

    }
    const headers={

    }
    axios.delete(`${api}/api/connection_request/delete`,body,headers)
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

export function getConnectionRequest(){
    const headers={

    }
    axios.get(`${api}/api/connection_request/by_status`,headers)
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