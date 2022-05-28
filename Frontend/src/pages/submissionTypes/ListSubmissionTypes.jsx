import { useEffect, useState } from "react"
import { deleteSubmissionType, fetchSubmissionTypes } from "../../api/submissionTypesApi";
import { handleToast } from "../../helper/helper";
import EditSubmissionType from "./EditSubmissionType";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import AlertDialog from "../../components/alerts/AlertDialog";

const ListSubmissionTypes = () => {
    const [submissionTypes, setSubmissionTypes] = useState([]);
    const [submissionType, setSubmissionType] = useState({});
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(() => {
        handleFetchSubmissionTypes();
    }, []);

    const handleFetchSubmissionTypes = () => {
        fetchSubmissionTypes('')
            .then(res => {
                console.log(res)
                res.data.isSuccessful ?
                    setSubmissionTypes(res.data.responseData) :
                    handleToast();
            })
            .catch(() => handleToast());
    }

    const handleDeleteSubmissionType = (id) => {
        setDeleteOpen(false)
        deleteSubmissionType(`id=${id}`)
            .then((res) => {
                if(res.data.isSuccessful){
                    handleToast('Submission type deleted!', 'success');
                    handleFetchSubmissionTypes()
                }
            })
            .catch(() => handleToast());
    }

    const setEditingSubmissionType = (payload) => {
        setSubmissionType(payload);
        setEditOpen(true);
    }

    const setDeletingSubmissionType = (payload) => {
        setSubmissionType(payload);
        setDeleteOpen(true);
    }

    return (
        <>
            <Paper elevation={3} style={{ padding: 20, backgroundColor: 'rgba(255,255,255, 0.70)' }}>
                <Typography variant='h6'>
                    <center><b>SUBMISSION TYPES</b></center>
                </Typography><br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Submission Type</TableCell>
                                <TableCell align="right">Folder</TableCell>
                                <TableCell align="right">Visibilty</TableCell>
                                <TableCell align="right">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submissionTypes && submissionTypes.map((sub, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {sub.name}
                                    </TableCell>
                                    <TableCell align="right">{sub.folder}</TableCell>
                                    <TableCell align="right">{sub.published ? 'Published' : 'Hidden'}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => setEditingSubmissionType(sub)}>Edit</Button>
                                        <Button onClick={() => setDeletingSubmissionType(sub)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                                              {deleteOpen &&
                                    <AlertDialog 
                                        title={'Confirm Delete'}
                                        body={'Are you sure, you want to delete this submission type?'}
                                        onClose={() => setDeleteOpen(false)}
                                        onConfirm={() => handleDeleteSubmissionType(submissionType._id)}
                                        />
                                }
                        </TableBody>
                    </Table>
                </TableContainer>

                {editOpen && submissionType &&
                    <EditSubmissionType
                        submissionType={submissionType}
                        setEditOpen={setEditOpen}
                        handleFetchSubmissionTypes={handleFetchSubmissionTypes}
                    />
                }
            </Paper>
        </>
    )

}

export default ListSubmissionTypes;