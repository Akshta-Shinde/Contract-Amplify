import axios from "axios";



const http = axios.create({

    baseURL: process.env.REACT_APP_SR_BASE_URL,

});



export { http };