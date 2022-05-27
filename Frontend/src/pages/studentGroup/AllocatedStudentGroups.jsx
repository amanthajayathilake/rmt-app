import { Button, Container, Divider, Grid, Paper, TablePagination, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { assignMarks, evaluateStudentGroupByPanel, fetchStudentGroup } from '../../api/studentGroupApi';
import { fetchPanel } from '../../api/panelApi';
import { getAuth } from '../../helper/helper';
import { AssignMarksForm } from '../../components/Form/AssignMarksForm';
import ID from "nodejs-unique-numeric-id-generator";
import { handleToast } from "../../helper/helper";
import { TopicFeedbackForm } from './ProvideTopicFeedback';

export default function AllocatedStudentGroups() {
  let id = getAuth().id;
  const [expanded, setExpanded] = React.useState(false);
  const [groupDataT, setGroupDataT] = useState([]);
  const [groupDataP, setGroupDataP] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [panelId, setPanelId] = useState(null);
  const [evaluation, setEvaluation] = useState([])
  const [group, setGroup] = useState("")
  const [evaluationData, setEvaluationData] = useState("");
  const [topicEvData, setTopicEvData] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [topicData, setTopicData] = useState({})
  const [editOpen, setEditOpen] = useState(false);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, evaluation.length - page * rowsPerPage);

  let groupData = [...groupDataT, ...groupDataP]
  const [open, setOpen] = React.useState(false);

  useEffect(() =>{
    function getId(){
      fetchPanel(`panelMembers=${id}`)
      .then((res) =>{
        setPanelId(res.data.responseData[0].id);
      }).catch((err) =>{
        console.error(err);
      })
    }
    getId()
    getGroupsT()
    getGroupsP()
  },[panelId])

  const getGroupsT = () => {
    fetchStudentGroup(`topicEvaluationPanelId=${panelId}`)
    .then((res) =>{
      setGroupDataT(res.data.responseData)
    }).catch((err) =>{
      console.error(err);
    })
  }

  const getGroupsP = () => {
    fetchStudentGroup(`presentationEvaluationPanelId=${panelId}`)
    .then((res) =>{
      setGroupDataP(res.data.responseData)
    }).catch((err) =>{
      console.error(err);
    })
  }

  const handleClickOpen = (grpId) => {
    setOpen(true);
    setGroupId(grpId)
    setEvaluationData({
      id:"",
      evaluationType:"",
      marks:""
    })
    fetchStudentGroup(`id=${grpId}`)
    .then((res) =>{
      setGroup(res.data.responseData[0])
      setEvaluation(res.data.responseData[0].evaluation)
    }).catch((err) =>{
      console.err(err);
    })
  };

  const handleClickOpenTopicEvDialog = (grpId) => {
    setEditOpen(true);
    setTopicEvData({
      panelEvaluateFeedbacks:"",
    })
    setGroupId(grpId);
    fetchStudentGroup(`id=${grpId}`)
    .then((res) =>{
      setTopicEvData(res.data.responseData[0].panelEvaluateFeedbacks);
      setGroup(res.data.responseData[0]);
    }).catch((err) =>{
      console.err(err);
    })
  };

  const handleCloseTopicEvDialog = () => {
    setEditOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) =>{
    let evaluationId = ID.generate(new Date().toJSON())
    const evaluationObj = {
        id:"E"+ evaluationId,
        evaluationType:data.evaluationType,
        marks: data.marks
    };
    assignMarks(groupId, evaluationObj)
    .then((res) =>{
      handleToast('Mark Allocation Successful!', 'success');
    }).catch((err) =>{
      handleToast('Mark Allocation Unsuccessful!', 'error');
      console.error(err);
    })
    setOpen(false);
  }

  const handleSubmitTopicFeedback = (data) =>{
    const feedbackObj = {
        panelEvaluateFeedbacks:data.panelEvaluateFeedbacks
    };
    evaluateStudentGroupByPanel(groupId, feedbackObj)
    .then((res) =>{
      handleToast('Feedback Provided!', 'success');
    }).catch((err) =>{
      handleToast('Feedback Provide Unsuccessful!', 'error');
    })
    setEditOpen(false);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    fetchStudentGroup(`id=${panel}`)
    .then((res) =>{
      setTopicData(res.data.responseData[0].researchTopic)
    }).catch((err) =>{
      console.err(err);
    })
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  return (
    <div>
      <br />
      <Container maxWidth={"90%"}>
        <center>
          <Typography variant='h6'>
            <b>ALLOCATED STUDENT GROUPS</b>
          </Typography>
        </center><br/>
        <Paper elevation={3} style={{padding:20}}>
          {
            groupData.map((row) =>(
              <Accordion expanded={expanded === row.id} onChange={handleChange(row.id)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  <b>GROUP ID :</b>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{row.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper elevation={3} style={{padding:20}}>
                  {
                    topicData?
                    <>
                     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={12}>
                        <Typography align='center'><b>DETAILS</b></Typography><br/>
                      </Grid>
                      <Grid item xs>
                        <Typography align='center'><b>Topic: </b> {topicData.topic}</Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem></Divider>
                      <Grid item xs >
                        <Typography align='center'><b>Status: </b> {row.status}</Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem></Divider>
                        <Grid item xs>
                          <Button variant='contained' onClick={()=>handleClickOpen(row.id)}>EVALUATION DETAILS</Button>
                        </Grid>
                      <Divider orientation="vertical" flexItem></Divider>
                        <Grid item xs>
                          <Button variant='contained' onClick={()=>handleClickOpenTopicEvDialog(row.id)}>Topic Evaluation Feedback</Button>
                        </Grid>
                      </Grid><br/>
                    </>:
                    <>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={12}>
                        <Typography align='center'><b>TOPIC DETAILS</b></Typography><br/>
                      </Grid>
                      <Grid item xs>
                        <Typography align='center'><b>Topic: </b> Not Selected</Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem></Divider>
                      <Grid item xs >
                        <Typography align='center'><b>Status: </b> {row.status}</Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem></Divider>
                        <Grid item xs>
                        <Button variant='contained' onClick={()=>handleClickOpen(row.id)}>EVALUATION DETAILS</Button>
                        </Grid>
                      </Grid><br/>
                    </>
                  }
                </Paper>
              <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
                <DialogTitle><b>EVALUATION DETAILS</b></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    This window will allow you to view and asign evaluation details relating to the specific group!
                  </DialogContentText><br/>
                  <Typography><center><b>GROUP ID : {group.id}</b></center></Typography><br/>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={6}>
                        <Paper elevation={3} style={{padding:20}}>
                        <Typography><center>
                          <b>MARKS</b>
                        </center></Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell><b>ID</b></TableCell>
                                    <TableCell><b>NAME</b></TableCell>
                                    <TableCell><b>MARKS</b></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        evaluation.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                            <TableRow>
                                                <TableCell >{row.id}</TableCell>
                                                <TableCell >{row.evaluationType}</TableCell>
                                                <TableCell >{row.marks}</TableCell>
                                                </TableRow>
                                        ))
                                    }        
                                    {emptyRows > 0 && <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>}      
                                </TableBody>
                                <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[2, 3, 5]}
                                    count={evaluation.length}
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
                      <Grid item xs={6}>
                        {
                          evaluationData?(
                            <div>
                              <Container maxWidth="100%">
                                  <AssignMarksForm markObj={evaluationData} onSubmit={onSubmit}/>
                              </Container>
                            </div>
                          ):(
                            <div>
                              Loading....
                            </div>
                          )
                        }
                      </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>CLOSE</Button>
                </DialogActions>
              </Dialog>
              <Dialog open={editOpen} onClose={handleCloseTopicEvDialog} fullWidth={true} maxWidth={"lg"}>
                <DialogTitle><b>Topic Evaluation Feedback</b></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Current Feedback - <b>{group.panelEvaluateFeedbacks}</b>
                  </DialogContentText><br/>
                    <Grid item xs={6}>
                        {
                          topicEvData?(
                            <div>
                              <Container maxWidth="100%">
                                  <TopicFeedbackForm topicObj={topicEvData} onSubmit={handleSubmitTopicFeedback}/>
                              </Container>
                            </div>
                          ):(
                            <div>
                              Loading....
                            </div>
                          )
                        }
                      </Grid>
                  </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseTopicEvDialog}>CLOSE</Button>
                </DialogActions>
              </Dialog>
              </AccordionDetails>
            </Accordion>
            ))
          }
        </Paper>
      </Container>
    </div>
  )
}
