import axios from "axios"
import { globalAPI } from "./config.js";

const api = globalAPI;

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

export function getConnectionRequest(data){
    const jwt = localStorage.getItem('jwt')
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    const body={
        organizationId:data?.organizationId ?? null,
        registrationNumber:data?.registrationNumber ?? null ,
        fromDateBegin:data?.fromDateBegin ?? null,
        toDateBegin:data?.toDateBegin ?? null,
        fromDateEnd:data?.fromDateEnd ?? null,
        toDateEnd:data?.toDateEnd ?? null,
        status:data?.status ?? null,
        page: data?.page ?? 0,
        size: data?.size ?? 10,
        sortBy:data?.sortBy ?? null

    }
    return  axios.post(`${api}/api/connection_request/by_status`,body,{headers:headers} )
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