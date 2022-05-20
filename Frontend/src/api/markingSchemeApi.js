import axios from './axiosConfig';

export const createMarkingScheme = (payload) => axios.post('/markingSchemes', payload);
export const fetchMarkingSchemes = () => axios.get('/markingSchemes');