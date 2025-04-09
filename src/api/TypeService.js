import axios from "axios"
import { globalAPI } from "./config.js";

const api = globalAPI;

export function getTypeService(){
    const jwt = localStorage.getItem('jwt');
    
    const headers={
        Authorization: `Bearer ${jwt}`
    }
    return axios.get(`${api}/api/type_of_service/get`, {headers:headers})
    .then((res)=>{
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