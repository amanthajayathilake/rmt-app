import axios from './axiosConfig';

export const fetchChatGroup = (queryParams) => axios.get(`/chats?${queryParams}`);
export const fetchAllChatGroups = () => axios.get(`/chats/`);
export const createChatGroup = (payload) => axios.post('/chats', payload);
export const updateChatGroup = (id, payload) => axios.put(`/chats/${id}`, payload);
export const deleteChatGroup = (id) => axios.delete(`/chats/${id}`);
export const sendMessage = (groupId, msgObj) => axios.put(`/chats/${groupId}/sendMessage`, msgObj);