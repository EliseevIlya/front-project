import axios from "axios"
import { globalAPI } from "./config.js";

const api = globalAPI;

export function postServiceDetail(){
    const body={

    }
    const headers={

    }
    axios.post(`${api}/api/service_detail/`,body,headers)
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

export function getServiceDetail(data){
    const jwt = localStorage.getItem('jwt')
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    const body = {
        organizationId: data?.organizationId ?? null,
        typeId: data?.typeId ?? null,
        code: data?.code ?? null,
        name: data?.name ?? null,
        cost: data?.cost ?? null,
        duration: data?.duration ?? null,
        typeName: data?.typeName ?? null,
        typeCode: data?.typeCode ?? null,
        page: data?.page ?? 0,
        size: data?.size ?? 10,
        sortBy: data?.sortBy ?? null
    };
    console.log("DATA",data);
    console.log("BODY",body)

    return axios.post(`${api}/api/service_detail/get_all_services`,body,{headers:headers})
    .then((res)=>{
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

export function putServiceDetail(){
    const body={

    }
    const headers={

    }
    axios.put(`${api}/api/service_detail/`,body,headers)
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

export function deleteServiceDetail(){
    const body={

    }
    const headers={

    }
    axios.delete(`${api}/api/service_detail/`,body,headers)
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