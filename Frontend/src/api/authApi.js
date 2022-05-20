import axios from './axiosConfig';

export const login = (authObj) => axios.post('/login', authObj);
