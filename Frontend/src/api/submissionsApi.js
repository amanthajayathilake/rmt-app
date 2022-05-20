import axios from './axiosConfig';

export const createSubmission = (queryParams, payload) => axios.put(`/submissions?${queryParams}`, payload);
export const getSubmission = (key) => axios.get(`/submissions/${key}`);
export const getSubmissionList = (folder) => axios.get(`/submissions?folder=${folder}&type=submissions`);