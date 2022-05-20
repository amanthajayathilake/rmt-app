import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { allocateOrDeallocatePanels, fetchAllStudentGroups } from '../../api/studentGroupApi';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { red, yellow } from '@mui/material/colors';
import { fetchAllPanels, addStudentGroups } from '../../api/panelApi';
import toast, { Toaster } from 'react-hot-toast';

export default function AllocatePanels() {
    const [groupData, setGroupData] = useState([]);
    const [groupId, setGroupId] = useState("");
    const [open, setOpen] = React.useState(false);
    const [panelData, setPanelData] = useState([]);
    const [panelType, setPanelType] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

    useEffect(() =>{
        getGroups()
        getPanels()
    },[open])

    const getGroups = () =>{
        fetchAllStudentGroups()
        .then((res) =>{
            setGroupData(res.data.responseData)
            console.log(res.data.responseData)
        }).catch((err) =>{
            console.error(err);
        })
    }

    const getPanels = () =>{
        fetchAllPanels()
        .then((res) =>{
            setPanelData(res.data.responseData);
            console.log(res.data.responseData)
        }).catch((err) =>{
            console.error(err);
        })
    }

    const addPanel = (id, type) =>{
        switch(type){
            case 'TEPanel':{
                let panelObj = {
                    topicEvaluationPanelId:id
                }
                let groupObj = {
                    action:"ALLOCATE",
                    allocatedGroups:groupId
                }
                allocateOrDeallocatePanels(groupId, panelObj)
                .then((res) =>{
                    console.log(res.data)
                    toast.success('Topic Evaluation Panel Allocation Successful!', {
                        position: "top-right",
                        style: {
                          border: '1px solid #713200',
                          padding: '16px',
                          color: 'white',
                          background: '#4BB543'
                        },
                        iconTheme: {
                          primary: 'green',
                          secondary: '#FFFAEE',
                        },
                    });
                }).catch((err) =>{
                    toast.error('Topic Evaluation Panel Allocation Unsuccessful!', {
                        position: "top-right",
                        style: {
                          padding: '16px',
                          color: 'white',
                          background: '#FF0000'
                        },
                        iconTheme: {
                          primary: 'red',
                          secondary: '#FFFAEE',
                        },
                    });
                    console.error(err);
                })
                addStudentGroups(id, groupObj)
                .then((res) =>{
                    console.log(res.data)
                }).catch((err) =>{
                    console.error(err);
                })
                setOpen(false);
                break;
            }
            case 'PEPanel':{
                let panelObj = {
                    presentationEvaluationPanelId:id
                }
                let groupObj = {
                    action:"ALLOCATE",
                    allocatedGroups:groupId
                }
                allocateOrDeallocatePanels(groupId, panelObj)
                .then((res) =>{
                    toast.success('Presentation Evaluation Panel Allocation Successful!', {
                        position: "top-right",
                        style: {
                          border: '1px solid #713200',
                          padding: '16px',
                          color: 'white',
                          background: '#4BB543'
                        },
                        iconTheme: {
                          primary: 'green',
                          secondary: '#FFFAEE',
                        },
                    });
                    console.log(res.data)
                }).catch((err) =>{
                    toast.error('Presentation Evaluation Panel Allocation Unsuccessful!', {
                        position: "top-right",
                        style: {
                          padding: '16px',
                          color: 'white',
                          background: '#FF0000'
                        },
                        iconTheme: {
                          primary: 'red',
                          secondary: '#FFFAEE',
                        },
                    });
                    console.error(err);
                })
                addStudentGroups(id, groupObj)
                .then((res) =>{
                    console.log(res.data)
                }).catch((err) =>{
                    console.error(err);
                })
                setOpen(false);
                break;
            }
            case 'DELETE-TEPanel':{
                let panelObj = {
                    topicEvaluationPanelId:"Not Assigned"
                }
                let groupObj = {
                    action:"DEALLOCATE",
                    allocatedGroups:groupId
                }
                allocateOrDeallocatePanels(groupId, panelObj)
                .then((res) =>{
                    toast.success('Topic Evaluation Panel De-Allocation Successful!', {
                        position: "top-right",
                        style: {
                          border: '1px solid #713200',
                          padding: '16px',
                          color: 'white',
                          background: '#4BB543'
                        },
                        iconTheme: {
                          primary: 'green',
                          secondary: '#FFFAEE',
                        },
                    });
                    console.log(res.data)
                }).catch((err) =>{
                    toast.error('Topic Evaluation Panel De-Allocation Unsuccessful!', {
                        position: "top-right",
                        style: {
                          padding: '16px',
                          color: 'white',
                          background: '#FF0000'
                        },
                        iconTheme: {
                          primary: 'red',
                          secondary: '#FFFAEE',
                        },
                    });
                    console.error(err);
                })
                addStudentGroups(groupId, groupObj)
                .then((res) =>{
                    console.log(res.data)
                }).catch((err) =>{
                    console.error(err);
                })
                setOpen(false);
                break;
            }
            case 'DELETE-PEPanel':{
                let panelObj = {
                    presentationEvaluationPanelId:"Not Assigned"
                }
                let groupObj = {
                    action:"DEALLOCATE",
                    allocatedGroups:groupId
                }
                allocateOrDeallocatePanels(groupId, panelObj)
                .then((res) =>{
                    toast.success('Topic Evaluation Panel De-allocation Successful!', {
                        position: "top-right",
                        style: {
                          border: '1px solid #713200',
                          padding: '16px',
                          color: 'white',
                          background: '#4BB543'
                        },
                        iconTheme: {
                          primary: 'green',
                          secondary: '#FFFAEE',
                        },
                    });
                    console.log(res.data)
                }).catch((err) =>{
                    toast.error('Presentation Evaluation Panel De-Allocation Unsuccessful!', {
                        position: "top-right",
                        style: {
                          padding: '16px',
                          color: 'white',
                          background: '#FF0000'
                        },
                        iconTheme: {
                          primary: 'red',
                          secondary: '#FFFAEE',
                        },
                    });
                    console.error(err);
                })
                addStudentGroups(groupId, groupObj)
                .then((res) =>{
                    console.log(res.data)
                }).catch((err) =>{
                    console.error(err);
                })
                setOpen(false);
                break;
            }
            default: {}
        }
    }

    const handleClickOpen = (id, type) => {
        setOpen(true);
        setGroupId(id);
        setPanelType(type);
        console.log(id)
    };
    
    const handleClose = () => {
        setOpen(false);
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
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <Container maxWidth={"90%"}><br/>
            <Paper elevation={3} style={{padding:20}}>
                <Typography variant='h6'>
                  <center><b>PANEL ALLOCATION</b></center>
                </Typography><br/>
                <Paper elevation={3} style={{padding:20}}>
                    <Typography>
                    <b>STUDENT GROUPS</b>
                    </Typography><br/>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth:200}} aria-lable="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Group ID</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                    <TableCell><b>TE Panel</b></TableCell>
                                    <TableCell><b>PE Panel</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    groupData.map((row) =>(
                                        <TableRow>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell>
                                                <Grid container rowSpacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align='left'>
                                                            {row.topicEvaluationPanelId}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align='left'>
                                                            <IconButton fontSize="small" aria-label="search" >
                                                                {
                                                                    row.topicEvaluationPanelId !== "Not Assigned" ?
                                                                    <CancelIcon sx={{ color: red[500] }} onClick={()=> handleClickOpen(row.id, "DELETE-TEPanel")}/> :
                                                                    <AddCircleIcon sx={{ color: yellow[500] }} onClick={()=> handleClickOpen(row.id, "TEPanel")}/>
                                                                }
                                                            </IconButton>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>
                                                <Grid container rowSpacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align='left'>
                                                            {row.presentationEvaluationPanelId}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align='left'>
                                                            <IconButton fontSize="small" aria-label="search" >
                                                                {
                                                                    row.presentationEvaluationPanelId !== "Not Assigned" ?
                                                                    <CancelIcon sx={{ color: red[500] }} onClick={()=> handleClickOpen(row.id, "DELETE-PEPanel")}/> :
                                                                    <AddCircleIcon sx={{ color: yellow[500] }} onClick={()=> handleClickOpen(row.id, "PEPanel")}/>
                                                                }
                                                            </IconButton>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <Dialog open={open} onClose={handleClose}>
                                                {
                                                    panelType !== "DELETE-TEPanel" && panelType !== "DELETE-PEPanel" ?
                                                    <>
                                                        {
                                                            panelType === "TEPanel"?
                                                                <DialogTitle><b>ASSIGN TOPIC EVALUATION PANEL</b></DialogTitle>:
                                                                <DialogTitle><b>ASSIGN PRESENTATION EVALUATION PANEL</b></DialogTitle>
                                                        }
                                                        <DialogContent>
                                                        <DialogContentText>
                                                            This window will allow you to assign a panel to the selected Student Group!
                                                        </DialogContentText>
                                                        <Typography><br/>
                                                        <center><b>PANELS</b></center>
                                                        </Typography><br/>
                                                        <Paper elevation={3} style={{padding:20}}>
                                                        <TableContainer component={Paper}>
                                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Panel ID</TableCell>
                                                                    <TableCell >No of Members</TableCell>
                                                                    <TableCell >No of Groups</TableCell>
                                                                    <TableCell >Options</TableCell>
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {
                                                                    panelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                                                            <TableRow>
                                                                                <TableCell >{row.id}</TableCell>
                                                                                <TableCell >{row.panelMembers.length}</TableCell>
                                                                                <TableCell >{row.allocatedGroups.length}</TableCell>
                                                                                <TableCell >
                                                                                    <Button variant="contained" onClick={()=> addPanel(row.id, panelType)}>Select</Button>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))
                                                                    }
                                                                </TableBody>
                                                                <TableRow>
                                                                <TablePagination
                                                                    rowsPerPageOptions={[2, 3, 5]}
                                                                    count={panelData.length}
                                                                    page={page}
                                                                    onPageChange={handleChangePage}
                                                                    rowsPerPage={rowsPerPage}
                                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                                />
                                                                </TableRow>
                                                            </Table>
                                                        </TableContainer>
                                                        </Paper>
                                                        </DialogContent>
                                                        <DialogActions>
                                                        <Button onClick={handleClose}>CLOSE</Button>
                                                        </DialogActions>
                                                    </>:
                                                    panelType === "DELETE-TEPanel" ?
                                                    <>
                                                        <DialogTitle id="alert-dialog-title">
                                                        Deallocate Topic Evaluation Panel
                                                        </DialogTitle>
                                                        <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Are you sure that you want to deallocate this panel from the selected Student Group? Clicking on
                                                            "YES" will deallocate the Panel from the Student Group!
                                                        </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                        <Button onClick={handleClose}>NO</Button>
                                                        <Button onClick={()=> addPanel("Not Assigned", panelType)} autoFocus>
                                                            YES
                                                        </Button>
                                                        </DialogActions>
                                                    </>:
                                                    panelType ==="DELETE-PEPanel" ?
                                                    <>
                                                        <DialogTitle id="alert-dialog-title">
                                                        Deallocate Presentation Evaluation Panel
                                                        </DialogTitle>
                                                        <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Are you sure that you want to deallocate this panel from the selected Student Group? Clicking on
                                                            "YES" will deallocate the Panel from the Student Group!
                                                        </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                        <Button onClick={handleClose}>NO</Button>
                                                        <Button onClick={()=> addPanel("Not Assigned", panelType)} autoFocus>
                                                            YES
                                                        </Button>
                                                        </DialogActions>
                                                    </>:
                                                    <>
                                                    </>
                                                }
                                            </Dialog>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Paper>
        </Container>
    </div>
  )
}
