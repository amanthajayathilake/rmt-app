import { Container, Grid, Paper,TablePagination,Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ID from "nodejs-unique-numeric-id-generator";
import { findUsers } from '../../api/usersApi';
import { registerStudentGroup } from '../../api/studentGroupApi';
import { getAuth } from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { red } from '@mui/material/colors';

export default function RegisterStudentGroup() {
    let id = getAuth().id;
    const [students, setStudents] = useState([]);
    const [select, setSelect] = useState([]);
    const [selected, setSelected] = useState([
        id
    ]);
    const [page, setPage] = React.useState(0);
    const [pageSelect, setPageSelect] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [rowsPerSelectPage, setRowsPerSelectPage] = React.useState(4);
    const emptyRows = rowsPerSelectPage - Math.min(rowsPerSelectPage, selected.length - pageSelect * rowsPerSelectPage);
    const [sId, setSId] = useState("");
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = useState("");


    useEffect(() =>{
        function getStudents(){
            findUsers(`role=Student`)
            .then((res) =>{
                setStudents(res.data.responseData);
                console.log(res.data)
            }).catch((err)=>{
                console.error(err);
            })
        }
        getStudents()
    },[])


    const stud = (id) =>{
        setSelected(selected => [...selected, id])
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const onSubmit = () =>{
        let groupID = ID.generate(new Date().toJSON())
        const selectObj = {
            id:"G"+ groupID,
            studentsId:selected
        };
        registerStudentGroup(selectObj)
        .then((res)=>{
            console.log(select);
            toast.success('Group Registration Successful!', {
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
            window.location.href = '/studentgroup'
        }).catch((err) =>{
            toast.error('Group Registration Unsuccessful!', {
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
    }

    const handleClickOpen = (studId) => {
        setOpen(true);
        setSId(studId);
        console.log(studId)
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const remove = () =>{
        console.log(sId)
        var sArr = selected
        var toRemove = sId;
        var sIndex = sArr.indexOf(toRemove)
        sArr.splice(sIndex, 1);
        setSelected(sArr)
        setOpen(false)
    }

  return (
    <div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <Container maxWidth={"90%"}>
            <br />
            <Typography variant='h6'>
                <center><b>CREATE STUDENT GROUP</b></center>
            </Typography><br/>
            <Paper elevation={3} style={{padding:20}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                <Typography>
                    <b>SELECTED STUDENT ID's</b>
                </Typography><br/>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell><b>ID</b></TableCell>
                                <TableCell><b>Options</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    selected.map((row) =>(
                                        <TableRow>
                                            <TableCell >{row}</TableCell>
                                            <TableCell >
                                            <IconButton fontSize="small" aria-label="cancel" disabled={row === id}>
                                                <CancelIcon style={{color:red[500]}}onClick={()=> handleClickOpen(row)} />
                                            </IconButton>
                                                
                                            </TableCell>
                                            </TableRow>
                                ))}
                                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                    <DialogTitle id="alert-dialog-title">
                                        REMOVE STUDENT
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                       This window will allow you to remove the selected student from the list! Clicking on "YES" will remove the student!
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose}>NO</Button>
                                    <Button onClick={remove}>
                                        YES
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                                {emptyRows > 0 && <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>}   
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                    <br/>
                    <center>
                        <Button variant='contained' onClick={onSubmit}>Submit Details</Button>
                    </center>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} style={{padding:20}}>
                        <Typography>
                            <center><b>ADD STUDENTS</b></center>
                        </Typography>
                        <Grid>
                        <center>
                            <TextField label="Search" variant="standard"  value={search} onChange={(e)=>{ setSearch(e.target.value)}} />
                                <IconButton fontSize="small" aria-label="cancel" >
                                    <CancelIcon onClick={()=>setSearch(() => "")} />
                                </IconButton>
                        </center><br/>
                            <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                            <Grid>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell >Name</TableCell>
                                            <TableCell >Options</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                students.filter((row)=>{
                                                    if(search === ""){
                                                        return row
                                                    }else if(row.id.toLowerCase().includes(search.toLowerCase())){
                                                        return row
                                                    }
                                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                                    <TableRow>
                                                        <TableCell >{row.id}</TableCell>
                                                        <TableCell >{row.name}</TableCell>
                                                        <TableCell >
                                                            <Button variant="contained" onClick={()=> stud(row.id)} disabled={select.length === 4 || row.id === id}>SELECT</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                ))
                                            }            
                                        </TableBody>
                                        <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[2, 3, 5]}
                                            count={students.length}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                        </TableRow>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            </Paper>
        </Container>
    </div>
  )
}
