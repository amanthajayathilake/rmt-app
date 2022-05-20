import axios from './axiosConfig';

export const createSubmissionType = (payload) => axios.post('/submissiontypes', payload);
export const fetchSubmissionTypes = (filter) => axios.get(`/submissiontypes${filter}`);
export const updateSubmissionType = (queryParams, payload) => axios.put(`/submissiontypes?${queryParams}`, payload);
export const deleteSubmissionType = (queryParams) => axios.delete(`/submissiontypes?${queryParams}`);