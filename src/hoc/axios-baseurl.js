import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://usrlogin.local/api'
});

export default instance;