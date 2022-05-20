import axios from './axiosConfig';

export const createTemplate = (payload) => axios.post('templates/', payload);
export const fetchTemplates = (filter) => axios.get(`templates/${filter || ''}`);
export const editTemplates = (tempId, payload) => axios.put(`templates?id=${tempId}`, payload);
export const deleteTemplate = (tempId) => axios.delete(`templates?id=${tempId}`);