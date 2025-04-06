import axios from "axios"

const api = process.env.API

export function deleteConnectionRequest(){
    const headers={

    }
    axios.delete(`${api}/api/connection_request/delete`,headers)
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

export function getConnectionRequest(data, jwt){
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    const body={
        organizationId:data.organizationId,
        registrationNumber:data.registrationNumber,
        fromDateBegin:data.fromDateBegin,
        toDateBegin:data.toDateBegin,
        fromDateEnd:data,
        toDateEnd:data.toDateEnd,
        status:data.status,
        sortBy:data.sortBy,
    }
    axios.post(`${api}/api/connection_request/by_status`,{headers:headers}, body)
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