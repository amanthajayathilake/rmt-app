import axios from './axiosConfig';

export const fetchPanel = (queryParams) => axios.get(`/panels/details?${queryParams}`);
export const fetchAllPanels = () => axios.get(`/panels`);
export const addStudentGroups = (id, groupObj) => axios.put(`/panels/${id}/groups`, groupObj);

export const createPanel = (payload) => axios.post('/panels', payload);
export const updatePanel = (id, payload) => axios.put(`/panels/${id}`, payload);
export const deletePanel = (id) => axios.delete(`/panels/${id}`);