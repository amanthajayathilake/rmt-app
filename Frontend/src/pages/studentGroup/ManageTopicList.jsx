import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import toast, { Toaster } from 'react-hot-toast';
import Stack from '@mui/material/Stack';
import { getAuth } from '../../helper/helper.js';
import { fetchAllStudentGroups } from '../../api/studentGroupApi';
import EditTopicStatus from '../../components/manage-topics/EditTopicStatus';


export default function ManageTopics() {
    const [groups, setGroups] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [group, setGroup] = useState({});

    useEffect (() =>{
        handleGetGroups();
    },[]);

    const handleGetGroups = () => {
        fetchAllStudentGroups().then(res => {
            res.data.isSuccessful ? setGroups(res.data.responseData) : toast.error('Error Retrieving');
            //console.log(res.data)
        }).catch(() => {
            toast.error('Error!', {
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
        });
    }

    // const handleGetGroups = async() =>{
    //     let id = getAuth().id;
    //     console.log(id)
    //     try{
    //         const res = await fetchStudentGroup(`supervisorId=${id}`);
    //         setGroup(res.data.responseData);
    //         console.log(res.data.responseData)
    //     }catch(error){
    //         console.log(error)
    //     } 
    // }

    const id = getAuth().id;

    const setEditingStatus = (payload) => {
        setGroup(payload);
        setEditOpen(true);
    }

    return (
        <div>
            <center>
                <TableContainer component={Paper} style={{width:"1400px"}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell align="left"><b>Group ID</b></TableCell>
                            <TableCell align="center"><b>Topic</b></TableCell>
                            <TableCell align="center"><b>Area</b></TableCell>
                            <TableCell align="center"><b>Request Type</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups.map((group, index) => (
                                group.supervisorId === id && (
                                    <>
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row" align="left">{group.id}</TableCell>
                                            <TableCell component="th" scope="row" align="center">{group.researchTopic.topic}</TableCell>
                                            <TableCell align="center">{group.researchTopic.area}</TableCell>
                                            <TableCell align="center">
                                                {
                                                    group.supervisorId && group.coSupervisorId !== "Not Assigned" ? 
                                                        <span>Both Supervisor and Co-Supervisor Request</span>
                                                    :
                                                    <>
                                                        {
                                                            group.supervisorId !== "Not Assigned" ? 
                                                                <span>Supervisor Request</span>
                                                            :
                                                            <>
                                                                {
                                                                    group.coSupervisorId !== "Not Assigned" && (
                                                                        <span>Co-Supervisor Request</span>
                                                                    )
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </TableCell>
                                            <TableCell align="center">{group.status}</TableCell>
                                            <TableCell align="center">
                                                <Stack direction="row" spacing={1}>
                                                    <Button onClick={() => setEditingStatus(group)}>Update Status</Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </center>
            {editOpen && group &&
                <EditTopicStatus
                    group={group}
                    id={group.id}
                    setEditOpen={setEditOpen}
                    handleGetGroups={handleGetGroups}
                />
            }
        </div>
    )
}