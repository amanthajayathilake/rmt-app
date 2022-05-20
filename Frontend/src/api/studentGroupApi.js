import axios from './axiosConfig';

export const registerStudentGroup = (groupObj) => axios.post('/groups', groupObj);
export const fetchAllStudentGroups = () => axios.get('/groups');
export const requestSupervisor = (groupId, supervisorObj) => axios.put(`/groups/${groupId}/supervisors`, supervisorObj);
export const requestCoSupervisor = (groupId, coSupervisorObj) => axios.put(`/groups/${groupId}/cosupervisors`, coSupervisorObj);
export const allocateOrDeallocatePanels = (groupId, panelObj) => axios.put(`/groups/${groupId}/panels`, panelObj);
export const assignMarks = (groupId, markObj) => axios.put(`/groups/${groupId}/evaluations`, markObj);
export const fetchStudentGroup = (queryParams) => axios.get(`/groups/details?${queryParams}`);
export const updateResearchTopicDetails = (groupId, topicObj) => axios.put(`/groups/${groupId}/updateTopic`, topicObj);
export const evaluateStudentGroupByPanel = (groupId, panelObj) => axios.put(`/groups/${groupId}/evaluateStudentGroup`, panelObj);
export const acceptRejectGroup = (groupId, statusObj) => axios.put(`/groups/${groupId}/status`, statusObj);




