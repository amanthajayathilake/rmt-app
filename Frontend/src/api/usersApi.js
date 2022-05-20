import axios from './axiosConfig';

export const registerUser = (userObj) => axios.post('/signup', userObj);
export const findUsers = (queryParams) => axios.get(`/users?${queryParams}`);
export const updateUser = (userId, userObj) => axios.put(`/users?id=${userId}`, userObj);
export const deleteUser = (userId) => axios.delete(`/users?id=${userId}`);
export function sum(a, b) {
    return a + b;
  }
