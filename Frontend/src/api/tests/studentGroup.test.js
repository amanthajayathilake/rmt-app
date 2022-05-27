import { allocateOrDeallocatePanels, assignMarks, fetchStudentGroup, registerStudentGroup, requestSupervisor } from '../studentGroupApi';
import axios from 'axios';

jest.mock('axios');

//Test Registering a student group
test("Register Student Group", async () =>{
    const request = {
        studentsId:["IT20020266", "IT20020267"]
    }

    const response ={
        id: "G0001",
        studentsId: [
            "IT20020262",
            "IT20020263"
        ],
        supervisorId: "Not Assigned",
        coSupervisorId: "Not Assigned",
        topicEvaluationPanelId: "Not Assigned",
        presentationEvaluationPanelId: "Not Assigned",
        status: "Topic Not Registered",
        panelEvaluateFeedbacks: "Pending",
        evaluation: []
    }  

    axios.post.mockResolvedValueOnce(response);
    const result = await registerStudentGroup(request);
    expect(result).toEqual(response);
    return result;
})

//Test Fetching one group
test("Fetch a Student Group", async () =>{
    const response ={
        id: "G0001",
        studentsId: [
            "IT20020262",
            "IT20020263"
        ],
        supervisorId: "S0001",
        coSupervisorId: "S0002",
        topicEvaluationPanelId: "P0001",
        presentationEvaluationPanelId: "P0002",
        status: "Finalized Supervisors",
        panelEvaluateFeedbacks: "Pending",
        evaluation: [],
        researchTopic: {
            topic: "Koa JS",
            area: "React JS frontend",
        }
    }  
    axios.get.mockResolvedValueOnce(response);
    const result = await fetchStudentGroup('id=G0001');
    expect(result).toEqual(response);
    return result;
})

//Test requesting a supervisor 
test("Request a supervisor", async () =>{
    const response ={
        supervisorId: "S0001",
        status: "Supervisor Pending"
    }  
    const groupId = 'G0001'
    const request={
        supervisorId:"S0001"
    }
    axios.put.mockResolvedValueOnce(response);
    const result = await requestSupervisor(groupId, request);
    expect(result).toEqual(response);
    return result;
})

//Test requesting a Co-supervisor 
test("Request a co-supervisor", async () =>{
    const response ={
        supervisorId: "S0002",
        status: "Co-Supervisor Pending"
    }  
    const groupId = 'G0001'
    const request={
        cosupervisorId:"S0002"
    }
    axios.put.mockResolvedValueOnce(response);
    const result = await requestSupervisor(groupId, request);
    expect(result).toEqual(response);
    return result;
})

//Test Allocating a panel to a group 
test("Allocate panel to a student group", async () =>{
    const response ={
        topicEvaluationPanelId: "P0001"
    }  
    const groupId = 'G0001'
    const request={
        topicEvaluationPanelId: "P0001"
    }
    axios.put.mockResolvedValueOnce(response);
    const result = await allocateOrDeallocatePanels(groupId, request);
    expect(result).toEqual(response);
    return result;
})

//Test Assigning marks to a group 
test("Assign marks to a student group", async () =>{
    const response ={
        id: "S0001",
        evaluationType:"Presentation",
        marks:"80"
    }  
    const groupId = 'G0001'
    const request={
        evaluationType:"Presentation",
        marks:"80"
    }
    axios.put.mockResolvedValueOnce(response);
    const result = await assignMarks(groupId, request);
    expect(result).toEqual(response);
    return result;
})
