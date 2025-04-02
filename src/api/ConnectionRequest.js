import axios from "axios"

const api = process.env.API

export function deleteConnectionRequest(){
    const headers={

    }
    axios.delete(`${api}/api/connection_request/delete`,headers)
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

export function getConnectionRequest(organizationIddeleteConnectionRequest, registrationNumberdeleteConnectionRequest, fromDateBegindeleteConnectionRequest, toDateBegindeleteConnectionRequest,
    fromDateEnddeleteConnectionRequest, toDateEnddeleteConnectionRequest, statusdeleteConnectionRequest, sortBydeleteConnectionRequest){
    const headers={

    }
    const body={
        organizationId:organizationIddeleteConnectionRequest,
        registrationNumber:registrationNumberdeleteConnectionRequest,
        fromDateBegin:fromDateBegindeleteConnectionRequest,
        toDateBegin:toDateBegindeleteConnectionRequest,
        fromDateEnd:fromDateEnddeleteConnectionRequest,
        toDateEnd:toDateEnddeleteConnectionRequest,
        status:statusdeleteConnectionRequest,
        sortBy:sortBydeleteConnectionRequest
    }
    axios.get(`${api}/api/connection_request/by_status`,headers, body)
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