import { Button, Container, Grid, Paper, Typography, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { allocateOrDeallocatePanels, fetchAllStudentGroups } from '../../api/studentGroupApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
import { handleToast } from "../../helper/helper";

export default function AllocatePanels() {
    const [groupData, setGroupData] = useState([]);
    const [groupId, setGroupId] = useState("");
    const [open, setOpen] = React.useState(false);
    const [panelData, setPanelData] = useState([]);
    const [panelType, setPanelType] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [mainPage, setMainPage] = useState(0)
    const [rowsPerMainPage, setRowsPerMainPage] = useState(10)

    useEffect(() =>{
        getGroups()
        getPanels()
    },[open])

    const getGroups = () =>{
        fetchAllStudentGroups()
        .then((res) =>{
            setGroupData(res.data.responseData)
        }).catch((err) =>{
            console.error(err);
        })
    }

    const getPanels = () =>{
        fetchAllPanels()
        .then((res) =>{
            setPanelData(res.data.responseData);
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
                    handleToast('Topic Evaluation Panel Allocation Successful!', 'success');
                }).catch((err) =>{
                    handleToast('Topic Evaluation Panel Allocation Unsuccessful!', 'error');
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
                    handleToast('Presentation Evaluation Panel Allocation Successful!', 'success');
                }).catch((err) =>{
                    handleToast('Presentation Evaluation Panel Allocation Unsuccessful!', 'error');
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
                    handleToast('Topic Evaluation Panel De-Allocation Successful!', 'success');
                }).catch((err) =>{
                    handleToast('Topic Evaluation Panel De-Allocation Unsuccessful!', 'error');
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
                    handleToast('Presentation Evaluation Panel De-allocation Successful!', 'success');
                }).catch((err) =>{
                    handleToast('Presentation Evaluation Panel De-Allocation Unsuccessful!', 'error');
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

    const handleChangeMainPage = (event, newPage) => {
        setMainPage(newPage);
    };
    
    const handleChangeRowsPerMainPage = (event) => {
        setRowsPerMainPage(parseInt(event.target.value, 10));
        setMainPage(0);
    };
  return (
    <div>
        <Container maxWidth={"90%"}><br/>
            <Paper elevation={3} style={{padding:20, backgroundColor:'rgba(255,255,255, 0.70)'}}>
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
                                    <TableCell><b>GROUP ID</b></TableCell>
                                    <TableCell><b>STATUS</b></TableCell>
                                    <TableCell><b>TE PANEL</b></TableCell>
                                    <TableCell><b>PE PANEL</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    groupData.slice(mainPage * rowsPerMainPage, mainPage * rowsPerMainPage + rowsPerMainPage).map((row) =>(
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
                                            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
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
                                                                        <TableCell><b>PANEL ID</b></TableCell>
                                                                        <TableCell ><b>NO OF MEMBERS</b></TableCell>
                                                                        <TableCell ><b>NO OF GROUPS</b></TableCell>
                                                                        <TableCell ><b>OPTIONS</b></TableCell>
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
                                                                        rowsPerPageOptions={[4, 10, 15]}
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
                            <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 15, 20]}
                                count={groupData.length}
                                page={mainPage}
                                onPageChange={handleChangeMainPage}
                                rowsPerPage={rowsPerMainPage}
                                onRowsPerPageChange={handleChangeRowsPerMainPage}
                            />
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Paper>
            </Paper>
        </Container>
    </div>
  )
}
