import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Grid, Paper, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { handleToast } from "../../helper/helper";
import Divider from '@mui/material/Divider';

import { findUsers } from "../../api/usersApi";
import { getAuth } from '../../helper/helper.js';
import { fetchStudentGroup, requestCoSupervisor, requestSupervisor } from '../../api/studentGroupApi';
import AddTopic from '../../components/manage-topics/AddTopic';

export default function MyGroup() {
const [expanded, setExpanded] = React.useState(false);
const [supervisors, setSupervisors] = useState([]);
const [supervisorData, setSupervisorData] = useState({});
const [coSupervisorData, setCoSupervisorData] = useState({});
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(2);
const [group, setGroup] = useState({})
const [members, setMembers] = useState([]);
const [evaluations, setEvaluations] = useState([]);
const [search, setSearch] = useState("");
const [researchTopicAddOpen, setResearchTopicAddOpen] = useState(false);

useEffect (() =>{
    groupDetails();
    getMembers();
    getSupervisors();
    getSupervisor();
    getCoSupervisor();
    getEvaluationData()
    console.log(supervisorData)
},[expanded]);

const groupDetails = async() =>{
    let id = getAuth().id;
    console.log(id)
    try{
        const res = await fetchStudentGroup(`studentsId=${id}`);
        setGroup(res.data.responseData[0]);
    }catch(error){
        console.log(error)
    } 
}

const getMembers = async() =>{
    let id = getAuth().id;
    try{
        const res = await fetchStudentGroup(`studentsId=${id}`);
        setMembers(res.data.responseData[0].studentsId);
    }catch(error){
        console.log(error)
    }   
}

const getEvaluationData = async() =>{
    let id = getAuth().id;
    try{
        const res = await fetchStudentGroup(`studentsId=${id}`);
        setEvaluations(res.data.responseData[0].evaluation);
    }catch(error){
        console.log(error)
    }
}

const getSupervisors = async() =>{
    try{
        const res = await findUsers(`role=Supervisor`)
        setSupervisors(res.data.responseData);
    }catch(error) {
        console.log(error)
    }
}

const getSupervisor = async() =>{
    if(group.supervisorId !== "Not Assigned" ){
        console.log(group.supervisorId)
        try{
            const supervisor = await findUsers(`id=${group.supervisorId}`)
            setSupervisorData(supervisor.data.responseData[0])
        }catch(error){
            console.log(error);
        }
    }
}

const getCoSupervisor = async() =>{
    if(group.coSupervisorId !== "Not Assigned" ){
        try{
            const coSupervisor = await findUsers(`id=${group.coSupervisorId}`)
            setCoSupervisorData(coSupervisor.data.responseData[0])
        }catch(error){
            console.log(error);
        }
    }
}

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

const reqSupervisor = (groupId, supervisorId, type) =>{
    if(type === "supervisor"){
        requestSupervisor(groupId, {supervisorId})
        .then((res) =>{
            groupDetails();
            handleToast('Supervisor Request Successful!', 'success');
        }).catch((err) =>{
            handleToast('Supervisor Request UnSuccessful!', 'error');
        })
    }else if(type === "co-supervisor"){
        let coSupervisor = {
            coSupervisorId: supervisorId,
            status:group.status
        }
        requestCoSupervisor(groupId, coSupervisor)
            .then((res) =>{
                groupDetails();
                handleToast('Co-Supervisor Requested!', 'success');
            }).catch((err) =>{
                handleToast('Co-Supervisor Request Unsuccessful!', 'error');
            })
    }
}

const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
};

const setAddTopic = (payload) => {
    setGroup(payload);
    setResearchTopicAddOpen(true);
}

  return (
    <div>
        <br/>
        <Container maxWidth="90%">
            <Paper elevation= {2} style={{padding:10, background:'rgba(255, 255, 255, 0.70)'}}>
                <center>
                <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            <b>
                                {
                                    group?
                                    `GROUP NO : ${group.id}`:
                                    "GROUP NO : Not Assigned"
                                }
                            </b>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} style={{padding:20}} maxWidth={"50%"}>
                            {
                                    group?
                                    <Typography><b>Group Status : </b> {group.status}</Typography>:
                                    <Typography><b>Group Status :</b> Loading Data....</Typography>
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
                </center>
            </Paper><br/>
            <Paper elevation ={2} style={{padding:20, background:'rgba(255, 255, 255, 0.70)'}}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Member Details
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>No of members : {members.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {
                                members.map((row) =>(
                                    <Typography><b>Member ID:</b> {row}</Typography>
                                ))
                            }
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header" >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Research Topic Details</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Topic details
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {group.researchTopic?.topic && group.researchTopic?.area ? 
                                <>
                                    <b>Topic</b> - {group.researchTopic?.topic} <br/>
                                    <b>Area</b> - {group.researchTopic?.area}
                                    <Button onClick={() => setAddTopic(group)} style={{marginLeft:"100px"}}><span>Edit Topic</span></Button>
                                </>
                            :
                                <>
                                    <span style={{fontSize:"11px"}}>Currently there is no requested Topic</span>
                                    <br/>
                                    <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setAddTopic(group)}><span>Add Topic</span></Button>
                                </>
                            }
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header" >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Supervisor Details
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {
                                group?
                                <>
                                {
                                    group.supervisorId === "Not Assigned"?
                                    "Supervisor Status: Not Assigned" :
                                    group.status === "Supervisor Rejected" ?
                                    "Supervisor Status: Rejected":
                                    group.status === "Supervisor Pending" ?
                                    "Supervisor Status: Pending" :
                                    group.status === "Supervisor Accepted" ?
                                    "Supervisor Status: Accepted" :
                                    group.supervisorId !== "Not Assigned"?
                                    "Supervisor Status: Assigned":
                                    <>
                                    </>
                                }
                                </>:
                                <>
                                "Loading Data..."
                                </>                           
                            }
                            
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid>
                            <Paper elevation={3} style={{padding:"20px", maxWidth:"100%"}} sx={{ display: 'grid'}}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={2}>
                                    <Typography><b>Supervisor ID</b></Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography>: {group.supervisorId}</Typography>
                                </Grid>
                                    {
                                        supervisorData?
                                        <>
                                        <Grid item xs={2}>
                                            <Typography><b>Supervisor Name</b></Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography>: {supervisorData.name}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography><b>Interest Area</b></Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography>: {supervisorData.interestArea}</Typography>
                                        </Grid>
                                        </>:
                                        <></>
                                    }
                                </Grid>
                            </Paper>
                        </Grid> <br/>
                        <Grid>
                            <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                                <center><h4>REQUEST SUPERVISOR</h4></center>
                                <center>
                                    <TextField label="Search" variant="standard"  value={search} onChange={(e)=>{ setSearch(e.target.value)}} />
                                    <IconButton fontSize="small" aria-label="cancel" >
                                        <CancelIcon onClick={()=>setSearch(() => "")} />
                                    </IconButton>
                                </center><br/>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell><b>ID</b></TableCell>
                                            <TableCell><b>NAME</b></TableCell>
                                            <TableCell><b>INTERESTED AREA</b></TableCell>
                                            <TableCell><b>OPTIONS</b></TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                supervisors.filter((row)=>{
                                                    if(search === ""){
                                                        return row
                                                    }else if(row.interestArea.toLowerCase().includes(search.toLowerCase())){
                                                        return row
                                                    }
                                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                                    <TableRow>
                                                        <TableCell >{row.id}</TableCell>
                                                        <TableCell >{row.name}</TableCell>
                                                        <TableCell >{row.interestArea}</TableCell>
                                                        <TableCell >
                                                            <Button variant="contained" onClick={()=> reqSupervisor(group.id, row.id, "supervisor")}>Request</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                        <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[2, 3, 5]}
                                            count={supervisors.length}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                        </TableRow>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header"  >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Co Supervisor Details</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {
                                group ?
                                <>
                                    {
                                        group.status === "Supervisor Accepted" && group.coSupervisorId === "Not Assigned" ?
                                        "Status: Eligible":
                                        group.status === "Co-Supervisor Pending" ?
                                        "Co-Supervisor Status: Pending" :
                                        group.status === "Co-Supervisor Accepted" ?
                                        "Co-Supervisor Status: Accepted":
                                        group.status === "Co-Supervisor Rejected" ?
                                        "Co-Supervisor Status: Rejected":
                                        group.coSupervisorId === "Not Assigned" ?
                                        "Co-Supervisor Status: Not Assigned":
                                        <></>
                                    }
                                </>:
                                <>
                                    Loading Data .....
                                </>
                            }
                        
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid>
                            <Paper elevation={3} style={{padding:"20px", maxWidth:"100%"}} sx={{ display: 'grid'}}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={2}>
                                    <Typography><b>Co-Supervisor ID</b></Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography>: {group.coSupervisorId}</Typography>
                                </Grid>
                                    {
                                        coSupervisorData ?
                                        <>
                                        <Grid item xs={2}>
                                            <Typography><b>Co-Supervisor Name</b></Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography>: {coSupervisorData.name}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography><b>Interest Area:</b></Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography>: {coSupervisorData.interestArea}</Typography>
                                        </Grid>
                                        </>:
                                        <></>
                                    }
                                </Grid>
                            </Paper>
                        </Grid> <br/>
                        <Grid item xs={8}>
                            <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                                <center><h4>REQUEST CO-SUPERVISOR</h4></center>
                                <center>
                                <TextField label="Search" variant="standard"  value={search} onChange={(e)=>{ setSearch(e.target.value)}} />
                                    <IconButton fontSize="small" aria-label="cancel" >
                                        <CancelIcon onClick={()=>setSearch(() => "")} />
                                    </IconButton>
                                </center><br/>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell><b>ID</b></TableCell>
                                            <TableCell><b>NAME</b></TableCell>
                                            <TableCell><b>INTERESTED AREA</b></TableCell>
                                            <TableCell><b>OPTIONS</b></TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                supervisors.filter((row)=>{
                                                    if(search === ""){
                                                        return row
                                                    }else if(row.interestArea.toLowerCase().includes(search.toLowerCase())){
                                                        return row
                                                    }
                                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                                    <TableRow>
                                                        <TableCell >{row.id}</TableCell>
                                                        <TableCell >{row.name}</TableCell>
                                                        <TableCell >{row.interestArea}</TableCell>
                                                        
                                                        <TableCell>
                                                            <Button variant='contained'onClick={()=> reqSupervisor(group.id, row.id, "co-supervisor")}>
                                                                Request
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                ))
                                            }
                                        </TableBody>
                                        <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[2, 3, 5]}
                                            count={supervisors.length}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                        </TableRow>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header"  >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Evaluation Details</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Evaluation Status: 
                            {
                                evaluations.length !== 0 ?
                                " Evaluation Data Available!" :
                                " Evaluation Data Unavailable!"
                            }
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={8}>
                            <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                            <Grid>
                                <Paper elevation={3} style={{padding:"20px", maxWidth:"100%"}} sx={{ display: 'grid'}}>
                                <center><h4>PANEL DETAILS</h4></center>
                                    <Divider /><br/>
                                        <Typography align='center'><b>Topic Evaluation Panel ID: </b> {group.topicEvaluationPanelId}</Typography>
                                        <Typography align='center'><b>Presentation Evaluation Panel ID: </b> {group.presentationEvaluationPanelId}</Typography>
                                        <Typography align='center'><b>Panel Evaluate Feedback: </b> {group.panelEvaluateFeedbacks}</Typography>                                   
                                </Paper>
                            </Grid> <br/>
                                <center><h4>EVALUATION DETAILS</h4></center>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell><b>ID</b></TableCell>
                                            <TableCell><b>EVALUATION TYPE</b></TableCell>
                                            <TableCell><b>MARKS</b></TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                evaluations.map((row) =>(
                                                    <TableRow>
                                                        <TableCell >{row.id}</TableCell>
                                                        <TableCell >{row.evaluationType}</TableCell>
                                                        <TableCell >{row.marks}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Paper>
            {researchTopicAddOpen && group &&
                <AddTopic
                    group={group}
                    setResearchTopicAddOpen={setResearchTopicAddOpen}
                    groupDetails={groupDetails}
                />
            }
        </Container>
    </div>
  )
}
